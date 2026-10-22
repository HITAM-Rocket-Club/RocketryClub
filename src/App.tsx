import React, { useState, useEffect } from 'react';
import { FullRocketBackground3D } from './components/three/FullRocketBackground3D';
import { RocketAnatomyHUD } from './components/three/RocketAnatomyHUD';
import { PixelSpaceCanvas } from './components/pixel/PixelSpaceCanvas';
import { CRTOverlay } from './components/layout/CRTOverlay';
import { PixelArcadeNav } from './components/layout/PixelArcadeNav';
import { CockpitHero } from './components/narrative/CockpitHero';
import { LaunchPadStage } from './components/narrative/LaunchPadStage';
import { PreLaunchChecklist } from './components/narrative/PreLaunchChecklist';
import { IgnitionSequence } from './components/narrative/IgnitionSequence';
import { TroposphereMission } from './components/stages/TroposphereMission';
import { StratosphereBuilds } from './components/stages/StratosphereBuilds';
import { KarmanAchievements } from './components/stages/KarmanAchievements';
import { OrbitDeckCrew } from './components/stages/OrbitDeckCrew';
import { JoinMissionSection } from './components/stages/JoinMissionSection';
import { Footer } from './components/layout/Footer';
import { AsteroidsArcadeModal } from './components/minigame/AsteroidsArcadeModal';
import { MissionBriefingTutorialModal } from './components/narrative/MissionBriefingTutorialModal';
import { soundFx } from './utils/audio';

export const App: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentAltitude, setCurrentAltitude] = useState(0);
  const [activeSection, setActiveSection] = useState('cockpit');
  const [wireframe, setWireframe] = useState(false);
  const [exploded, setExploded] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [crtEnabled, setCrtEnabled] = useState(true);
  const [arcadeOpen, setArcadeOpen] = useState(false);
  const [tutorialOpen, setTutorialOpen] = useState(() => {
    return localStorage.getItem('hrc_tutorial_dismissed') !== 'true';
  });
  const [credits, setCredits] = useState(2);

  // Scroll listener for calculating 8-bit altitude score & stage detection
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;

      const progress = Math.min(Math.max(window.scrollY / totalHeight, 0), 1);
      setScrollProgress(progress);

      // Nonlinear exponential altitude progression up to 100,000m (Orbit)
      let alt = 0;
      if (progress < 0.35) {
        alt = progress * (12000 / 0.35);
      } else if (progress < 0.65) {
        alt = 12000 + ((progress - 0.35) / 0.3) * 38000;
      } else {
        alt = 50000 + ((progress - 0.65) / 0.35) * 50000;
      }
      setCurrentAltitude(alt);

      // Detect active stage
      const sections = ['cockpit', 'pad', 'checklist', 'ignition', 'mission', 'builds', 'records', 'crew', 'join'];
      const scrollMiddle = window.scrollY + window.innerHeight * 0.35;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollMiddle >= top && scrollMiddle < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInsertCoin = () => {
    setCredits((prev) => prev + 1);
    soundFx.playCoin();
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#e0e0e0] select-none font-mono-tech selection:bg-[#ff007f]/40 selection:text-[#00f0ff]">
      {/* 1. Master 3D Rocket Spanning Start to Bottom of Website */}
      <FullRocketBackground3D
        scrollProgress={scrollProgress}
        activeSection={activeSection}
        wireframe={wireframe}
        exploded={exploded}
        autoRotate={autoRotate}
      />

      {/* 2. 2D Pixel Art Starfield & Tumbling Pixel Asteroids Canvas (Transparent Overlay) */}
      <PixelSpaceCanvas scrollProgress={scrollProgress} />

      {/* 3. CRT Scanlines & Screen Curvature Overlay */}
      <CRTOverlay enabled={crtEnabled} />

      {/* 4. Pixel Arcade Scoreboard Navigation HUD */}
      <PixelArcadeNav
        currentAltitude={currentAltitude}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        crtEnabled={crtEnabled}
        onToggleCrt={() => setCrtEnabled(!crtEnabled)}
        onOpenArcade={() => setArcadeOpen(true)}
        onOpenTutorial={() => setTutorialOpen(true)}
        credits={credits}
        onInsertCoin={handleInsertCoin}
      />

      {/* 5. Interactive Rocket Anatomy Telemetry HUD & Mini-Map */}
      <RocketAnatomyHUD
        activeSection={activeSection}
        scrollProgress={scrollProgress}
        wireframe={wireframe}
        exploded={exploded}
        autoRotate={autoRotate}
        onToggleWireframe={() => setWireframe(!wireframe)}
        onToggleExploded={() => setExploded(!exploded)}
        onToggleAutoRotate={() => setAutoRotate(!autoRotate)}
        onSelectStage={handleNavigate}
      />

      {/* 6. Continuous Scroll Narrative — Retro Arcade Stages */}
      <main className="relative z-10 flex flex-col w-full">
        {/* Stage 0: Inside Capsule / Porthole Cockpit Hero & Insert Coin */}
        <CockpitHero
          onScrollToNext={() => handleNavigate('pad')}
          onOpenArcade={() => setArcadeOpen(true)}
          onOpenTutorial={() => setTutorialOpen(true)}
          onInsertCoin={handleInsertCoin}
          credits={credits}
          wireframe={wireframe}
          onToggleWireframe={() => setWireframe(!wireframe)}
          autoRotate={autoRotate}
          onToggleAutoRotate={() => setAutoRotate(!autoRotate)}
          exploded={exploded}
          onToggleExploded={() => setExploded(!exploded)}
        />

        {/* Stage 1: Launch Pad Gantry & Stenciled Hull */}
        <LaunchPadStage />

        {/* Stage 2: Pre-Launch Readiness Checklist */}
        <PreLaunchChecklist
          onAllVerified={() => {
            soundFx.playSuccess();
          }}
        />

        {/* Stage 3: Ignition & Main Booster Liftoff */}
        <IgnitionSequence
          onLaunched={() => {
            handleNavigate('mission');
          }}
        />

        {/* Stage 4: Troposphere (0 - 12km) — Mission & Sub-Teams */}
        <TroposphereMission />

        {/* Stage 5: Stratosphere (12 - 50km) — Rocket Fleet & Hardware */}
        <StratosphereBuilds />

        {/* Stage 6: Kármán Line (50 - 100km) — High Scores & Records */}
        <KarmanAchievements />

        {/* Stage 7: Orbit Deck (100km+) — Flight Crew Manifest */}
        <OrbitDeckCrew />

        {/* Stage 8: Dock Your Ship // Join the Squadron */}
        <JoinMissionSection onOpenArcade={() => setArcadeOpen(true)} />
      </main>

      {/* 5. Arcade Colophon & Coordinates Footer */}
      <Footer />

      {/* 6. Playable Retro Vector Space Shooter Arcade Mini-Game */}
      <AsteroidsArcadeModal
        isOpen={arcadeOpen}
        onClose={() => setArcadeOpen(false)}
      />

      {/* 7. Mission Briefing & Scrolling Tutorial Guide Modal */}
      <MissionBriefingTutorialModal
        isOpen={tutorialOpen}
        onClose={() => setTutorialOpen(false)}
        onStartMission={() => {
          setTutorialOpen(false);
          handleNavigate('cockpit');
        }}
      />
    </div>
  );
};

export default App;
