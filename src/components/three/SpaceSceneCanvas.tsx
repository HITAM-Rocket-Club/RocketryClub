import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface AsteroidData {
  mesh: THREE.Mesh;
  rotSpeed: { x: number; y: number; z: number };
  driftSpeed: { x: number; y: number };
  initialPos: { x: number; y: number; z: number };
  tag: { designation: string; diameter: string; velocity: string; comp: string };
}

interface SpaceSceneCanvasProps {
  scrollProgress: number; // 0 to 1
}

export const SpaceSceneCanvas: React.FC<SpaceSceneCanvasProps> = ({ scrollProgress }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredTag, setHoveredTag] = useState<{
    text: AsteroidData['tag'];
    screenX: number;
    screenY: number;
  } | null>(null);

  const scrollRef = useRef(scrollProgress);
  scrollRef.current = scrollProgress;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. Starfield Particles (deep space background)
    const starCount = 650;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 120;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 120;
      starPositions[i * 3 + 2] = -Math.random() * 80;

      // Slight amber or cyan tints mixed with crisp white
      const r = Math.random();
      if (r > 0.85) {
        starColors[i * 3] = 0.96; // amber
        starColors[i * 3 + 1] = 0.62;
        starColors[i * 3 + 2] = 0.1;
      } else if (r > 0.7) {
        starColors[i * 3] = 0.2; // cyan
        starColors[i * 3 + 1] = 0.7;
        starColors[i * 3 + 2] = 0.9;
      } else {
        starColors[i * 3] = 0.9;
        starColors[i * 3 + 1] = 0.9;
        starColors[i * 3 + 2] = 0.95;
      }
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.65,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });

    const starPoints = new THREE.Points(starGeometry, starMaterial);
    scene.add(starPoints);

    // 2. Low-Poly Wireframe Vector Asteroids (CAD Schematic aesthetic)
    const asteroids: AsteroidData[] = [];
    const asteroidGeometries = [
      new THREE.IcosahedronGeometry(1.6, 0),
      new THREE.DodecahedronGeometry(1.4, 0),
      new THREE.IcosahedronGeometry(2.1, 0),
      new THREE.DodecahedronGeometry(1.9, 0),
      new THREE.OctahedronGeometry(1.3, 0),
    ];

    const asteroidTags = [
      { designation: 'DEBRIS-HRC-01', diameter: '3.4m', velocity: '11.2 km/s', comp: 'Silicate / Nickel-Iron' },
      { designation: 'ORBITAL-CAD-04', diameter: '5.1m', velocity: '14.8 km/s', comp: 'Carbonaceous Chondrite' },
      { designation: 'TELEMETRY-AST-09', diameter: '2.8m', velocity: '8.4 km/s', comp: 'High-Density Basalt' },
      { designation: 'VECTOR-ROCK-12', diameter: '6.4m', velocity: '16.1 km/s', comp: 'Metal-Rich Regolith' },
      { designation: 'APOGEE-LNK-18', diameter: '4.2m', velocity: '9.7 km/s', comp: 'Fused Micro-Agglomerate' },
    ];

    for (let i = 0; i < 5; i++) {
      const geom = asteroidGeometries[i % asteroidGeometries.length];
      const wireframeMat = new THREE.MeshBasicMaterial({
        color: i === 1 ? 0xf59e0b : 0xe2e8f0, // one accent amber, others crisp blueprint white
        wireframe: true,
        transparent: true,
        opacity: 0.55,
      });

      const mesh = new THREE.Mesh(geom, wireframeMat);
      // Position across viewport at varied depths
      const spreadX = 28;
      const posX = ((i / 4) - 0.5) * spreadX + (Math.random() - 0.5) * 4;
      const posY = (Math.random() - 0.5) * 16 - 2;
      const posZ = (Math.random() - 0.5) * 8 - 4;

      mesh.position.set(posX, posY, posZ);
      scene.add(mesh);

      asteroids.push({
        mesh,
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.012,
          y: (Math.random() - 0.5) * 0.012,
          z: (Math.random() - 0.5) * 0.008,
        },
        driftSpeed: {
          x: (Math.random() * 0.006 + 0.003) * (i % 2 === 0 ? 1 : -1),
          y: (Math.random() * 0.004 + 0.002) * (i % 2 === 0 ? 1 : -1),
        },
        initialPos: { x: posX, y: posY, z: posZ },
        tag: asteroidTags[i],
      });
    }

    // Raycasting for interactive CAD annotation on hover
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(asteroids.map(a => a.mesh));

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object as THREE.Mesh;
        const matched = asteroids.find(a => a.mesh === hitMesh);
        if (matched) {
          (hitMesh.material as THREE.MeshBasicMaterial).opacity = 0.95;
          setHoveredTag({
            text: matched.tag,
            screenX: e.clientX,
            screenY: e.clientY,
          });
          return;
        }
      }

      asteroids.forEach(a => {
        (a.mesh.material as THREE.MeshBasicMaterial).opacity = 0.55;
      });
      setHoveredTag(null);
    };

    window.addEventListener('pointermove', onPointerMove);

    // Resize Handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const progress = scrollRef.current;

      // Camera ascent tied to scroll progress
      camera.position.y = -progress * 18 + 4;
      camera.rotation.z = Math.sin(elapsedTime * 0.15) * 0.04;

      // Animate asteroids (diagonal drift + rotation)
      asteroids.forEach(ast => {
        ast.mesh.rotation.x += ast.rotSpeed.x;
        ast.mesh.rotation.y += ast.rotSpeed.y;
        ast.mesh.rotation.z += ast.rotSpeed.z;

        // Subtle diagonal drift bounded inside viewport
        ast.mesh.position.x = ast.initialPos.x + Math.sin(elapsedTime * 0.5 + ast.initialPos.z) * 1.5;
        ast.mesh.position.y = ast.initialPos.y + Math.cos(elapsedTime * 0.4 + ast.initialPos.x) * 1.2;

        // Increase visibility as altitude/scroll progress rises into space
        const spaceVisibility = Math.min(Math.max((progress - 0.25) * 2, 0.1), 0.9);
        const mat = ast.mesh.material as THREE.MeshBasicMaterial;
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, spaceVisibility, 0.05);
      });

      // Subtle starfield twinkling and ascent drift
      starPoints.rotation.y = elapsedTime * 0.015;
      starPoints.position.y = progress * 10;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      asteroidGeometries.forEach(g => g.dispose());
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-auto z-[2] overflow-hidden"
      style={{
        opacity: Math.max(0.15, Math.min(1, scrollProgress * 1.8)),
        transition: 'opacity 0.5s ease-out',
      }}
    >
      {/* CAD Schematic Overlay on Hover */}
      {hoveredTag && (
        <div
          className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-full mb-3"
          style={{ left: hoveredTag.screenX, top: hoveredTag.screenY - 12 }}
        >
          <div className="bg-[#070a12] px-3 py-2 rounded-none text-xs font-mono-tech border-2 border-amber-400 shadow-[3px_3px_0px_#000000]">
            <div className="flex items-center gap-2 text-amber-400 font-semibold mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
              {hoveredTag.text.designation}
            </div>
            <div className="text-slate-300 space-y-0.5 text-[11px]">
              <div>SCALE: <span className="text-white font-medium">{hoveredTag.text.diameter}</span></div>
              <div>REL_VEL: <span className="text-white font-medium">{hoveredTag.text.velocity}</span></div>
              <div>MAT: <span className="text-slate-400">{hoveredTag.text.comp}</span></div>
            </div>
            <div className="mt-1.5 pt-1 border-t border-white/10 text-[9px] text-amber-500/80">
              TARGET_TRACK: NOMINAL // CAD_SURFACE_OK
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
