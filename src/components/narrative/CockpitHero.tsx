import React, { useState } from 'react';
import {
  ChevronDown,
  Coins,
  Gamepad2,
  Play,
  Layers,
  RotateCw,
  Sparkles,
  Compass,
  HelpCircle,
} from 'lucide-react';
import { CLUB_METADATA } from '../../data/rocketryData';
import { soundFx } from '../../utils/audio';

interface CockpitHeroProps {
  onScrollToNext: () => void;
  onOpenArcade: () => void;
  onOpenTutorial?: () => void;
  onInsertCoin: () => void;
  credits: number;
  wireframe?: boolean;
  onToggleWireframe?: () => void;
  autoRotate?: boolean;
  onToggleAutoRotate?: () => void;
  exploded?: boolean;
  onToggleExploded?: () => void;
}

export const CockpitHero: React.FC<CockpitHeroProps> = ({
  onScrollToNext,
  onOpenArcade,
  onOpenTutorial,
  onInsertCoin,
  credits,
  wireframe = false,
  onToggleWireframe,
  autoRotate = false,
  onToggleAutoRotate,
  exploded = false,
  onToggleExploded,
}) => {
  const [launchMessage, setLaunchMessage] = useState<string | null>(null);

  const handleStart = () => {
    soundFx.playStart();
    setTimeout(() => {
      onScrollToNext();
    }, 400);
  };

  const handleTestBoost = () => {
    soundFx.playStart();
    soundFx.playThruster(3.0);
    setLaunchMessage('▲ BOOSTER THRUST TEST // 4 SEC IGNITION BURN ▲');
    setTimeout(() => {
      setLaunchMessage(null);
    }, 4500);
  };

  return (
    <section
      id="cockpit"
      className="relative min-h-screen flex flex-col items-center justify-between px-3 sm:px-6 pt-24 pb-8 overflow-hidden select-none"
    >
      {/* 1. Global 3D Rocket Viewport Ambient Frame (Nosecone & Cockpit Stage) */}
      <div className="absolute inset-0 flex items-center justify-center z-0 overflow-hidden pointer-events-none">
        {/* Subtle Cyberpunk/Arcade Radial Under-Glow behind Rocket */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.15)_0%,rgba(255,0,127,0.08)_40%,transparent_75%)] pointer-events-none" />

        {/* Reticle Crosshair HUD behind header */}
        <div className="w-[320px] sm:w-[480px] h-[320px] sm:h-[480px] rounded-full border border-[#00f0ff]/20 flex items-center justify-center animate-spin" style={{ animationDuration: '40s' }}>
          <div className="w-full h-[1px] bg-[#00f0ff]/10"></div>
          <div className="h-full w-[1px] bg-[#00f0ff]/10 absolute"></div>
        </div>
      </div>

      {/* 2. Top Header Overlay: Retro Cabinet Title & Marquee */}
      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center text-center pointer-events-none mt-2 sm:mt-4">
        {/* Arcade Cabinet Header Banner */}
        <div className="inline-block bg-[#140810]/90 backdrop-blur-sm border-2 border-[#ff007f] px-3.5 py-1.5 mb-3 shadow-[0_0_15px_rgba(255,0,127,0.4)] pointer-events-auto">
          <span className="font-pixel text-[9px] sm:text-[11px] text-[#ff007f] tracking-widest uppercase">
            ★ HITAM ROCKETRY CLUB // MISSION DECK 1984 ★
          </span>
        </div>

        {/* Big Retro Arcade Title */}
        <h1 className="font-pixel text-3xl sm:text-6xl text-[#ffffff] tracking-wider mb-2 leading-tight drop-shadow-[0_4px_0px_#ff007f]">
          HRC<span className="text-[#ffe600]">/</span>ASTRA
        </h1>

        <div className="font-pixel text-xs sm:text-base text-[#00f0ff] tracking-widest uppercase mb-1">
          STUDENT AEROSPACE RESEARCH & SOUNDING VEHICLES
        </div>

        {/* Active Test Launch Alert Notification */}
        {launchMessage && (
          <div className="mt-2 bg-[#ff007f] text-white font-pixel text-[9px] sm:text-xs px-4 py-1.5 border-2 border-white shadow-[0_0_20px_#ff007f] arcade-blink pointer-events-auto">
            {launchMessage}
          </div>
        )}
      </div>

      {/* 3. Middle Stage: HUD Telemetry Brackets Framing the Central 3D Rocket */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between my-2 pointer-events-none">
        <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-4">
          {/* Left Bracket: Live Vehicle Specs */}
          <div className="arcade-box-cyan bg-black/85 backdrop-blur-md p-3 sm:p-4 w-full md:w-64 shrink-0 text-left pointer-events-auto shadow-[0_0_20px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between border-b border-[#00f0ff]/40 pb-1.5 mb-2.5">
              <span className="font-pixel text-[9px] text-[#00f0ff] tracking-wider">
                VEHICLE SPECS
              </span>
              <span className="font-pixel text-[8px] text-[#00ff66] arcade-blink">
                ● FULL STACK
              </span>
            </div>

            <div className="space-y-1.5 font-pixel text-[8px] sm:text-[9px]">
              <div className="flex justify-between bg-black/60 p-1.5 border border-white/10">
                <span className="text-white/60">VEHICLE:</span>
                <span className="text-[#ffe600]">HRC ASTRA-01</span>
              </div>
              <div className="flex justify-between bg-black/60 p-1.5 border border-white/10">
                <span className="text-white/60">HEIGHT:</span>
                <span className="text-[#00f0ff]">38.5 METERS</span>
              </div>
              <div className="flex justify-between bg-black/60 p-1.5 border border-white/10">
                <span className="text-white/60">PARTS:</span>
                <span className="text-white">9 CONTINUOUS</span>
              </div>
              <div className="flex justify-between bg-black/60 p-1.5 border border-white/10">
                <span className="text-white/60">PROPULSION:</span>
                <span className="text-[#00ff66]">5-ENGINE CLUSTER</span>
              </div>
              <div className="flex justify-between bg-black/60 p-1.5 border border-white/10">
                <span className="text-white/60">3D TELEMETRY:</span>
                <span className="text-[#00f0ff] animate-pulse">SCROLL SYNC</span>
              </div>
            </div>
          </div>

          {/* Central Orbit Indicator (Notice over 3D model) */}
          <div className="self-center hidden sm:flex items-center gap-2 bg-black/70 border border-white/20 px-3 py-1 font-pixel text-[8px] text-[#ffe600] pointer-events-auto backdrop-blur-sm shadow-[0_0_10px_rgba(0,0,0,0.5)]">
            <span className="arcade-blink">◄</span>
            <span>DRAG SCREEN TO ROTATE 3D ROCKET 360° // SCROLL TO ASCEND</span>
            <span className="arcade-blink">►</span>
          </div>

          {/* Right Bracket: Quick CAD Controls & Toggles */}
          <div className="arcade-box-yellow bg-black/85 backdrop-blur-md p-3 sm:p-4 w-full md:w-64 shrink-0 text-left pointer-events-auto shadow-[0_0_20px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between border-b border-[#ffe600]/40 pb-1.5 mb-2.5">
              <span className="font-pixel text-[9px] text-[#ffe600] tracking-wider">
                3D CAD CONTROLS
              </span>
              <span className="font-pixel text-[8px] text-[#ff007f] arcade-blink">
                ● 60 FPS
              </span>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-1.5 mb-2 font-pixel text-[8px]">
              <button
                onClick={() => {
                  soundFx.playToggle();
                  onToggleWireframe?.();
                }}
                className={`p-1.5 border transition-colors flex items-center justify-center gap-1 cursor-pointer ${
                  wireframe
                    ? 'bg-[#00f0ff] text-black border-white font-bold'
                    : 'bg-black text-white/80 border-white/20 hover:border-white'
                }`}
              >
                <Layers className="w-2.5 h-2.5" />
                <span>{wireframe ? 'WIRE: ON' : 'WIRE: OFF'}</span>
              </button>

              <button
                onClick={() => {
                  soundFx.playToggle();
                  onToggleAutoRotate?.();
                }}
                className={`p-1.5 border transition-colors flex items-center justify-center gap-1 cursor-pointer ${
                  autoRotate
                    ? 'bg-[#00ff66] text-black border-white font-bold'
                    : 'bg-black text-white/80 border-white/20 hover:border-white'
                }`}
              >
                <RotateCw className="w-2.5 h-2.5" />
                <span>{autoRotate ? 'SPIN: ON' : 'SPIN: OFF'}</span>
              </button>
            </div>

            {/* Exploded View Toggle Button */}
            <button
              onClick={() => {
                soundFx.playStart();
                onToggleExploded?.();
              }}
              className={`w-full py-1.5 px-2 border mb-2 font-pixel text-[8px] flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                exploded
                  ? 'bg-[#ff007f] text-white border-white font-bold shadow-[0_0_10px_#ff007f]'
                  : 'bg-black text-white/80 border-white/20 hover:border-white'
              }`}
            >
              <Compass className="w-2.5 h-2.5 text-[#00f0ff]" />
              <span>{exploded ? 'ASSEMBLE STAGES' : 'EXPLODE 3D CAD STAGES'}</span>
            </button>

            {/* Test Boost Button (Rocket Animation) */}
            <button
              onClick={handleTestBoost}
              className="w-full arcade-btn arcade-btn-magenta py-1 px-2 text-[8px] flex items-center justify-center gap-1 cursor-pointer hover:scale-102"
            >
              <Sparkles className="w-2.5 h-2.5" />
              <span>TEST BOOST (4 SEC IGNITION)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Bottom Stage: Description, Action Buttons & Scroll Prompt */}
      <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col items-center text-center pointer-events-none mt-2">
        {/* Narrative Description in High-Legibility Frosted Card */}
        <div className="bg-black/90 backdrop-blur-md border border-[#00f0ff]/50 px-4 py-3 mb-4 max-w-2xl shadow-[0_0_20px_rgba(0,0,0,0.8)] pointer-events-auto">
          <p className="font-mono-tech text-xs sm:text-sm text-slate-200 leading-relaxed mb-2.5">
            {CLUB_METADATA.description}
          </p>

          {/* Quick-glance What We Do badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-2 border-t border-white/15 font-pixel text-[7px] sm:text-[8px]">
            <div className="bg-black/70 p-1 border border-[#00f0ff]/30 text-[#00f0ff]">
              🚀 SOUNDING ROCKETS
            </div>
            <div className="bg-black/70 p-1 border border-[#ff3333]/30 text-[#ff3333]">
              🔥 MOTOR TEST BENCHES
            </div>
            <div className="bg-black/70 p-1 border border-[#00ff66]/30 text-[#00ff66]">
              📡 CUSTOM AVIONICS
            </div>
            <div className="bg-black/70 p-1 border border-[#ffe600]/30 text-[#ffe600]">
              🏆 AERO CONTESTS
            </div>
          </div>
        </div>

        {/* Arcade Interaction Deck (Insert Coin & Press Start) */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-4 pointer-events-auto">
          {/* Insert Coin */}
          <button
            onClick={() => {
              soundFx.playCoin();
              onInsertCoin();
            }}
            className="arcade-btn arcade-btn-yellow flex items-center gap-1.5 text-[10px] sm:text-xs hover:scale-105"
          >
            <Coins className="w-3.5 h-3.5 text-black" />
            <span>INSERT COIN (CREDITS: {credits})</span>
          </button>

          {/* Press Start to Launch */}
          <button
            onClick={handleStart}
            className="arcade-btn arcade-btn-magenta flex items-center gap-1.5 text-[10px] sm:text-xs hover:scale-105"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span className="arcade-blink">PRESS START // SCROLL ASCENT</span>
          </button>

          {/* Flight Simulator Mini-game */}
          <button
            onClick={() => {
              soundFx.playStart();
              onOpenArcade();
            }}
            className="arcade-btn arcade-btn-cyan flex items-center gap-1.5 text-[10px] sm:text-xs hover:scale-105"
          >
            <Gamepad2 className="w-3.5 h-3.5 text-black" />
            <span>PLAY SIMULATOR</span>
          </button>

          {/* Mission Briefing / Tutorial */}
          {onOpenTutorial && (
            <button
              onClick={() => {
                soundFx.playStart();
                onOpenTutorial();
              }}
              className="arcade-btn bg-[#181126] text-[#00f0ff] border-2 border-[#00f0ff] hover:bg-[#00f0ff] hover:text-black flex items-center gap-1.5 text-[10px] sm:text-xs hover:scale-105 shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>MISSION BRIEFING // HOW TO FLY</span>
            </button>
          )}
        </div>

        {/* Blinking Push Start prompt */}
        <div
          onClick={handleStart}
          className="cursor-pointer group flex flex-col items-center gap-1 font-pixel text-[9px] text-[#ffe600] pointer-events-auto"
        >
          <span className="arcade-blink">▼ SCROLL DOWN TO COMMENCE FLIGHT MISSION ▼</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#ffe600] group-hover:translate-y-1 transition-transform" />
        </div>
      </div>
    </section>
  );
};
