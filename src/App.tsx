import React, { useState, useEffect } from 'react';
import { FullRocketBackground3D } from './components/three/FullRocketBackground3D';
import { RocketAnatomyHUD } from './components/three/RocketAnatomyHUD';
import { CRTOverlay } from './components/layout/CRTOverlay';
import { PixelSpaceDebrisCanvas } from './components/layout/PixelSpaceDebrisCanvas';
import { PixelArcadeNav } from './components/layout/PixelArcadeNav';
import { CockpitHero } from './components/narrative/CockpitHero';
import { TroposphereMission } from './components/stages/TroposphereMission';
import { StratosphereBuilds } from './components/stages/StratosphereBuilds';
import { KarmanAchievements } from './components/stages/KarmanAchievements';
import { OrbitDeckCrew } from './components/stages/OrbitDeckCrew';
import { JoinMissionSection } from './components/stages/JoinMissionSection';
import { Footer } from './components/layout/Footer';
import { AsteroidsArcadeModal } from './components/minigame/AsteroidsArcadeModal';
import { MissionBriefingTutorialModal } from './components/narrative/MissionBriefingTutorialModal';
import { Crosshair } from './components/ui/Crosshair';

export const App: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentAltitude, setCurrentAltitude] = useState(0);
  const [activeSection, setActiveSection] = useState('cockpit');
  const [wireframe, setWireframe] = useState(false);
  const [exploded, setExploded] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [crtEnabled, setCrtEnabled] = useState(true);
  const [arcadeOpen, setArcadeOpen] = useState(false);
  const [tutorialOpen, setTutorialOpen] = useState(false);

  // Scroll listener for calculating altitude & section detection
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;

      const progress = Math.min(Math.max(window.scrollY / totalHeight, 0), 1);
      setScrollProgress(progress);

      // Nonlinear altitude progression up to 100,000m
      let alt = 0;
      if (progress < 0.3) {
        alt = progress * (12000 / 0.3);
      } else if (progress < 0.6) {
        alt = 12000 + ((progress - 0.3) / 0.3) * 38000;
      } else {
        alt = 50000 + ((progress - 0.6) / 0.4) * 50000;
      }
      setCurrentAltitude(alt);

      // Detect active stage
      const sections = ['cockpit', 'mission', 'builds', 'records', 'crew', 'join'];
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

  return (
    <div className="relative min-h-screen bg-[#05070c] text-[#e2e8f0] font-mono-tech selection:bg-[#00f0ff]/30 selection:text-[#00f0ff]">
      {/* 1. Master 3D Rocket Spanning Start to Bottom of Website */}
      <FullRocketBackground3D
        scrollProgress={scrollProgress}
        activeSection={activeSection}
        wireframe={wireframe}
        exploded={exploded}
        autoRotate={autoRotate}
      />

      {/* 1.5 Pixel Art Space Elements (Meteors falling, Rockets launching, Roamers drifting) */}
      <PixelSpaceDebrisCanvas scrollProgress={scrollProgress} />

      {/* 2. Retro CRT Scanline Overlay */}
      <CRTOverlay enabled={crtEnabled} />

      {/* 2.5 Aerospace Targeting Crosshair Cursor HUD */}
      <Crosshair
        color="#00f0ff"
        thickness={1}
        opacity={0.8}
        smoothing={0.25}
        showCoordinates={true}
        targetEffect="lock"
        snapToWords={true}
        clickPulse={true}
        targetSelector="a, button, [role='button'], input, select, textarea, [data-crosshair-target]"
      />

      {/* 3. Retro Arcade Flight Director Navigation Bar */}
      <PixelArcadeNav
        currentAltitude={currentAltitude}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenArcade={() => setArcadeOpen(true)}
        wireframe={wireframe}
        onToggleWireframe={() => setWireframe(!wireframe)}
        exploded={exploded}
        onToggleExploded={() => setExploded(!exploded)}
        autoRotate={autoRotate}
        onToggleAutoRotate={() => setAutoRotate(!autoRotate)}
        crtEnabled={crtEnabled}
        onToggleCrt={() => setCrtEnabled(!crtEnabled)}
      />

      {/* 4. Sleek Floating 3D Control Pill Dock */}
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

      {/* 5. Main Clean Content Flow */}
      <main className="relative z-10 flex flex-col w-full">
        {/* Section 1: Hero & 3D Rocket Showcase */}
        <CockpitHero
          onScrollToNext={() => handleNavigate('mission')}
          onOpenArcade={() => setArcadeOpen(true)}
          wireframe={wireframe}
          onToggleWireframe={() => setWireframe(!wireframe)}
          autoRotate={autoRotate}
          onToggleAutoRotate={() => setAutoRotate(!autoRotate)}
          exploded={exploded}
          onToggleExploded={() => setExploded(!exploded)}
        />

        {/* Section 2: Mission & 5 Technical Sub-Teams */}
        <TroposphereMission />

        {/* Section 3: Rocket Fleet & Test Benches */}
        <StratosphereBuilds />

        {/* Section 4: Milestones & Records */}
        <KarmanAchievements />

        {/* Section 5: Faculty Advisor & Flight Crew */}
        <OrbitDeckCrew />

        {/* Section 6: Join the Squadron & Contact */}
        <JoinMissionSection onOpenArcade={() => setArcadeOpen(true)} />
      </main>

      {/* 6. Clean Technical Footer */}
      <Footer />

      {/* 7. Interactive Vector Flight Simulator Arcade Mini-Game Modal */}
      <AsteroidsArcadeModal
        isOpen={arcadeOpen}
        onClose={() => setArcadeOpen(false)}
      />

      {/* 8. Mission Briefing Guide Modal (Opened on demand) */}
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
