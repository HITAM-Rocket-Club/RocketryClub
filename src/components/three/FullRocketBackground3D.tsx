import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { buildFullMultiStageRocket, type RocketAssembly } from './rocketModelBuilder';
import { ROCKET_STAGES } from '../../types/rocketStages';

interface FullRocketBackground3DProps {
  scrollProgress: number; // 0 to 1
  activeSection: string;  // 'cockpit' | 'pad' | 'checklist' | 'ignition' | 'mission' | 'builds' | 'records' | 'crew' | 'join'
  wireframe?: boolean;
  exploded?: boolean;
  autoRotate?: boolean;
}

export const FullRocketBackground3D: React.FC<FullRocketBackground3DProps> = ({
  scrollProgress,
  activeSection,
  wireframe = false,
  exploded = false,
  autoRotate = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // References for live animation and controls
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const assemblyRef = useRef<RocketAssembly | null>(null);
  const scanRingRef = useRef<THREE.Mesh | null>(null);

  // Keep latest props in refs for smooth animation loop
  const scrollRef = useRef(scrollProgress);
  scrollRef.current = scrollProgress;

  const activeSectionRef = useRef(activeSection);
  activeSectionRef.current = activeSection;

  const wireframeRef = useRef(wireframe);
  wireframeRef.current = wireframe;

  const explodedRef = useRef(exploded);
  explodedRef.current = exploded;

  const autoRotateRef = useRef(autoRotate);
  autoRotateRef.current = autoRotate;

  // Toggle wireframe on all meshes when prop changes
  useEffect(() => {
    if (!assemblyRef.current) return;
    assemblyRef.current.rootGroup.traverse((child) => {
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

  // Main Scene Setup
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera (perspective with 46 FOV for dramatic cinematic silhouette)
    const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 1000);
    // Initial position framing top part (Nosecone & Capsule fully within bounds)
    camera.position.set(3.5, 11.8, 11.2);
    cameraRef.current = camera;

    // 3. Renderer with high performance & transparent canvas
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 4. OrbitControls: Zoom & Pan disabled so page scroll remains completely unobstructed
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.autoRotate = false;
    controls.enableZoom = false; // CRITICAL: allows user to scroll the website normally!
    controls.enablePan = false;
    controls.maxPolarAngle = Math.PI * 0.85;
    controls.minPolarAngle = Math.PI * 0.15;
    controlsRef.current = controls;

    // 5. Lighting: High-contrast Studio & Synthwave Aerospace Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Key Light (Main top-front illumination)
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.4);
    keyLight.position.set(12, 22, 16);
    scene.add(keyLight);

    // Cyan Neon Fill Light (Left flank)
    const cyanFill = new THREE.DirectionalLight(0x00f0ff, 2.6);
    cyanFill.position.set(-16, 2, -8);
    scene.add(cyanFill);

    // Magenta Neon Rim Light (Right rear)
    const magentaRim = new THREE.DirectionalLight(0xff007f, 2.2);
    magentaRim.position.set(14, -6, 10);
    scene.add(magentaRim);

    // Engine Under-Glow (Warm amber at the bottom base)
    const engineBaseLight = new THREE.PointLight(0xff6600, 4.5, 26);
    engineBaseLight.position.set(0, -16.0, 0);
    scene.add(engineBaseLight);

    // 6. Deep Space Starfield Particles
    const starCount = 500;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 140;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 120;
      starPositions[i * 3 + 2] = -Math.random() * 80 - 15;

      const r = Math.random();
      if (r > 0.8) {
        starColors[i * 3] = 0.0;
        starColors[i * 3 + 1] = 0.94;
        starColors[i * 3 + 2] = 1.0; // Cyan
      } else if (r > 0.6) {
        starColors[i * 3] = 1.0;
        starColors[i * 3 + 1] = 0.9;
        starColors[i * 3 + 2] = 0.2; // Amber
      } else {
        starColors[i * 3] = 0.9;
        starColors[i * 3 + 1] = 0.9;
        starColors[i * 3 + 2] = 0.95; // Crisp White
      }
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.6,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // 7. Ambient CAD Wireframe Asteroids (Tumbling debris)
    const asteroids: { mesh: THREE.Mesh; rot: THREE.Vector3; speed: THREE.Vector2; basePos: THREE.Vector3 }[] = [];
    const asteroidGeos = [
      new THREE.IcosahedronGeometry(1.4, 0),
      new THREE.DodecahedronGeometry(1.2, 0),
      new THREE.OctahedronGeometry(1.0, 0),
    ];
    for (let i = 0; i < 4; i++) {
      const aGeo = asteroidGeos[i % asteroidGeos.length];
      const aMat = new THREE.MeshBasicMaterial({
        color: i === 1 ? 0xff007f : 0x00f0ff,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      });
      const aMesh = new THREE.Mesh(aGeo, aMat);
      const bx = (i % 2 === 0 ? -1 : 1) * (14 + Math.random() * 8);
      const by = (Math.random() - 0.5) * 30;
      const bz = -Math.random() * 10 - 5;
      aMesh.position.set(bx, by, bz);
      scene.add(aMesh);
      asteroids.push({
        mesh: aMesh,
        rot: new THREE.Vector3(
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.01
        ),
        speed: new THREE.Vector2(
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.005
        ),
        basePos: new THREE.Vector3(bx, by, bz),
      });
    }

    // 8. Holographic Stage Scan Ring (Glides to highlight the active rocket part)
    const scanRingGeo = new THREE.RingGeometry(2.35, 2.45, 64);
    const scanRingMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    });
    const scanRing = new THREE.Mesh(scanRingGeo, scanRingMat);
    scanRing.rotation.x = Math.PI / 2;
    scanRing.position.y = 9.8;
    scene.add(scanRing);
    scanRingRef.current = scanRing;

    // Ground Launch Pad Grid Ring at base
    const padGrid = new THREE.GridHelper(16, 20, 0x00f0ff, 0x223344);
    padGrid.position.y = -19.5;
    scene.add(padGrid);

    // 9. Build Master Rocket Assembly
    const assembly = buildFullMultiStageRocket();
    assemblyRef.current = assembly;
    scene.add(assembly.rootGroup);

    // Initial wireframe check
    if (wireframeRef.current) {
      assembly.rootGroup.traverse((child) => {
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

    // Base coordinates of each stage for exploded view calculations
    const stageBasePositions = new Map<string, number>();
    ROCKET_STAGES.forEach((st) => {
      stageBasePositions.set(st.id, st.yPosition);
    });

    // Handle Window Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 10. Main Animation & Scroll Tracking Loop
    const clock = new THREE.Clock();
    let animId: number;

    // Target camera values for smooth damping
    let targetCamY = 11.8;
    let targetTargetY = 11.8;
    let targetDistance = 11.2;

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      const scroll = scrollRef.current;
      const activeSec = activeSectionRef.current;
      const isExploded = explodedRef.current;
      const isAutoRotate = autoRotateRef.current;

      // Find active stage metadata
      const matchedStage =
        ROCKET_STAGES.find((s) => s.sectionId === activeSec) ||
        ROCKET_STAGES[Math.min(Math.floor(scroll * ROCKET_STAGES.length), ROCKET_STAGES.length - 1)];

      if (matchedStage) {
        // Compute target camera height based on scroll progression
        // Continuously interpolates from Nosecone (+11.8) down to Engine Plume (-14.2)
        const continuousY = 11.8 - scroll * (11.8 - -14.2);
        targetCamY = continuousY;
        targetTargetY = continuousY;
        targetDistance = matchedStage.cameraDist;

        // Smooth scan ring tracking to active stage
        if (scanRingRef.current) {
          scanRingRef.current.position.y = THREE.MathUtils.lerp(
            scanRingRef.current.position.y,
            matchedStage.yPosition,
            0.08
          );
          scanRingRef.current.rotation.z = elapsedTime * 0.4;
          // Pulse opacity
          (scanRingRef.current.material as THREE.MeshBasicMaterial).opacity =
            0.45 + Math.sin(elapsedTime * 4.0) * 0.25;
        }
      }

      // Smooth Camera & Target Damping
      controls.target.y = THREE.MathUtils.lerp(controls.target.y, targetTargetY, 0.06);
      controls.target.x = THREE.MathUtils.lerp(controls.target.x, 0, 0.06);
      controls.target.z = THREE.MathUtils.lerp(controls.target.z, 0, 0.06);

      // Camera position interpolation
      // Maintain distance while smoothly traveling down the rocket Y-axis
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY, 0.06);

      // Subtle breathing motion on X and Z
      const currentRadius = Math.sqrt(
        camera.position.x * camera.position.x + camera.position.z * camera.position.z
      );
      const desiredRadius = targetDistance;
      const radiusRatio = desiredRadius / (currentRadius || 1);

      if (Math.abs(radiusRatio - 1) > 0.01) {
        camera.position.x = THREE.MathUtils.lerp(
          camera.position.x,
          camera.position.x * radiusRatio,
          0.04
        );
        camera.position.z = THREE.MathUtils.lerp(
          camera.position.z,
          camera.position.z * radiusRatio,
          0.04
        );
      }

      // Exploded Stage Animation (Disassembles stages along Y centered on active stage)
      assembly.stages.forEach((stageGroup, stageId) => {
        const baseY = stageBasePositions.get(stageId) || 0;
        const stageIndex = ROCKET_STAGES.findIndex((s) => s.id === stageId);
        const activeIndex = matchedStage ? matchedStage.partIndex : 0;
        // Active stage remains anchored while adjacent stages separate smoothly outward
        const explodeOffset = isExploded ? (activeIndex - stageIndex) * 1.6 : 0;
        stageGroup.position.y = THREE.MathUtils.lerp(
          stageGroup.position.y,
          baseY + explodeOffset,
          0.08
        );
      });

      // Auto Turntable or Idle Spin
      if (isAutoRotate) {
        assembly.rootGroup.rotation.y += delta * 0.4;
      } else {
        // Slow majestic idle rotation
        assembly.rootGroup.rotation.y += delta * 0.06;
      }

      // Grid Fins Dynamic Articulation
      assembly.gridFinPivots.forEach((fin, idx) => {
        // Oscillate fin angles like active aerodynamic steering
        const finAngle = Math.sin(elapsedTime * 1.5 + idx * 1.2) * 0.15;
        fin.rotation.z = finAngle;
      });

      // Mach Diamonds Plume Pulsation
      assembly.machDiamonds.forEach((md, i) => {
        const pulse = 1.0 + Math.sin(elapsedTime * 12.0 + i * 1.5) * 0.2;
        md.scale.set(pulse, 2.2 * pulse, pulse);
      });

      // Engine Throats Intensity
      assembly.engineThroats.forEach((throat) => {
        const flicker = 0.85 + Math.random() * 0.3;
        (throat.material as THREE.MeshBasicMaterial).color.setRGB(
          1.0,
          0.33 * flicker,
          0.0
        );
      });

      // Dynamic 3D Flame Particles Update
      const positions = assembly.flamePositions;
      const velocities = assembly.flameVelocities;
      for (let i = 0; i < assembly.flameCount; i++) {
        positions[i * 3 + 1] += velocities[i * 3 + 1];
        positions[i * 3] += velocities[i * 3];
        positions[i * 3 + 2] += velocities[i * 3 + 2];

        // Reset particle to engine throat once it travels down
        if (positions[i * 3 + 1] < -7.0) {
          const angle = Math.random() * Math.PI * 2;
          const r = Math.random() * 0.45;
          positions[i * 3] = Math.cos(angle) * r;
          positions[i * 3 + 1] = -0.4;
          positions[i * 3 + 2] = Math.sin(angle) * r;
        }
      }
      assembly.flameParticles.geometry.attributes.position.needsUpdate = true;

      // Tumbling Asteroids
      asteroids.forEach((ast) => {
        ast.mesh.rotation.x += ast.rot.x;
        ast.mesh.rotation.y += ast.rot.y;
        ast.mesh.rotation.z += ast.rot.z;
        ast.mesh.position.y =
          ast.basePos.y + Math.sin(elapsedTime * 0.3 + ast.basePos.x) * 2.0;
      });

      // Starfield slow drift
      starPoints.rotation.y = elapsedTime * 0.008;

      controls.update();
      renderer.render(scene, camera);
    };

    renderLoop();

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);

      controls.dispose();

      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          mesh.geometry?.dispose();
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
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[1] pointer-events-auto cursor-grab active:cursor-grabbing select-none overflow-hidden"
    >
      {/* Subtle Retro CRT Grid Overlay behind 3D world */}
      <div className="absolute inset-0 pixel-grid opacity-20 pointer-events-none" />

      {/* Cyberpunk Radial Atmospheric Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(5,5,5,0.7)_90%)] pointer-events-none" />
    </div>
  );
};
