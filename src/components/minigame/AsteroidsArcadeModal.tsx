import React, { useEffect, useRef, useState, useCallback } from 'react';
import { X, RotateCcw, Trophy, Crosshair, ArrowUp, ArrowLeft, ArrowRight, Zap, Sparkles } from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface AsteroidsArcadeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClaimBadge?: (score: number) => void;
}

interface Ship {
  x: number;
  y: number;
  r: number; // radius
  a: number; // angle in radians
  rot: number; // rotation speed
  thrust: boolean;
  xv: number; // velocity x
  yv: number; // velocity y
  invincibleTimer: number; // frames of invulnerability on spawn
}

interface Laser {
  x: number;
  y: number;
  xv: number;
  yv: number;
  life: number;
  isLeftWing?: boolean;
}

export type AlienKind = 'cat' | 'slug' | 'ufo';

interface Asteroid {
  x: number;
  y: number;
  xv: number;
  yv: number;
  r: number;
  a: number;
  rot: number;
  vert: number;
  offsets: number[];
  tier: number; // 3: big, 2: medium, 1: small
  kind: AlienKind;
  animPhase: number;
  bobSpeed: number;
}

interface Particle {
  x: number;
  y: number;
  xv: number;
  yv: number;
  size: number;
  life: number;
  maxLife: number;
  color: string;
}

interface ScorePopup {
  x: number;
  y: number;
  text: string;
  color: string;
  life: number;
  maxLife: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  color: string;
  life: number;
  maxLife: number;
}

interface Star {
  x: number;
  y: number;
  size: number;
  color: string;
  speedMultiplier: number;
  alpha: number;
}

