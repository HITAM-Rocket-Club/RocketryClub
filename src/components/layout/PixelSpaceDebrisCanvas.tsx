import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  maxLife: number;
  life: number;
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  scale: number;
  alpha: number;
  active: boolean;
  respawnTime: number;
}

interface Rocket {
  x: number;
  y: number;
  vy: number;
  swayFreq: number;
  swayAmp: number;
  swayPhase: number;
  scale: number;
  alpha: number;
  active: boolean;
  respawnTime: number;
}

interface Roamer {
  id: string;
  imgType: 'satellite' | 'asteroid' | 'astronaut';
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetVx: number;
  targetVy: number;
  nextVelocityChange: number;
  angle: number;
  angularVelocity: number;
  scale: number;
  baseScale: number;
  alpha: number;
  bobPhase: number;
  parallaxFactor: number;
}

interface PixelSpaceDebrisCanvasProps {
  scrollProgress?: number;
}

export const PixelSpaceDebrisCanvas: React.FC<PixelSpaceDebrisCanvasProps> = ({
  scrollProgress = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scrollRef = useRef(scrollProgress);
  scrollRef.current = scrollProgress;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isMounted = true;

    // Load the 5 sprites
    const images: { [key: string]: HTMLImageElement } = {};
    const spriteSources = {
      shuttle_rocket: '/pixel_space/shuttle_rocket.png',
      meteor_fire: '/pixel_space/meteor_fire.png',
      asteroid_moon: '/pixel_space/asteroid_moon.png',
      satellite: '/pixel_space/satellite.png',
      astronaut: '/pixel_space/astronaut.png',
    };

    Object.entries(spriteSources).forEach(([key, src]) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        images[key] = img;
      };
    });

    // Handle high-DPI scaling
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle spark trails for meteors and rockets
    const particles: Particle[] = [];
    const addSpark = (x: number, y: number, color: string, baseVx = 0, baseVy = 0) => {
      if (particles.length > 150) return;
      particles.push({
        x: x + (Math.random() - 0.5) * 4,
        y: y + (Math.random() - 0.5) * 4,
        vx: baseVx + (Math.random() - 0.5) * 1.2,
        vy: baseVy + (Math.random() - 0.5) * 1.2,
        size: Math.random() < 0.6 ? 2 : 1,
        color,
        alpha: 1.0,
        maxLife: 18 + Math.random() * 16,
        life: 0,
      });
    };

    // 1. Meteors: Randomly fall down and diagonally left (subtle compact scale)
    const meteors: Meteor[] = [
      {
        x: width * 0.75,
        y: height * 0.15,
        vx: -4.8,
        vy: 5.8,
        scale: 0.22,
        alpha: 0.95,
        active: true,
        respawnTime: 0,
      },
      {
        x: width * 0.42,
        y: -100,
        vx: -4.0,
        vy: 5.2,
        scale: 0.18,
        alpha: 0.88,
        active: true,
        respawnTime: Date.now() + 2000,
      },
      {
        x: width * 0.92,
        y: -220,
        vx: -5.2,
        vy: 6.5,
        scale: 0.25,
        alpha: 0.9,
        active: true,
        respawnTime: Date.now() + 4500,
      },
    ];

    // 2. Rockets: Randomly go up with thruster fire & smoke (compact sleek scale)
    const rockets: Rocket[] = [
      {
        x: width * 0.26,
        y: height * 0.58,
        vy: -3.4,
        swayFreq: 0.04,
        swayAmp: 0.45,
        swayPhase: 0,
        scale: 0.22,
        alpha: 0.95,
        active: true,
        respawnTime: 0,
      },
      {
        x: width * 0.86,
        y: height + 60,
        vy: -3.8,
        swayFreq: 0.035,
        swayAmp: 0.5,
        swayPhase: 1.5,
        scale: 0.19,
        alpha: 0.88,
        active: true,
        respawnTime: Date.now() + 2500,
      },
      {
        x: width * 0.48,
        y: height + 280,
        vy: -3.6,
        swayFreq: 0.03,
        swayAmp: 0.4,
        swayPhase: 3.2,
        scale: 0.24,
        alpha: 0.92,
        active: true,
        respawnTime: Date.now() + 6000,
      },
    ];

    // 3. Other elements: Slowly roam around (Satellites, Asteroids, Astronauts - compact sizes)
    const roamers: Roamer[] = [
      // Satellites (2)
      {
        id: 'sat-1',
        imgType: 'satellite',
        x: width * 0.18,
        y: height * 0.22,
        vx: 0.15,
        vy: 0.1,
        targetVx: 0.15,
        targetVy: 0.1,
        nextVelocityChange: Date.now() + 3000,
        angle: 0.2,
        angularVelocity: 0.0015,
        scale: 0.19,
        baseScale: 0.19,
        alpha: 0.85,
        bobPhase: 0,
        parallaxFactor: 0.04,
      },
      {
        id: 'sat-2',
        imgType: 'satellite',
        x: width * 0.78,
        y: height * 0.65,
        vx: -0.18,
        vy: -0.12,
        targetVx: -0.18,
        targetVy: -0.12,
        nextVelocityChange: Date.now() + 4500,
        angle: -0.4,
        angularVelocity: -0.0018,
        scale: 0.16,
        baseScale: 0.16,
        alpha: 0.75,
        bobPhase: Math.PI,
        parallaxFactor: 0.03,
      },
      // Asteroids / Moons (3)
      {
        id: 'ast-1',
        imgType: 'asteroid',
        x: width * 0.82,
        y: height * 0.18,
        vx: -0.12,
        vy: 0.08,
        targetVx: -0.12,
        targetVy: 0.08,
        nextVelocityChange: Date.now() + 5000,
        angle: 0,
        angularVelocity: 0.003,
        scale: 0.23,
        baseScale: 0.23,
        alpha: 0.9,
        bobPhase: 1.2,
        parallaxFactor: 0.05,
      },
      {
        id: 'ast-2',
        imgType: 'asteroid',
        x: width * 0.12,
        y: height * 0.75,
        vx: 0.2,
        vy: -0.15,
        targetVx: 0.2,
        targetVy: -0.15,
        nextVelocityChange: Date.now() + 3800,
        angle: 1.5,
        angularVelocity: -0.0025,
        scale: 0.17,
        baseScale: 0.17,
        alpha: 0.7,
        bobPhase: 2.5,
        parallaxFactor: 0.02,
      },
      {
        id: 'ast-3',
        imgType: 'asteroid',
        x: width * 0.5,
        y: height * 0.42,
        vx: 0.1,
        vy: 0.16,
        targetVx: 0.1,
        targetVy: 0.16,
        nextVelocityChange: Date.now() + 6000,
        angle: 0.8,
        angularVelocity: 0.002,
        scale: 0.20,
        baseScale: 0.20,
        alpha: 0.8,
        bobPhase: 4.0,
        parallaxFactor: 0.035,
      },
      // Astronauts (2)
      {
        id: 'astro-1',
        imgType: 'astronaut',
        x: width * 0.28,
        y: height * 0.48,
        vx: 0.08,
        vy: -0.12,
        targetVx: 0.08,
        targetVy: -0.12,
        nextVelocityChange: Date.now() + 4000,
        angle: 0.1,
        angularVelocity: 0.0008,
        scale: 0.21,
        baseScale: 0.21,
        alpha: 0.9,
        bobPhase: 0.5,
        parallaxFactor: 0.045,
      },
      {
        id: 'astro-2',
        imgType: 'astronaut',
        x: width * 0.68,
        y: height * 0.82,
        vx: -0.14,
        vy: 0.1,
        targetVx: -0.14,
        targetVy: 0.1,
        nextVelocityChange: Date.now() + 5200,
        angle: -0.2,
        angularVelocity: -0.001,
        scale: 0.17,
        baseScale: 0.17,
        alpha: 0.8,
        bobPhase: 3.1,
        parallaxFactor: 0.03,
      },
    ];

    let lastTime = performance.now();

    const renderLoop = (time: number) => {
      if (!isMounted) return;
      const dt = Math.min((time - lastTime) / 16.666, 2.5); // Normalized to ~60fps
      lastTime = time;
      const now = Date.now();

      // Clear previous frame
      ctx.clearRect(0, 0, width, height);

      // Force pixelated sharp rendering
      ctx.imageSmoothingEnabled = false;

      // -----------------------------------------------------------
      // UPDATE & DRAW PARTICLES
      // -----------------------------------------------------------
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.alpha = Math.max(1 - p.life / p.maxLife, 0);

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
        ctx.restore();
      }

      // -----------------------------------------------------------
      // 1. UPDATE & DRAW METEORS (Randomly fall down & left)
      // -----------------------------------------------------------
      const meteorImg = images['meteor_fire'];
      if (meteorImg && meteorImg.complete) {
        meteors.forEach((m) => {
          if (!m.active) {
            if (now >= m.respawnTime) {
              m.active = true;
              m.x = Math.random() * (width + 400) - 50;
              m.y = -150 - Math.random() * 100;
              m.vy = 4.5 + Math.random() * 4.5;
              m.vx = -(m.vy * (0.65 + Math.random() * 0.25)); // Angled downwards & leftwards
              m.scale = 0.18 + Math.random() * 0.08;
              m.alpha = 0.85 + Math.random() * 0.15;
            }
            return;
          }

          // Advance position
          m.x += m.vx * dt;
          m.y += m.vy * dt;

          const drawW = Math.round(meteorImg.width * m.scale);
          const drawH = Math.round(meteorImg.height * m.scale);

          // Add fiery spark trail
          if (Math.random() < 0.6) {
            const sparkColors = ['#ffe600', '#ff5500', '#ff0055', '#ffffff'];
            const color = sparkColors[Math.floor(Math.random() * sparkColors.length)];
            // Spark spawns near the tail (top-right of sprite)
            const tailX = m.x + drawW * 0.75;
            const tailY = m.y + drawH * 0.2;
            addSpark(tailX, tailY, color, -m.vx * 0.2, -m.vy * 0.2);
          }

          // Render meteor sprite
          ctx.save();
          ctx.globalAlpha = m.alpha;
          ctx.drawImage(meteorImg, Math.round(m.x), Math.round(m.y), drawW, drawH);
          ctx.restore();

          // Check boundary exit
          if (m.y > height + 150 || m.x < -drawW - 100) {
            m.active = false;
            m.respawnTime = now + 1500 + Math.random() * 4000; // Next meteor after 1.5 - 5.5s
          }
        });
      }

      // -----------------------------------------------------------
      // 2. UPDATE & DRAW ROCKETS (Randomly go up)
      // -----------------------------------------------------------
      const rocketImg = images['shuttle_rocket'];
      if (rocketImg && rocketImg.complete) {
        rockets.forEach((r) => {
          if (!r.active) {
            if (now >= r.respawnTime) {
              r.active = true;
              r.x = width * 0.1 + Math.random() * (width * 0.8);
              r.y = height + 150 + Math.random() * 100;
              r.vy = -(3.2 + Math.random() * 3.8);
              r.scale = 0.18 + Math.random() * 0.07;
              r.alpha = 0.85 + Math.random() * 0.15;
            }
            return;
          }

          // Ascend upwards with gentle horizontal sway
          r.y += r.vy * dt;
          r.swayPhase += r.swayFreq * dt;
          r.x += Math.sin(r.swayPhase) * r.swayAmp * dt;

          const drawW = Math.round(rocketImg.width * r.scale);
          const drawH = Math.round(rocketImg.height * r.scale);

          // Add thruster exhaust particles behind the rocket
          const flameBaseX = r.x + drawW * 0.5;
          const flameBaseY = r.y + drawH * 0.95;
          const exhaustColors = ['#ff8800', '#ffe600', '#ffffff', '#ff2200', '#ffaa00'];
          for (let pIdx = 0; pIdx < 2; pIdx++) {
            const color = exhaustColors[Math.floor(Math.random() * exhaustColors.length)];
            addSpark(flameBaseX, flameBaseY, color, (Math.random() - 0.5) * 1.5, 3.0 + Math.random() * 2.5);
          }

          // Render rocket sprite
          ctx.save();
          ctx.globalAlpha = r.alpha;
          ctx.drawImage(rocketImg, Math.round(r.x), Math.round(r.y), drawW, drawH);
          ctx.restore();

          // Check boundary exit
          if (r.y < -drawH - 100) {
            r.active = false;
            r.respawnTime = now + 1500 + Math.random() * 4000; // Next launch after 1.5 - 5.5s
          }
        });
      }

      // -----------------------------------------------------------
      // 3. UPDATE & DRAW OTHER ELEMENTS (Slowly roaming around)
      // -----------------------------------------------------------
      roamers.forEach((roamer) => {
        let imgKey = 'satellite';
        if (roamer.imgType === 'asteroid') imgKey = 'asteroid_moon';
        if (roamer.imgType === 'astronaut') imgKey = 'astronaut';

        const spriteImg = images[imgKey];
        if (!spriteImg || !spriteImg.complete) return;

        // Smoothly adjust wandering velocity over time
        if (now >= roamer.nextVelocityChange) {
          roamer.nextVelocityChange = now + 3000 + Math.random() * 4000;
          roamer.targetVx = (Math.random() - 0.5) * 0.45;
          roamer.targetVy = (Math.random() - 0.5) * 0.35;
        }

        // Steer velocity toward target smoothly
        roamer.vx += (roamer.targetVx - roamer.vx) * 0.02 * dt;
        roamer.vy += (roamer.targetVy - roamer.vy) * 0.02 * dt;

        // Soft screen border steering (keep roaming inside screen)
        const margin = 80;
        if (roamer.x < margin) roamer.vx += 0.02 * dt;
        if (roamer.x > width - margin) roamer.vx -= 0.02 * dt;
        if (roamer.y < margin) roamer.vy += 0.02 * dt;
        if (roamer.y > height - margin) roamer.vy -= 0.02 * dt;

        // Advance position
        roamer.x += roamer.vx * dt;
        roamer.y += roamer.vy * dt;

        // Subtle zero-g bobbing & parallax drift
        roamer.bobPhase += 0.015 * dt;
        const bobOffsetY = Math.sin(roamer.bobPhase) * 5;
        const parallaxOffsetY = (scrollRef.current - 0.5) * 100 * roamer.parallaxFactor;

        // Rotation
        if (roamer.imgType === 'astronaut') {
          // Astronaut gently sways back and forth
          roamer.angle = Math.sin(roamer.bobPhase * 0.6) * 0.22;
        } else {
          // Asteroids and Satellites slowly roll/tumble
          roamer.angle += roamer.angularVelocity * dt;
        }

        const drawW = Math.round(spriteImg.width * roamer.scale);
        const drawH = Math.round(spriteImg.height * roamer.scale);

        // Render roamer sprite centered at (x, y) with rotation
        ctx.save();
        ctx.globalAlpha = roamer.alpha;
        ctx.translate(Math.round(roamer.x), Math.round(roamer.y + bobOffsetY + parallaxOffsetY));
        ctx.rotate(roamer.angle);
        ctx.drawImage(
          spriteImg,
          -Math.round(drawW / 2),
          -Math.round(drawH / 2),
          drawW,
          drawH
        );
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      isMounted = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[2]"
      style={{
        imageRendering: 'pixelated',
      }}
    />
  );
};

export default PixelSpaceDebrisCanvas;
