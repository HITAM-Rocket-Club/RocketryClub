import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export interface ModelTelemetry {
  width: number;
  height: number;
  depth: number;
  meshCount: number;
  animationNames: string[];
}

export type ViewPreset = 'iso' | 'front' | 'side' | 'top';

interface ModelViewer3DProps {
  modelUrl: string;
  wireframe?: boolean;
  autoRotate?: boolean;
  viewPreset?: ViewPreset;
  activeAnimation?: string | null;
  onTelemetryReady?: (telemetry: ModelTelemetry) => void;
  className?: string;
  showGrid?: boolean;
}

export const ModelViewer3D: React.FC<ModelViewer3DProps> = ({
  modelUrl,
  wireframe = false,
  autoRotate = true,
  viewPreset = 'iso',
  activeAnimation = null,
  onTelemetryReady,
  className = '',
  showGrid = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // References to live Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const actionsRef = useRef<Map<string, THREE.AnimationAction>>(new Map());
  const originalMaterialsRef = useRef<Map<THREE.Mesh, THREE.Material | THREE.Material[]>>(new Map());
  const modelRadiusRef = useRef<number>(3);

  // Apply camera preset angle
  const applyPreset = useCallback((preset: ViewPreset) => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    const r = modelRadiusRef.current * 1.6;
    switch (preset) {
      case 'front':
        camera.position.set(0, 0, r);
        break;
      case 'side':
        camera.position.set(r, 0, 0);
        break;
      case 'top':
        camera.position.set(0, r, 0.001);
        break;
      case 'iso':
      default:
        camera.position.set(r * 0.75, r * 0.45, r * 0.75);
        break;
    }
    camera.lookAt(0, 0, 0);
    controls.target.set(0, 0, 0);
    controls.update();
  }, []);

  // Update wireframe mode
  useEffect(() => {
    if (!modelGroupRef.current) return;

    modelGroupRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (wireframe) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat) => {
              if ('wireframe' in mat) (mat as THREE.MeshStandardMaterial).wireframe = true;
            });
          } else if (mesh.material && 'wireframe' in mesh.material) {
            (mesh.material as THREE.MeshStandardMaterial).wireframe = true;
          }
        } else {
          // Restore solid state
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat) => {
              if ('wireframe' in mat) (mat as THREE.MeshStandardMaterial).wireframe = false;
            });
          } else if (mesh.material && 'wireframe' in mesh.material) {
            (mesh.material as THREE.MeshStandardMaterial).wireframe = false;
          }
        }
      }
    });
  }, [wireframe]);

  // Update camera preset
  useEffect(() => {
    applyPreset(viewPreset);
  }, [viewPreset, applyPreset]);

  // Update auto-rotate
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  // Handle active animation clip
  useEffect(() => {
    if (!mixerRef.current) return;

    if (activeAnimation && actionsRef.current.has(activeAnimation)) {
      // Stop other actions
      actionsRef.current.forEach((action, name) => {
        if (name === activeAnimation) {
          action.reset().fadeIn(0.3).play();
        } else {
          action.fadeOut(0.3);
        }
      });
    } else {
      // Fade out all actions
      actionsRef.current.forEach((action) => {
        action.fadeOut(0.4);
      });
    }
  }, [activeAnimation]);

  // Main Scene Setup & GLTF Loading
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    setLoading(true);
    setLoadError(null);

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(4, 2.5, 4);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 1.5;
    controls.maxDistance = 25;
    controls.minDistance = 1;
    controlsRef.current = controls;

    // Studio Lighting for Monochrome CAD aesthetic
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(5, 12, 8);
    scene.add(keyLight);

    const cyanFill = new THREE.DirectionalLight(0x00f0ff, 0.9);
    cyanFill.position.set(-8, -2, -6);
    scene.add(cyanFill);

    const magentaRim = new THREE.DirectionalLight(0xff007f, 0.7);
    magentaRim.position.set(0, -6, 6);
    scene.add(magentaRim);

    // Grid Floor
    let gridHelper: THREE.GridHelper | null = null;

    // Model group container
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // Load Model with GLTFLoader
    const loader = new GLTFLoader();
    let mixer: THREE.AnimationMixer | null = null;
    let animId: number;
    let isDisposed = false;

    loader.load(
      modelUrl,
      (gltf) => {
        if (isDisposed) return;

        const root = gltf.scene;

        // Calculate bounding box and center
        const box = new THREE.Box3().setFromObject(root);
        const size = new THREE.Vector3();
        box.getSize(size);
        const center = new THREE.Vector3();
        box.getCenter(center);

        // Center root at origin
        root.position.x = -center.x;
        root.position.y = -center.y;
        root.position.z = -center.z;

        modelGroup.add(root);

        // Calculate scale & camera positioning
        const maxDim = Math.max(size.x, size.y, size.z);
        modelRadiusRef.current = maxDim;

        // Apply grid at bottom of model
        if (showGrid) {
          const gridSize = Math.max(maxDim * 2.2, 4);
          gridHelper = new THREE.GridHelper(gridSize, 20, 0x00f0ff, 0x223344);
          gridHelper.position.y = -size.y / 2 - 0.05;
          scene.add(gridHelper);
        }

        // Store original materials & configure wireframe / shadows
        let meshCount = 0;
        root.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            meshCount++;
            const mesh = child as THREE.Mesh;
            originalMaterialsRef.current.set(mesh, mesh.material);
            if (wireframe) {
              if (Array.isArray(mesh.material)) {
                mesh.material.forEach((m) => {
                  if ('wireframe' in m) (m as THREE.MeshStandardMaterial).wireframe = true;
                });
              } else if (mesh.material && 'wireframe' in mesh.material) {
                (mesh.material as THREE.MeshStandardMaterial).wireframe = true;
              }
            }
          }
        });

        // Animations Setup
        const animationNames: string[] = [];
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(root);
          mixerRef.current = mixer;

          actionsRef.current.clear();
          gltf.animations.forEach((clip) => {
            animationNames.push(clip.name);
            const action = mixer!.clipAction(clip);
            actionsRef.current.set(clip.name, action);
          });

          // Play active animation or default idle
          if (activeAnimation && actionsRef.current.has(activeAnimation)) {
            actionsRef.current.get(activeAnimation)?.play();
          } else if (actionsRef.current.has('IdleSpin / 8 sec')) {
            actionsRef.current.get('IdleSpin / 8 sec')?.play();
          }
        }

        // Apply initial camera preset
        applyPreset(viewPreset);

        // Notify telemetry
        if (onTelemetryReady) {
          onTelemetryReady({
            width: Number(size.x.toFixed(2)),
            height: Number(size.y.toFixed(2)),
            depth: Number(size.z.toFixed(2)),
            meshCount,
            animationNames,
          });
        }

        setLoading(false);
      },
      undefined,
      (err) => {
        console.error('Error loading 3D model:', err);
        setLoadError('Failed to load 3D CAD schematic.');
        setLoading(false);
      }
    );

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    const clock = new THREE.Clock();
    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);
      const delta = clock.getDelta();

      if (mixerRef.current) {
        mixerRef.current.update(delta);
      }

      if (controlsRef.current) {
        controlsRef.current.update();
      }

      renderer.render(scene, camera);
    };
    renderLoop();

    // Cleanup
    return () => {
      isDisposed = true;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);

      if (controlsRef.current) {
        controlsRef.current.dispose();
      }

      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          mesh.geometry.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else if (mesh.material) {
            mesh.material.dispose();
          }
        }
      });

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [modelUrl, applyPreset, onTelemetryReady, showGrid]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none cursor-grab active:cursor-grabbing ${className}`}
    >
      {/* Loading Scan Overlay */}
      {loading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="font-pixel text-[11px] text-[#00f0ff] mb-3 arcade-blink tracking-widest">
            INITIALIZING 3D CAD VECTOR STREAM...
          </div>
          <div className="w-48 h-2 bg-black border border-[#00f0ff] p-0.5 overflow-hidden">
            <div className="h-full bg-[#00f0ff] animate-pulse w-3/4"></div>
          </div>
          <span className="font-pixel text-[8px] text-white/50 mt-2">
            FETCHING GLB DATA // WIREFRAME BUFFER
          </span>
        </div>
      )}

      {/* Error Overlay */}
      {loadError && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/90 p-4 text-center">
          <div className="font-pixel text-xs text-[#ff3333] mb-2 tracking-wide">
            ▲ TELEMETRY FEED ERROR ▲
          </div>
          <div className="font-mono-tech text-xs text-slate-400 max-w-xs">{loadError}</div>
        </div>
      )}

      {/* Retro Crosshair HUD Reticle in Viewport Corners */}
      <div className="pointer-events-none absolute top-2 left-2 font-pixel text-[8px] text-[#00f0ff]/40">
        ⌜ 3D_ORTHO_FEED ⌝
      </div>
      <div className="pointer-events-none absolute top-2 right-2 font-pixel text-[8px] text-[#ffe600]/40">
        SCAN_RES: 60FPS
      </div>
      <div className="pointer-events-none absolute bottom-2 left-2 font-pixel text-[8px] text-white/30">
        ROT: [DRAG] // ZOOM: [SCROLL]
      </div>
      <div className="pointer-events-none absolute bottom-2 right-2 font-pixel text-[8px] text-[#00ff66]/40">
        ● GLTF_V2.0
      </div>
    </div>
  );
};
