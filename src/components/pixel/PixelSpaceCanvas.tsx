import React, { useEffect, useRef } from 'react';
import { drawPixelAsteroid, PALETTE } from '../../utils/pixelSprites';

interface PixelSpaceCanvasProps {
  scrollProgress: number; // 0 to 1
}

interface PixelStar {
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
}

interface PixelAsteroidEntity {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  angle: number;
  rotSpeed: number;
}

export const PixelSpaceCanvas: React.FC<PixelSpaceCanvasProps> = ({ scrollProgress }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(scrollProgress);

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // Initialize 8-bit Pixel Stars
    const starCount = 90;
    const starColors = [PALETTE.white, PALETTE.cyan, PALETTE.yellow, PALETTE.magenta];
    const stars: PixelStar[] = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height),
        size: Math.random() > 0.8 ? 3 : 2,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        speed: Math.random() * 0.4 + 0.1,
      });
    }

    // Initialize Tumbling Pixel Asteroids
    const asteroids: PixelAsteroidEntity[] = [];
    for (let i = 0; i < 6; i++) {
      asteroids.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.floor(Math.random() * 2) + 2, // scale 2 or 3
        speedX: (Math.random() - 0.5) * 0.6,
        speedY: (Math.random() * 0.4 + 0.2) * (i % 2 === 0 ? 1 : -1),
        angle: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
      });
    }

    let animationId: number;

    const render = () => {
      animationId = requestAnimationFrame(render);
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Force pixelated rendering
      ctx.imageSmoothingEnabled = false;

      // Transparent Canvas so 3D background rocket shines through
      ctx.clearRect(0, 0, width, height);

      // 1. Draw 8-Bit Pixel Stars
      for (const s of stars) {
        s.y += s.speed + scrollRef.current * 0.8;
        if (s.y > height) {
          s.y = 0;
          s.x = Math.floor(Math.random() * width);
        }
        ctx.fillStyle = s.color;
        ctx.fillRect(Math.floor(s.x), Math.floor(s.y), s.size, s.size);
      }

      // 2. Draw Tumbling Pixel Asteroids (scaled 8-bit sprites)
      for (const ast of asteroids) {
        ast.x += ast.speedX;
        ast.y += ast.speedY + scrollRef.current * 0.5;
        ast.angle += ast.rotSpeed;

        if (ast.x < -40) ast.x = width + 40;
        if (ast.x > width + 40) ast.x = -40;
        if (ast.y < -40) ast.y = height + 40;
        if (ast.y > height + 40) ast.y = -40;

        drawPixelAsteroid(ctx, Math.floor(ast.x), Math.floor(ast.y), ast.size, ast.angle);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] pixelated"
    />
  );
};
