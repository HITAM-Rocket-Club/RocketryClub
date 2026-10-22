import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export type ViewPreset = 'iso' | 'front' | 'side' | 'top';

interface BackgroundRocket3DProps {
  modelType?: 'rocket' | 'cockpit';
  wireframe?: boolean;
  autoRotate?: boolean;
  viewPreset?: ViewPreset;
  activeAnimation?: string | null;
  className?: string;
  onLoaded?: () => void;
}

export const BackgroundRocket3D: React.FC<BackgroundRocket3DProps> = ({
  modelType = 'rocket',
  wireframe = false,
  autoRotate = true,
  viewPreset = 'iso',
  activeAnimation = null,
  className = '',
  onLoaded,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const actionsRef = useRef<Map<string, THREE.AnimationAction>>(new Map());
  const modelRadiusRef = useRef<number>(5);

  const modelUrl =
    modelType === 'rocket'
      ? '/models/HRC-rocket-monochrome.glb'
      : '/models/HRC-cockpit-monochrome.glb';

  // Apply camera preset angle
  const applyPreset = useCallback((preset: ViewPreset) => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    const r = modelRadiusRef.current * 1.65;
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
        // Position slightly elevated and angled for dramatic silhouette
        camera.position.set(r * 0.72, r * 0.35, r * 0.72);
        break;
    }
    camera.lookAt(0, 0, 0);
    controls.target.set(0, 0, 0);
    controls.update();
  }, []);

  // Wireframe toggle
  useEffect(() => {
    if (!modelGroupRef.current) return;

    modelGroupRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat) => {
            if ('wireframe' in mat) (mat as THREE.MeshStandardMaterial).wireframe = wireframe;
          });
        } else if (mesh.material && 'wireframe' in mesh.material) {
          (mesh.material as THREE.MeshStandardMaterial).wireframe = wireframe;
        }
      }
    });
  }, [wireframe]);

  // View preset change
  useEffect(() => {
    applyPreset(viewPreset);
  }, [viewPreset, applyPreset]);

  // Auto-rotate toggle
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  // Handle active animation clip
  useEffect(() => {
    if (!mixerRef.current) return;

    if (activeAnimation && actionsRef.current.has(activeAnimation)) {
      actionsRef.current.forEach((action, name) => {
        if (name === activeAnimation) {
          action.reset().fadeIn(0.25).play();
        } else {
          action.fadeOut(0.25);
        }
      });
    } else {
      actionsRef.current.forEach((action) => {
        action.fadeOut(0.3);
      });
    }
  }, [activeAnimation]);

  // Main Scene Lifecycle
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    setLoading(true);
    setLoadError(null);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(10, 4, 10);
    cameraRef.current = camera;

    // Renderer with transparent canvas
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // OrbitControls: Zoom disabled so background does not intercept page wheel scroll
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 0.85; // Elegant slow turntable spin
    controls.enableZoom = false; // CRITICAL: allows user to scroll the website normally!
    controls.enablePan = false; // Keeps rocket centered
    controls.maxPolarAngle = Math.PI * 0.85;
    controls.minPolarAngle = Math.PI * 0.15;
    controlsRef.current = controls;

    // High-contrast Studio & Synthwave Aerospace Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    // Main top-front key light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(6, 14, 10);
    scene.add(keyLight);

    // Cyan Neon Fill Light (Left flank)
    const cyanFill = new THREE.DirectionalLight(0x00f0ff, 1.8);
    cyanFill.position.set(-10, -2, -6);
    scene.add(cyanFill);

    // Magenta Neon Rim Light (Right rear)
    const magentaRim = new THREE.DirectionalLight(0xff007f, 1.4);
    magentaRim.position.set(8, -4, 6);
    scene.add(magentaRim);

    // Engine nozzle warm under-glow
    const nozzleLight = new THREE.PointLight(0xffaa00, 2.5, 12);
    nozzleLight.position.set(0, -5, 0);
    scene.add(nozzleLight);

    // Cyan holographic ground ring
    const ringGeo = new THREE.RingGeometry(2.2, 2.25, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = -5.1;
    scene.add(ringMesh);

    // Outer faint pulse ring
    const outerRingGeo = new THREE.RingGeometry(3.6, 3.65, 64);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0xff007f,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.18,
    });
    const outerRingMesh = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRingMesh.rotation.x = Math.PI / 2;
    outerRingMesh.position.y = -5.1;
    scene.add(outerRingMesh);

    // Model group container
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // Load Model
    const loader = new GLTFLoader();
    let mixer: THREE.AnimationMixer | null = null;
    let animId: number;
    let isDisposed = false;

    loader.load(
      modelUrl,
      (gltf) => {
        if (isDisposed) return;

        const root = gltf.scene;

        // Compute Bounding Box and Center Rocket exactly at origin
        const box = new THREE.Box3().setFromObject(root);
        const size = new THREE.Vector3();
        box.getSize(size);
        const center = new THREE.Vector3();
        box.getCenter(center);

        root.position.x = -center.x;
        root.position.y = -center.y;
        root.position.z = -center.z;

        modelGroup.add(root);

        // Adjust ground ring positions based on actual model bounds
        const maxDim = Math.max(size.x, size.y, size.z);
        modelRadiusRef.current = maxDim;
        ringMesh.position.y = -size.y / 2 - 0.1;
        outerRingMesh.position.y = -size.y / 2 - 0.1;
        nozzleLight.position.y = -size.y / 2 + 0.4;

        // Apply wireframe if enabled
        if (wireframe) {
          root.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              if (Array.isArray(mesh.material)) {
                mesh.material.forEach((m) => {
                  if ('wireframe' in m) (m as THREE.MeshStandardMaterial).wireframe = true;
                });
              } else if (mesh.material && 'wireframe' in mesh.material) {
                (mesh.material as THREE.MeshStandardMaterial).wireframe = true;
              }
            }
          });
        }

        // Setup Animations
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(root);
          mixerRef.current = mixer;

          actionsRef.current.clear();
          gltf.animations.forEach((clip) => {
            const action = mixer!.clipAction(clip);
            actionsRef.current.set(clip.name, action);
          });

          if (activeAnimation && actionsRef.current.has(activeAnimation)) {
            actionsRef.current.get(activeAnimation)?.play();
          } else if (actionsRef.current.has('IdleSpin / 8 sec')) {
            actionsRef.current.get('IdleSpin / 8 sec')?.play();
          }
        }

        // Apply Initial Preset
        applyPreset(viewPreset);

        setLoading(false);
        if (onLoaded) onLoaded();
      },
      undefined,
      (err) => {
        console.error('Error loading background 3D rocket model:', err);
        setLoadError('Failed to load 3D Rocket schematic.');
        setLoading(false);
      }
    );

    // Responsive Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Render Loop
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

      // Subtle pulse on the holographic base rings
      const time = clock.getElapsedTime();
      ringMesh.rotation.z = time * 0.15;
      outerRingMesh.rotation.z = -time * 0.1;

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
  }, [modelUrl, applyPreset, onLoaded]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full cursor-grab active:cursor-grabbing select-none ${className}`}
    >
      {/* Loading Vector Pulse */}
      {loading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none bg-black/40 backdrop-blur-[2px]">
          <div className="font-pixel text-[10px] text-[#00f0ff] mb-2 arcade-blink tracking-widest">
            INITIALIZING 3D ROCKET BACKGROUND VECTOR...
          </div>
          <div className="w-36 h-1 bg-black border border-[#00f0ff]/50 overflow-hidden">
            <div className="h-full bg-[#00f0ff] animate-pulse w-3/4"></div>
          </div>
        </div>
      )}

      {/* Error Fallback */}
      {loadError && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-4 pointer-events-none">
          <span className="font-pixel text-[10px] text-[#ff3333] mb-1">
            ▲ 3D TELEMETRY VECTOR OFFLINE ▲
          </span>
          <span className="font-mono-tech text-xs text-slate-400">{loadError}</span>
        </div>
      )}
    </div>
  );
};
