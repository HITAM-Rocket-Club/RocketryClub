import React, { useState } from 'react';
import { Volume2, VolumeX, Tv, Gamepad2, Coins, HelpCircle } from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface PixelArcadeNavProps {
  currentAltitude: number;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  crtEnabled: boolean;
  onToggleCrt: () => void;
  onOpenArcade: () => void;
  onOpenTutorial: () => void;
  credits: number;
  onInsertCoin: () => void;
}

export const PixelArcadeNav: React.FC<PixelArcadeNavProps> = ({
  currentAltitude,
  activeSection,
  onNavigate,
  crtEnabled,
  onToggleCrt,
  onOpenArcade,
  onOpenTutorial,
  credits,
  onInsertCoin,
}) => {
  const [audioEnabled, setAudioEnabled] = useState(true);

  const handleAudioToggle = () => {
    const nextState = !audioEnabled;
    setAudioEnabled(nextState);
    soundFx.enabled = nextState;
    if (nextState) {
      soundFx.playCoin();
    }
  };

  const navStages = [
    { id: 'cockpit', label: 'STG 0', full: '00_COCKPIT' },
    { id: 'pad', label: 'STG 1', full: '01_PAD' },
    { id: 'checklist', label: 'STG 2', full: '02_CHECK' },
    { id: 'ignition', label: 'STG 3', full: '03_LAUNCH' },
    { id: 'mission', label: 'STG 4', full: '04_MISSION' },
    { id: 'builds', label: 'STG 5', full: '05_FLEET' },
    { id: 'records', label: 'STG 6', full: '06_HI-SCORE' },
    { id: 'crew', label: 'STG 7', full: '07_CREW' },
    { id: 'join', label: 'STG 8', full: '08_JOIN' },
  ];

  // Running score tied to altitude
  const runningScore = Math.floor(currentAltitude);
  const formattedScore = String(runningScore).padStart(6, '0');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-2 sm:p-3 pointer-events-none select-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-2">
        {/* Top Galaga-Style Scoreboard Header Bar */}
        <div className="w-full bg-[#08080c]/95 border-2 border-[#ffffff] p-2.5 sm:px-4 flex flex-wrap items-center justify-between gap-3 shadow-[0_4px_20px_rgba(0,0,0,0.8)] pointer-events-auto">
          {/* 1UP Score */}
          <div className="flex items-center gap-4">
            <div>
              <div className="font-pixel text-[9px] sm:text-[10px] text-[#ff007f] tracking-wider mb-1">
                1UP // ALT
              </div>
              <div className="font-pixel text-xs sm:text-sm text-[#00f0ff] tabular-nums tracking-widest">
                {formattedScore}m
              </div>
            </div>

            {/* High Score */}
            <div className="hidden sm:block pl-4 border-l border-white/20">
              <div className="font-pixel text-[9px] text-[#ffe600] tracking-wider mb-1">
                HIGH SCORE
              </div>
              <div className="font-pixel text-xs text-[#ffffff] tabular-nums tracking-widest">
                099990
              </div>
            </div>

            {/* Lives (3 Pixel Rocket Sprites) */}
            <div className="hidden md:flex flex-col pl-4 border-l border-white/20">
              <div className="font-pixel text-[9px] text-[#00ff66] tracking-wider mb-1">
                CHUTES / LIVES
              </div>
              <div className="flex gap-1.5 text-xs">
                <span className="text-[#ffe600]">🚀</span>
                <span className="text-[#ffe600]">🚀</span>
                <span className="text-[#ffe600]">🚀</span>
              </div>
            </div>
          </div>

          {/* Center Title Logo */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundFx.playCoin();
                onNavigate('cockpit');
              }}
              className="text-left group"
            >
              <span className="font-pixel text-xs sm:text-sm text-[#ffffff] group-hover:text-[#ffe600] transition-colors tracking-widest">
                HRC<span className="text-[#ff007f] mx-1">★</span>ASTRA
              </span>
              <span className="block font-pixel text-[8px] text-[#00f0ff] tracking-tight">
                AEROSPACE 1984
              </span>
            </button>
          </div>

          {/* Right: Insert Coin & Arcade Utilities */}
          <div className="flex items-center gap-2">
            {/* Insert Coin Button */}
            <button
              onClick={() => {
                soundFx.playCoin();
                onInsertCoin();
              }}
              className="arcade-btn arcade-btn-yellow py-1.5 px-3 text-[9px] sm:text-[10px] flex items-center gap-1.5 hover:scale-105 active:scale-95"
              title="Insert coin for extra credit"
            >
              <Coins className="w-3 h-3 text-black" />
              <span className="arcade-blink">CREDIT {String(credits).padStart(2, '0')}</span>
            </button>

            {/* Launch Arcade Game */}
            <button
              onClick={() => {
                soundFx.playStart();
                onOpenArcade();
              }}
              className="arcade-btn arcade-btn-cyan py-1.5 px-3 text-[9px] sm:text-[10px] flex items-center gap-1 hover:scale-105 active:scale-95"
              title="Launch Retro Flight Simulator"
            >
              <Gamepad2 className="w-3.5 h-3.5 text-black" />
              <span className="hidden sm:inline">PLAY</span>
            </button>

            {/* Mission Briefing / Tutorial Button */}
            <button
              onClick={() => {
                soundFx.playStart();
                onOpenTutorial();
              }}
              className="arcade-btn arcade-btn-magenta py-1.5 px-2.5 text-[9px] sm:text-[10px] flex items-center gap-1 hover:scale-105 active:scale-95"
              title="Mission Briefing & Flight Guide"
            >
              <HelpCircle className="w-3.5 h-3.5 text-black" />
              <span className="hidden sm:inline">GUIDE</span>
            </button>

            {/* CRT Toggle */}
            <button
              onClick={() => {
                soundFx.playToggle();
                onToggleCrt();
              }}
              className={`p-1.5 border-2 text-[10px] ${
                crtEnabled
                  ? 'border-[#00ff66] bg-[#00ff66]/20 text-[#00ff66]'
                  : 'border-white/30 text-white/50'
              }`}
              title="Toggle CRT Screen Scanlines"
            >
              <Tv className="w-3.5 h-3.5" />
            </button>

            {/* Audio Toggle */}
            <button
              onClick={handleAudioToggle}
              className={`p-1.5 border-2 text-[10px] ${
                audioEnabled
                  ? 'border-[#00f0ff] bg-[#00f0ff]/20 text-[#00f0ff]'
                  : 'border-white/30 text-white/50'
              }`}
              title="Toggle 8-bit Audio"
            >
              {audioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Stage Selector Ribbon */}
        <div className="hidden lg:flex items-center justify-center gap-1.5 bg-black/90 p-1.5 border border-white/20 self-center pointer-events-auto">
          {navStages.map((stage) => {
            const isActive = activeSection === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => {
                  soundFx.playClick();
                  onNavigate(stage.id);
                }}
                className={`px-2.5 py-1 font-pixel text-[9px] transition-all ${
                  isActive
                    ? 'bg-[#ffe600] text-black font-bold shadow-[0_0_8px_#ffe600]'
                    : 'text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {stage.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