export const AsteroidsArcadeModal: React.FC<AsteroidsArcadeModalProps> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [formatMode, setFormatMode] = useState<'retro' | 'vector'>('retro');
  const formatModeRef = useRef<'retro' | 'vector'>('retro');
  formatModeRef.current = formatMode;

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(1280);
  const [lives, setLives] = useState(3);
  const [wave, setWave] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [missionQualified, setMissionQualified] = useState(false);

  // Sprites (User fighter + 3 Alien swarm species)
  const fighterImgRef = useRef<HTMLImageElement | null>(null);
  const catImgRef = useRef<HTMLImageElement | null>(null);
  const slugImgRef = useRef<HTMLImageElement | null>(null);
  const ufoImgRef = useRef<HTMLImageElement | null>(null);

  // Load Sprites
  useEffect(() => {
    const fImg = new Image();
    fImg.src = '/pixel_space/ship_fighter.png';
    fImg.onload = () => {
      fighterImgRef.current = fImg;
    };

    const cImg = new Image();
    cImg.src = '/pixel_space/alien_cat.png';
    cImg.onload = () => {
      catImgRef.current = cImg;
    };

    const sImg = new Image();
    sImg.src = '/pixel_space/alien_slug.png';
    sImg.onload = () => {
      slugImgRef.current = sImg;
    };

    const uImg = new Image();
    uImg.src = '/pixel_space/alien_ufo.png';
    uImg.onload = () => {
      ufoImgRef.current = uImg;
    };
  }, []);

  // Ship and Game State Refs for smooth 60fps loop
  const gameState = useRef<{
    ship: Ship;
    lasers: Laser[];
    asteroids: Asteroid[];
    particles: Particle[];
    scorePopups: ScorePopup[];
    shockwaves: Shockwave[];
    stars: Star[];
    shake: number;
    keys: { [key: string]: boolean };
    score: number;
    lives: number;
    wave: number;
    gameOver: boolean;
  }>({
    ship: { x: 300, y: 300, r: 14, a: -Math.PI / 2, rot: 0, thrust: false, xv: 0, yv: 0, invincibleTimer: 120 },
    lasers: [],
    asteroids: [],
    particles: [],
    scorePopups: [],
    shockwaves: [],
    stars: [],
    shake: 0,
    keys: {},
    score: 0,
    lives: 3,
    wave: 1,
    gameOver: false,
  });

  const initStars = (w: number, h: number): Star[] => {
    const stars: Star[] = [];
    const colors = ['#ffffff', '#00f0ff', '#ffe600', '#ff007f', '#00ff66'];
    for (let i = 0; i < 70; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() < 0.25 ? 2 : 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedMultiplier: Math.random() * 0.4 + 0.1,
        alpha: Math.random() * 0.7 + 0.3,
      });
    }
    return stars;
  };

  const initAsteroids = useCallback((waveNum: number, width: number, height: number) => {
    const asts: Asteroid[] = [];
    const count = 4 + waveNum * 2;
    const kinds: AlienKind[] = ['cat', 'slug', 'ufo'];
    for (let i = 0; i < count; i++) {
      let x: number, y: number;
      // Spawn away from ship center
      do {
        x = Math.random() * width;
        y = Math.random() * height;
      } while (Math.hypot(x - width / 2, y - height / 2) < 140);

      const kind = kinds[(i + waveNum - 1) % kinds.length];
      // Really small base hit radius (Tier 3)
      const r = kind === 'slug' ? 14 : 15;
      const vert = Math.floor(Math.random() * 4) + 8;
      const offsets: number[] = [];
      for (let j = 0; j < vert; j++) {
        offsets.push(Math.random() * 0.4 + 0.8);
      }

      asts.push({
        x,
        y,
        xv: (Math.random() - 0.5) * (1.2 + waveNum * 0.2),
        yv: (Math.random() - 0.5) * (1.2 + waveNum * 0.2),
        r,
        a: (Math.random() - 0.5) * 0.2,
        rot: (Math.random() - 0.5) * 0.02,
        vert,
        offsets,
        tier: 3,
        kind,
        animPhase: Math.random() * Math.PI * 2,
        bobSpeed: 0.05 + Math.random() * 0.035,
      });
    }
    return asts;
  }, []);

  const resetGame = useCallback(() => {
    const canvas = canvasRef.current;
    const w = canvas ? canvas.width : 760;
    const h = canvas ? canvas.height : 520;

    gameState.current = {
      ship: { x: w / 2, y: h / 2, r: 14, a: -Math.PI / 2, rot: 0, thrust: false, xv: 0, yv: 0, invincibleTimer: 120 },
      lasers: [],
      asteroids: initAsteroids(1, w, h),
      particles: [],
      scorePopups: [],
      shockwaves: [],
      stars: initStars(w, h),
      shake: 0,
      keys: {},
      score: 0,
      lives: 3,
      wave: 1,
      gameOver: false,
    };
    setScore(0);
    setLives(3);
    setWave(1);
    setGameOver(false);
    setMissionQualified(false);
  }, [initAsteroids]);

  const toggleFormat = useCallback(() => {
    soundFx.playCoin();
    setFormatMode((prev) => (prev === 'retro' ? 'vector' : 'retro'));
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas resolution
    const rect = canvas.parentElement?.getBoundingClientRect();
    const w = Math.min(rect?.width || 760, 760);
    const h = Math.min(rect?.height || 500, 500);
    canvas.width = w;
    canvas.height = h;

    resetGame();

    const handleKeyDown = (e: KeyboardEvent) => {
      gameState.current.keys[e.code] = true;
      if (e.code === 'Space') {
        e.preventDefault();
        fireLaser();
      }
      if (e.code === 'KeyM') {
        e.preventDefault();
        toggleFormat();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      gameState.current.keys[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    let animationId: number;

    const fireLaser = () => {
      const gs = gameState.current;
      if (gs.gameOver || gs.lasers.length >= 8) return;
      soundFx.playPew();

      const laserSpeed = 9;
      const isRetro = formatModeRef.current === 'retro';

      if (isRetro) {
        // Dual Wingtip Plasma Cannons in OG Retro Mode
        const perpAngle = gs.ship.a + Math.PI / 2;
        const wingSpan = gs.ship.r * 0.9;

        // Left wing bolt
        gs.lasers.push({
          x: gs.ship.x + (4 / 3) * gs.ship.r * Math.cos(gs.ship.a) + Math.cos(perpAngle) * wingSpan,
          y: gs.ship.y + (4 / 3) * gs.ship.r * Math.sin(gs.ship.a) + Math.sin(perpAngle) * wingSpan,
          xv: laserSpeed * Math.cos(gs.ship.a) + gs.ship.xv * 0.4,
          yv: laserSpeed * Math.sin(gs.ship.a) + gs.ship.yv * 0.4,
          life: 52,
          isLeftWing: true,
        });

        // Right wing bolt
        gs.lasers.push({
          x: gs.ship.x + (4 / 3) * gs.ship.r * Math.cos(gs.ship.a) - Math.cos(perpAngle) * wingSpan,
          y: gs.ship.y + (4 / 3) * gs.ship.r * Math.sin(gs.ship.a) - Math.sin(perpAngle) * wingSpan,
          xv: laserSpeed * Math.cos(gs.ship.a) + gs.ship.xv * 0.4,
          yv: laserSpeed * Math.sin(gs.ship.a) + gs.ship.yv * 0.4,
          life: 52,
          isLeftWing: false,
        });
      } else {
        // Center Needle Vector Laser in 1979 Mode
        gs.lasers.push({
          x: gs.ship.x + (4 / 3) * gs.ship.r * Math.cos(gs.ship.a),
          y: gs.ship.y + (4 / 3) * gs.ship.r * Math.sin(gs.ship.a),
          xv: laserSpeed * Math.cos(gs.ship.a) + gs.ship.xv * 0.5,
          yv: laserSpeed * Math.sin(gs.ship.a) + gs.ship.yv * 0.5,
          life: 55,
        });
      }
    };

    const spawnParticles = (x: number, y: number, color = '#f59e0b', count = 14, size = 2) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const spd = Math.random() * 3.5 + 1;
        const life = Math.floor(Math.random() * 22) + 16;
        gameState.current.particles.push({
          x,
          y,
          xv: Math.cos(angle) * spd,
          yv: Math.sin(angle) * spd,
          size,
          life,
          maxLife: life,
          color,
        });
      }
    };

    const render = () => {
      animationId = requestAnimationFrame(render);
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const gs = gameState.current;
      const ship = gs.ship;
      const isRetro = formatModeRef.current === 'retro';

      // Update Invulnerability
      if (ship.invincibleTimer > 0) {
        ship.invincibleTimer--;
      }

      // Handle Key Controls
      if (!gs.gameOver) {
        if (gs.keys['ArrowLeft'] || gs.keys['KeyA']) {
          ship.a -= 0.08;
        }
        if (gs.keys['ArrowRight'] || gs.keys['KeyD']) {
          ship.a += 0.08;
        }
        if (gs.keys['ArrowUp'] || gs.keys['KeyW']) {
          ship.thrust = true;
          const thrustPower = 0.17;
          ship.xv += Math.cos(ship.a) * thrustPower;
          ship.yv += Math.sin(ship.a) * thrustPower;

          // Dual thruster plume particles aligned to the fighter's twin engine exhausts
          if (Math.random() < 0.75) {
            const perpA = ship.a + Math.PI / 2;
            const nozzleSpan = 6;
            const rearDist = ship.r * 1.1;

            for (const sign of [-1, 1]) {
              const exX = ship.x - rearDist * Math.cos(ship.a) + sign * nozzleSpan * Math.cos(perpA);
              const exY = ship.y - rearDist * Math.sin(ship.a) + sign * nozzleSpan * Math.sin(perpA);
              const flameColor = Math.random() < 0.35 ? '#00f0ff' : Math.random() < 0.7 ? '#ffe600' : '#ff007f';
              spawnParticles(exX, exY, flameColor, 2, 2);
            }
          }
        } else {
          ship.thrust = false;
        }
      }

      // Physics Friction
      ship.xv *= 0.985;
      ship.yv *= 0.985;
      ship.x += ship.xv;
      ship.y += ship.yv;

      // Screen wrap for ship
      if (ship.x < -ship.r) ship.x = w + ship.r;
      if (ship.x > w + ship.r) ship.x = -ship.r;
      if (ship.y < -ship.r) ship.y = h + ship.r;
      if (ship.y > h + ship.r) ship.y = -ship.r;

      // Screen Shake application
      ctx.save();
      if (gs.shake > 0) {
        const sx = (Math.random() - 0.5) * gs.shake;
        const sy = (Math.random() - 0.5) * gs.shake;
        ctx.translate(sx, sy);
        gs.shake *= 0.88;
        if (gs.shake < 0.2) gs.shake = 0;
      }

      // Background Rendering
      if (isRetro) {
        // Deep Space Black with Parallax 8-Bit Twinkling Stars
        ctx.fillStyle = '#04060c';
        ctx.fillRect(0, 0, w, h);

        // Update and draw starfield with gentle inertia drift
        for (const star of gs.stars) {
          star.x -= ship.xv * star.speedMultiplier * 0.4;
          star.y -= ship.yv * star.speedMultiplier * 0.4;

          if (star.x < 0) star.x = w;
          if (star.x > w) star.x = 0;
          if (star.y < 0) star.y = h;
          if (star.y > h) star.y = 0;

          // Twinkle
          const alpha = star.alpha * (0.8 + Math.sin(Date.now() * 0.005 + star.x) * 0.2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = alpha;
          ctx.fillRect(Math.floor(star.x), Math.floor(star.y), star.size, star.size);
        }
        ctx.globalAlpha = 1.0;

        // Subtle CRT scanlines across the canvas
        ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
        for (let y = 0; y < h; y += 3) {
          ctx.fillRect(0, y, w, 1.5);
        }
      } else {
        // Vector CRT Grid overlay background
        ctx.fillStyle = '#080a0f';
        ctx.fillRect(0, 0, w, h);

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.lineWidth = 1;
        const gridSize = 32;
        for (let gx = 0; gx < w; gx += gridSize) {
          ctx.beginPath();
          ctx.moveTo(gx, 0);
          ctx.lineTo(gx, h);
          ctx.stroke();
        }
        for (let gy = 0; gy < h; gy += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, gy);
          ctx.lineTo(w, gy);
          ctx.stroke();
        }
      }

      // Update and Draw Lasers
      for (let i = gs.lasers.length - 1; i >= 0; i--) {
        const l = gs.lasers[i];
        l.x += l.xv;
        l.y += l.yv;
        l.life--;

        // Screen wrap
        if (l.x < 0) l.x = w;
        if (l.x > w) l.x = 0;
        if (l.y < 0) l.y = h;
        if (l.y > h) l.y = 0;

        if (isRetro) {
          // OG Retro Dual Plasma Bolts
          ctx.save();
          ctx.translate(l.x, l.y);
          const laserAngle = Math.atan2(l.yv, l.xv);
          ctx.rotate(laserAngle);

          // Glowing plasma core
          ctx.fillStyle = '#00f0ff';
          ctx.fillRect(-6, -2, 12, 4);
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(-3, -1, 6, 2);
          ctx.fillStyle = '#ffe600';
          ctx.fillRect(3, -1, 3, 2);
          ctx.restore();
        } else {
          // Vector Beam Dot
          ctx.beginPath();
          ctx.arc(l.x, l.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = '#38bdf8';
          ctx.fill();
        }

        // Laser - Asteroid Collision
        for (let j = gs.asteroids.length - 1; j >= 0; j--) {
          const ast = gs.asteroids[j];
          if (Math.hypot(l.x - ast.x, l.y - ast.y) < ast.r) {
            soundFx.playExplosion();

            // Screen Shake on impact
            gs.shake = ast.tier === 3 ? 7 : ast.tier === 2 ? 4 : 2;

            // Explosion Particles themed to alien kind
            const partColor =
              ast.kind === 'cat'
                ? ast.tier === 3 ? '#22c55e' : '#86efac'
                : ast.kind === 'slug'
                ? ast.tier === 3 ? '#a3e635' : '#fef08a'
                : ast.tier === 3 ? '#38bdf8' : '#e0e7ff';

            spawnParticles(ast.x, ast.y, partColor, isRetro ? 20 : 14, isRetro ? 3 : 2);

            // Retro Shockwave Ring
            if (isRetro) {
              gs.shockwaves.push({
                x: ast.x,
                y: ast.y,
                radius: 3,
                maxRadius: ast.r * 2.0,
                color: ast.kind === 'cat' ? '#00ff66' : ast.kind === 'slug' ? '#a3e635' : '#00f0ff',
                life: 16,
                maxLife: 16,
              });
            }

            // Points calculation and floating score popup
            const basePts = ast.kind === 'ufo' ? 120 : ast.kind === 'slug' ? 70 : 50;
            const pts = ast.tier === 3 ? basePts : ast.tier === 2 ? basePts * 2 : basePts * 3;
            gs.score += pts;
            setScore(gs.score);

            const label =
              ast.kind === 'cat'
                ? ast.tier === 1 ? '+150 MEOW!' : '+50 CAT'
                : ast.kind === 'slug'
                ? ast.tier === 1 ? '+210 SLIME!' : '+70 SLUG'
                : ast.tier === 1 ? '+360 UFO!!' : '+120 UFO';

            gs.scorePopups.push({
              x: ast.x,
              y: ast.y,
              text: label,
              color: ast.kind === 'cat' ? '#00ff66' : ast.kind === 'slug' ? '#fef08a' : '#00f0ff',
              life: 38,
              maxLife: 38,
            });

            if (gs.score >= 500 && !missionQualified) {
              setMissionQualified(true);
            }

            // Split alien into smaller baby swarm members (Tier 3 -> Tier 2 -> Tier 1)
            if (ast.tier > 1) {
              const newTier = ast.tier - 1;
              const newR = newTier === 2 ? (ast.kind === 'slug' ? 10 : 11) : (ast.kind === 'slug' ? 7 : 7.5);
              for (let k = 0; k < 2; k++) {
                const vert = Math.floor(Math.random() * 3) + 7;
                const offsets: number[] = [];
                for (let o = 0; o < vert; o++) offsets.push(Math.random() * 0.4 + 0.8);

                gs.asteroids.push({
                  x: ast.x,
                  y: ast.y,
                  xv: (Math.random() - 0.5) * (2.4 + gs.wave * 0.35),
                  yv: (Math.random() - 0.5) * (2.4 + gs.wave * 0.35),
                  r: newR,
                  a: (Math.random() - 0.5) * 0.2,
                  rot: (Math.random() - 0.5) * 0.04,
                  vert,
                  offsets,
                  tier: newTier,
                  kind: ast.kind,
                  animPhase: Math.random() * Math.PI * 2,
                  bobSpeed: 0.06 + Math.random() * 0.04,
                });
              }
            }

            gs.asteroids.splice(j, 1);
            gs.lasers.splice(i, 1);
            break;
          }
        }

        if (l.life <= 0) {
          gs.lasers.splice(i, 1);
        }
      }

      // Check Next Wave
      if (gs.asteroids.length === 0 && !gs.gameOver) {
        gs.wave += 1;
        setWave(gs.wave);
        soundFx.playSuccess();
        gs.asteroids = initAsteroids(gs.wave, w, h);
      }

      // Update and Draw Asteroids / Alien Swarm
      for (let i = 0; i < gs.asteroids.length; i++) {
        const ast = gs.asteroids[i];
        ast.x += ast.xv;
        ast.y += ast.yv;
        ast.animPhase += ast.bobSpeed;

        // Subtle gentle drift/wobble per alien species
        if (ast.kind === 'cat') {
          ast.a = Math.sin(ast.animPhase * 0.8) * 0.14;
        } else if (ast.kind === 'slug') {
          ast.a = Math.sin(ast.animPhase * 1.2) * 0.1;
          // Micro slime droplet
          if (Math.random() < 0.04) {
            gs.particles.push({
              x: ast.x + (Math.random() - 0.5) * 6,
              y: ast.y + ast.r * 0.5,
              xv: -ast.xv * 0.2,
              yv: Math.random() * 0.5,
              size: 1.5,
              life: 14,
              maxLife: 14,
              color: '#4ade80',
            });
          }
        } else if (ast.kind === 'ufo') {
          ast.a = Math.sin(ast.animPhase * 1.5) * 0.16;
          // Thruster spark from UFO
          if (Math.random() < 0.05) {
            gs.particles.push({
              x: ast.x + (Math.random() - 0.5) * 4,
              y: ast.y + ast.r * 0.7,
              xv: (Math.random() - 0.5) * 0.4,
              yv: Math.random() * 0.8 + 0.3,
              size: 1.5,
              life: 12,
              maxLife: 12,
              color: '#38bdf8',
            });
          }
        }

        if (ast.x < -ast.r * 1.5) ast.x = w + ast.r * 1.5;
        if (ast.x > w + ast.r * 1.5) ast.x = -ast.r * 1.5;
        if (ast.y < -ast.r * 1.5) ast.y = h + ast.r * 1.5;
        if (ast.y > h + ast.r * 1.5) ast.y = -ast.r * 1.5;

        if (isRetro) {
          // OG Retro 8-Bit Pixel Alien Animations
          ctx.save();
          ctx.translate(ast.x, ast.y);

          if (ast.kind === 'cat') {
            // === ALIEN CAT ANIMATION ===
            const bob = Math.sin(ast.animPhase) * 2;
            ctx.rotate(ast.a);
            const breath = 1 + Math.sin(ast.animPhase * 2) * 0.06;
            ctx.scale(breath, 2 - breath);

            const cImg = catImgRef.current;
            const catW = ast.tier === 3 ? 28 : ast.tier === 2 ? 20 : 14;
            const catH = ast.tier === 3 ? 34 : ast.tier === 2 ? 24 : 17;

            if (cImg && cImg.complete) {
              ctx.drawImage(cImg, -catW / 2, -catH / 2 + bob, catW, catH);
            } else {
              ctx.fillStyle = '#22c55e';
              ctx.fillRect(-catW / 2, -catH / 2 + bob, catW, catH);
            }

            // Glowing antennae beacon balls
            const antennaPulse = 0.5 + 0.5 * Math.sin(ast.animPhase * 3.5);
            ctx.fillStyle = `rgba(34, 197, 94, ${antennaPulse})`;
            ctx.beginPath();
            ctx.arc(-catW * 0.28, -catH * 0.44 + bob, 2, 0, Math.PI * 2);
            ctx.arc(catW * 0.28, -catH * 0.44 + bob, 2, 0, Math.PI * 2);
            ctx.fill();

            if (ast.tier === 3) {
              ctx.strokeStyle = `rgba(74, 222, 128, ${0.15 + antennaPulse * 0.25})`;
              ctx.lineWidth = 1;
              ctx.strokeRect(-catW / 2 - 2, -catH / 2 + bob - 2, catW + 4, catH + 4);
            }
          } else if (ast.kind === 'slug') {
            // === ALIEN SLUG ANIMATION ===
            const hop = Math.abs(Math.sin(ast.animPhase * 1.8));
            const sx = 1 + (1 - hop) * 0.18;
            const sy = 0.85 + hop * 0.28;
            const bounceY = -hop * 2.5;

            ctx.rotate(ast.a);
            ctx.scale(sx, sy);

            const sImg = slugImgRef.current;
            const slugW = ast.tier === 3 ? 28 : ast.tier === 2 ? 20 : 14;
            const slugH = ast.tier === 3 ? 28 : ast.tier === 2 ? 20 : 14;

            if (sImg && sImg.complete) {
              ctx.drawImage(sImg, -slugW / 2, -slugH / 2 + bounceY, slugW, slugH);
            } else {
              ctx.fillStyle = '#84cc16';
              ctx.fillRect(-slugW / 2, -slugH / 2 + bounceY, slugW, slugH);
            }

            // Antenna wiggle tips
            const wiggle = Math.sin(ast.animPhase * 3) * 1.5;
            ctx.fillStyle = '#a3e635';
            ctx.fillRect(-slugW * 0.3 + wiggle, -slugH * 0.45 + bounceY, 2, 2);
            ctx.fillRect(slugW * 0.3 - wiggle, -slugH * 0.45 + bounceY, 2, 2);
          } else if (ast.kind === 'ufo') {
            // === ALIEN UFO ANIMATION ===
            const hoverY = Math.sin(ast.animPhase * 2.2) * 2;
            ctx.rotate(ast.a);

            const uImg = ufoImgRef.current;
            const ufoW = ast.tier === 3 ? 34 : ast.tier === 2 ? 24 : 17;
            const ufoH = ast.tier === 3 ? 26 : ast.tier === 2 ? 18 : 13;

            // Conic anti-gravity beam beneath saucer
            const beamAlpha = 0.25 + 0.2 * Math.sin(ast.animPhase * 4);
            ctx.save();
            ctx.fillStyle = `rgba(0, 240, 255, ${beamAlpha})`;
            ctx.beginPath();
            ctx.moveTo(-ufoW * 0.22, ufoH * 0.35 + hoverY);
            ctx.lineTo(ufoW * 0.22, ufoH * 0.35 + hoverY);
            ctx.lineTo(ufoW * 0.38, ufoH * 0.75 + hoverY);
            ctx.lineTo(-ufoW * 0.38, ufoH * 0.75 + hoverY);
            ctx.closePath();
            ctx.fill();
            ctx.restore();

            if (uImg && uImg.complete) {
              ctx.drawImage(uImg, -ufoW / 2, -ufoH / 2 + hoverY, ufoW, ufoH);
            } else {
              ctx.fillStyle = '#0284c7';
              ctx.fillRect(-ufoW / 2, -ufoH / 2 + hoverY, ufoW, ufoH);
            }

            // Strobing rim beacon lights
            const strobe = Math.floor(ast.animPhase * 4) % 2 === 0;
            ctx.fillStyle = strobe ? '#00f0ff' : '#ffe600';
            ctx.fillRect(-ufoW * 0.38, hoverY - 1, 2, 2);
            ctx.fillRect(ufoW * 0.38 - 2, hoverY - 1, 2, 2);
            ctx.fillStyle = strobe ? '#ffe600' : '#00f0ff';
            ctx.fillRect(-ufoW * 0.12, hoverY + 1, 2, 2);
            ctx.fillRect(ufoW * 0.12 - 2, hoverY + 1, 2, 2);
          }

          ctx.restore();
        } else {
          // CAD Vector Outlines
          ctx.save();
          ctx.translate(ast.x, ast.y);
          ctx.rotate(ast.a);
          ctx.lineWidth = 1.5;

          if (ast.kind === 'cat') {
            ctx.strokeStyle = '#22c55e';
            const s = ast.r;
            ctx.beginPath();
            ctx.moveTo(-s * 0.6, s * 0.5);
            ctx.lineTo(-s * 0.6, -s * 0.2);
            ctx.lineTo(-s * 0.8, -s * 0.7);
            ctx.lineTo(-s * 0.3, -s * 0.4);
            ctx.lineTo(s * 0.3, -s * 0.4);
            ctx.lineTo(s * 0.8, -s * 0.7);
            ctx.lineTo(s * 0.6, -s * 0.2);
            ctx.lineTo(s * 0.6, s * 0.5);
            ctx.closePath();
            ctx.stroke();

            // Antennae
            ctx.beginPath();
            ctx.moveTo(-s * 0.2, -s * 0.4);
            ctx.lineTo(-s * 0.35, -s * 0.85);
            ctx.moveTo(s * 0.2, -s * 0.4);
            ctx.lineTo(s * 0.35, -s * 0.85);
            ctx.stroke();
          } else if (ast.kind === 'slug') {
            ctx.strokeStyle = '#84cc16';
            const s = ast.r;
            ctx.beginPath();
            ctx.moveTo(-s * 0.7, s * 0.5);
            ctx.lineTo(-s * 0.7, 0);
            ctx.arc(0, 0, s * 0.7, Math.PI, 0, false);
            ctx.lineTo(s * 0.7, s * 0.5);
            ctx.closePath();
            ctx.stroke();

            // Antennae
            ctx.beginPath();
            ctx.moveTo(-s * 0.3, -s * 0.6);
            ctx.lineTo(-s * 0.35, -s * 0.95);
            ctx.moveTo(s * 0.3, -s * 0.6);
            ctx.lineTo(s * 0.35, -s * 0.95);
            ctx.stroke();
          } else if (ast.kind === 'ufo') {
            ctx.strokeStyle = '#38bdf8';
            const s = ast.r;
            ctx.beginPath();
            ctx.ellipse(0, 0, s * 1.1, s * 0.4, 0, 0, Math.PI * 2);
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(0, -s * 0.1, s * 0.45, Math.PI, 0);
            ctx.stroke();
          }

          ctx.restore();
        }

        // Ship collision with asteroid (only if not invincible)
        if (
          !gs.gameOver &&
          ship.invincibleTimer <= 0 &&
          Math.hypot(ship.x - ast.x, ship.y - ast.y) < ship.r + ast.r * 0.75
        ) {
          soundFx.playExplosion();
          gs.shake = 14;
          spawnParticles(ship.x, ship.y, '#ef4444', 36, isRetro ? 3 : 2);
          gs.lives -= 1;
          setLives(gs.lives);

          if (gs.lives <= 0) {
            gs.gameOver = true;
            setGameOver(true);
            setHighScore((prev) => Math.max(prev, gs.score));
          } else {
            // Respawn ship center with invulnerability
            ship.x = w / 2;
            ship.y = h / 2;
            ship.xv = 0;
            ship.yv = 0;
            ship.a = -Math.PI / 2;
            ship.invincibleTimer = 120; // 2 seconds of grace
          }
        }
      }

      // Update & Draw Shockwaves (Retro Mode)
      for (let i = gs.shockwaves.length - 1; i >= 0; i--) {
        const sw = gs.shockwaves[i];
        sw.radius += (sw.maxRadius - sw.radius) * 0.15;
        sw.life--;
        const alpha = sw.life / sw.maxLife;

        ctx.strokeStyle = sw.color;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1.0;

        if (sw.life <= 0) {
          gs.shockwaves.splice(i, 1);
        }
      }

      // Update & Draw Particles
      for (let i = gs.particles.length - 1; i >= 0; i--) {
        const p = gs.particles[i];
        p.x += p.xv;
        p.y += p.yv;
        p.life--;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        if (p.life <= 0) gs.particles.splice(i, 1);
      }

      // Draw Floating Score Popups
      for (let i = gs.scorePopups.length - 1; i >= 0; i--) {
        const sp = gs.scorePopups[i];
        sp.y -= 0.8;
        sp.life--;
        const alpha = Math.min(sp.life / (sp.maxLife * 0.3), 1);

        ctx.save();
        ctx.font = 'bold 10px "Press Start 2P", monospace';
        ctx.fillStyle = sp.color;
        ctx.globalAlpha = alpha;
        ctx.textAlign = 'center';
        ctx.fillText(sp.text, sp.x, sp.y);
        ctx.restore();

        if (sp.life <= 0) {
          gs.scorePopups.splice(i, 1);
        }
      }

      // Draw Ship
      if (!gs.gameOver) {
        ctx.save();
        ctx.translate(ship.x, ship.y);
        ctx.rotate(ship.a);

        if (isRetro) {
          // OG Retro Fighter Pixel Interceptor
          const fImg = fighterImgRef.current;
          if (fImg && fImg.complete) {
            ctx.save();
            // Rotate +90deg because sprite image natively points UP
            ctx.rotate(Math.PI / 2);
            const spriteWidth = 25;
            const spriteHeight = 46;
            ctx.drawImage(fImg, -spriteWidth / 2, -spriteHeight / 2, spriteWidth, spriteHeight);

            // Dual animated plasma thrusters aligned to the two pink nozzles!
            if (ship.thrust) {
              const flameLen = 10 + Math.random() * 8;
              const nozzleOffsets = [-6.5, 5.5];

              for (const nx of nozzleOffsets) {
                // Outer hot flame
                ctx.fillStyle = '#ffe600';
                ctx.fillRect(nx - 2, spriteHeight / 2 - 4, 4, flameLen);
                // Mid plasma flame
                ctx.fillStyle = '#ff007f';
                ctx.fillRect(nx - 1.5, spriteHeight / 2 - 4, 3, flameLen * 0.7);
                // Core white thrust
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(nx - 0.5, spriteHeight / 2 - 4, 1, flameLen * 0.4);
              }
            }
            ctx.restore();
          } else {
            // Crisp procedural pixel fighter fallback
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(-ship.r, -ship.r * 0.6, ship.r * 2, ship.r * 1.2);
            ctx.fillStyle = '#00f0ff';
            ctx.fillRect(ship.r * 0.4, -ship.r * 0.3, ship.r * 0.6, ship.r * 0.6);
          }

          // Invulnerability Shield Aura
          if (ship.invincibleTimer > 0) {
            const shieldAlpha = 0.5 + Math.sin(Date.now() * 0.02) * 0.4;
            ctx.strokeStyle = '#00f0ff';
            ctx.globalAlpha = shieldAlpha;
            ctx.lineWidth = 2;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.arc(0, 0, ship.r * 1.6, 0, Math.PI * 2);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.globalAlpha = 1.0;
          }
        } else {
          // Vector Interceptor with Twin Nozzles
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.beginPath();
          // Twin forward prongs
          ctx.moveTo(ship.r * 1.5, -ship.r * 0.3);
          ctx.lineTo(ship.r * 0.6, -ship.r * 0.2);
          ctx.lineTo(ship.r * 0.6, ship.r * 0.2);
          ctx.lineTo(ship.r * 1.5, ship.r * 0.3);
          ctx.lineTo(ship.r * 0.4, ship.r * 0.5);
          ctx.lineTo(-ship.r * 0.8, ship.r * 0.9); // Starboard wing
          ctx.lineTo(-ship.r * 0.4, ship.r * 0.3);
          ctx.lineTo(-ship.r * 0.9, 0); // Center rear notch
          ctx.lineTo(-ship.r * 0.4, -ship.r * 0.3);
          ctx.lineTo(-ship.r * 0.8, -ship.r * 0.9); // Port wing
          ctx.lineTo(ship.r * 0.4, -ship.r * 0.5);
          ctx.closePath();
          ctx.stroke();

          // Cockpit core accent
          ctx.strokeStyle = '#00f0ff';
          ctx.strokeRect(-ship.r * 0.2, -ship.r * 0.2, ship.r * 0.6, ship.r * 0.4);

          // Thruster flames when thrusting
          if (ship.thrust) {
            ctx.strokeStyle = '#ffe600';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(-ship.r * 0.6, -ship.r * 0.35);
            ctx.lineTo(-ship.r * 1.6, -ship.r * 0.35);
            ctx.moveTo(-ship.r * 0.6, ship.r * 0.35);
            ctx.lineTo(-ship.r * 1.6, ship.r * 0.35);
            ctx.stroke();
          }

          // Invulnerability Shield in Vector
          if (ship.invincibleTimer > 0) {
            ctx.strokeStyle = '#00ff66';
            ctx.setLineDash([3, 3]);
            ctx.beginPath();
            ctx.arc(0, 0, ship.r * 1.6, 0, Math.PI * 2);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }

        ctx.restore();
      }

      ctx.restore(); // Restore shake translation
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isOpen, resetGame, initAsteroids, missionQualified, toggleFormat]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/90 animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl max-h-[95vh] rounded-none bg-[#05070c] border-3 border-amber-500 p-3 sm:p-5 shadow-[8px_8px_0px_#000000] overflow-y-auto flex flex-col">
        {/* Arcade Cabinet Marquee Header */}
        <div className="flex flex-wrap items-center justify-between pb-2.5 border-b-2 border-white/20 mb-2.5 gap-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-none bg-black text-amber-400 border border-amber-500 shadow-[2px_2px_0px_#000000] shrink-0">
              <Crosshair className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-pixel text-xs sm:text-sm text-white tracking-wider flex items-center gap-1.5 flex-wrap">
                <span>HRC SIMULATOR // {formatMode === 'retro' ? '👾 ALIEN SWARM [RETRO]' : '📐 VECTOR ARCADE'}</span>
                <span className="text-[8px] px-1.5 py-0.5 rounded-none bg-black text-amber-300 font-pixel border border-amber-500">
                  ASTRA FIGHTER ENGINE
                </span>
              </h3>
              <p className="text-[9px] sm:text-[10px] font-mono-tech text-[#00f0ff] mt-0.5">
                [A/D or ←/→] Rotate • [W or ↑] Twin Thrusters • [SPACE] Dual Plasma • [M] Switch Format
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Format Switcher Toggle Button */}
            <button
              onClick={toggleFormat}
              className={`px-2.5 py-1 text-[9px] font-pixel border-2 cursor-pointer transition-all shadow-[2px_2px_0px_#000000] flex items-center gap-1.5 active:translate-x-0.5 active:translate-y-0.5 ${
                formatMode === 'retro'
                  ? 'border-[#00ff66] bg-[#00ff66] text-black font-bold'
                  : 'border-[#00f0ff] bg-black text-[#00f0ff] hover:bg-[#00f0ff]/10'
              }`}
              title="Toggle between OG Retro 8-Bit and Vector 1979 Formats (Shortcut: [M])"
            >
              <Sparkles className="w-3 h-3" />
              <span>{formatMode === 'retro' ? 'OG RETRO [8-BIT]' : 'VECTOR [1979]'}</span>
            </button>

            {/* Exit Modal Button */}
            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="p-1 rounded-none text-slate-300 hover:text-white bg-black hover:bg-white/20 border border-white/30 transition-colors cursor-pointer"
              title="Exit Simulator"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Score & Telemetry Readout Bar */}
        <div className="grid grid-cols-4 gap-2 mb-2.5 font-mono-tech text-xs bg-black p-2 rounded-none border-2 border-white/20 shadow-[2px_2px_0px_#000000]">
          <div>
            <div className="text-[8px] sm:text-[9px] font-pixel text-slate-400">
              {formatMode === 'retro' ? '1UP SCORE' : 'SCORE'}
            </div>
            <div className="text-amber-400 font-pixel text-xs sm:text-base tabular-nums mt-0.5">
              {score.toString().padStart(5, '0')}
            </div>
          </div>
          <div>
            <div className="text-[8px] sm:text-[9px] font-pixel text-slate-400">HIGH SCORE</div>
            <div className="text-white font-pixel text-xs sm:text-base tabular-nums mt-0.5">
              {highScore.toString().padStart(5, '0')}
            </div>
          </div>
          <div>
            <div className="text-[8px] sm:text-[9px] font-pixel text-slate-400">
              {formatMode === 'retro' ? 'STAGE' : 'WAVE'}
            </div>
            <div className="text-[#00f0ff] font-pixel text-xs sm:text-base tabular-nums mt-0.5">0{wave}</div>
          </div>
          <div>
            <div className="text-[8px] sm:text-[9px] font-pixel text-slate-400">
              {formatMode === 'retro' ? 'SHIPS' : 'SHIELDS'}
            </div>
            <div className="text-emerald-400 font-bold text-base flex gap-1 mt-1">
              {Array.from({ length: 3 }).map((_, idx) => (
                <span
                  key={idx}
                  className={`inline-block w-3.5 h-3.5 rounded-none border border-black flex items-center justify-center text-[9px] ${
                    idx < lives
                      ? 'bg-emerald-400 text-black shadow-[1px_1px_0px_#000]'
                      : 'bg-slate-800 text-slate-600'
                  }`}
                >
                  {formatMode === 'retro' ? '🚀' : ''}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Canvas Display */}
        <div className="relative rounded-none overflow-hidden border-2 border-amber-500/60 shadow-[4px_4px_0px_#000000] flex items-center justify-center bg-black">
          <canvas ref={canvasRef} className="block w-full max-h-[460px] aspect-[4/3] touch-none" />

          {/* Game Over Screen */}
          {gameOver && (
            <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-95 duration-150">
              <div className="text-red-500 font-pixel text-[9px] tracking-widest mb-1 arcade-blink">
                SYSTEM CRITICAL // VEHICLE DISINTEGRATION
              </div>
              <h2 className="text-xl sm:text-2xl font-pixel text-white mb-2 tracking-wider">
                {formatMode === 'retro' ? 'GAME OVER' : 'MISSION TERMINATED'}
              </h2>
              <p className="text-slate-300 font-mono-tech text-xs mb-4">
                FINAL SCORE: <span className="text-amber-400 font-bold">{score}</span> • APOGEE WAVE: {wave}
              </p>
              <button
                onClick={() => {
                  soundFx.playSuccess();
                  resetGame();
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-none bg-amber-400 hover:bg-amber-300 text-black font-pixel text-[9px] tracking-wider transition-all border-2 border-white shadow-[3px_3px_0px_#000000] cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
              >
                <RotateCcw className="w-4 h-4" /> [ RE-ENGAGE SIMULATION ]
              </button>
            </div>
          )}

          {/* Mission Qualified Banner (500+ points) */}
          {missionQualified && !gameOver && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-none bg-black border-2 border-emerald-500 text-emerald-300 font-pixel text-[8px] flex items-center gap-2 shadow-[3px_3px_0px_#000000] arcade-blink">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>DOCKING VELOCITY ACHIEVED (CREW BADGE UNLOCKED)</span>
            </div>
          )}
        </div>

        {/* Mobile On-Screen Controls */}
        <div className="sm:hidden grid grid-cols-4 gap-2 mt-2 pt-2 border-t border-white/10">
          <button
            onPointerDown={() => {
              gameState.current.keys['ArrowLeft'] = true;
            }}
            onPointerUp={() => {
              gameState.current.keys['ArrowLeft'] = false;
            }}
            className="p-3 bg-white/5 border border-white/10 rounded-none flex items-center justify-center text-slate-200 active:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onPointerDown={() => {
              gameState.current.keys['ArrowRight'] = true;
            }}
            onPointerUp={() => {
              gameState.current.keys['ArrowRight'] = false;
            }}
            className="p-3 bg-white/5 border border-white/10 rounded-none flex items-center justify-center text-slate-200 active:bg-white/20"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onPointerDown={() => {
              gameState.current.keys['ArrowUp'] = true;
            }}
            onPointerUp={() => {
              gameState.current.keys['ArrowUp'] = false;
            }}
            className="p-3 bg-amber-500/20 border border-amber-500/40 rounded-none flex items-center justify-center text-amber-300 active:bg-amber-500/30"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              const e = new KeyboardEvent('keydown', { code: 'Space' });
              window.dispatchEvent(e);
            }}
            className="p-3 bg-cyan-500/20 border border-cyan-500/40 rounded-none flex items-center justify-center text-cyan-300 active:bg-cyan-500/30"
          >
            <Zap className="w-5 h-5" />
          </button>
        </div>

        {/* Footer info */}
        <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono-tech text-slate-500">
          <span>
            {formatMode === 'retro'
              ? '★ HITAM COIN-OP RETRO ARCADE // ENGINE: ASTRA-88 (8-BIT) ★'
              : 'VECTOR RENDERING ENGINE v1.2 // ATARI 1979 OSCILLOSCOPE'}
          </span>
          <span className="hidden sm:inline">CREDIT: FREE PLAY</span>
        </div>
      </div>
    </div>
  );
};

export default AsteroidsArcadeModal;
