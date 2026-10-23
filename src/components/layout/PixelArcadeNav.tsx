import React, { useState } from 'react';
import { Volume2, VolumeX, Gamepad2, Compass, Layers, RotateCw, Tv, Menu, X } from 'lucide-react';
import { soundFx } from '../../utils/audio';
import { AsciiGlitchRipple } from '../ui/ascii-glitch-ripple';

interface PixelArcadeNavProps {
  currentAltitude: number;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenArcade: () => void;
  wireframe?: boolean;
  onToggleWireframe?: () => void;
  exploded?: boolean;
  onToggleExploded?: () => void;
  autoRotate?: boolean;
  onToggleAutoRotate?: () => void;
  crtEnabled?: boolean;
  onToggleCrt?: () => void;
}

export const PixelArcadeNav: React.FC<PixelArcadeNavProps> = ({
  currentAltitude,
  activeSection,
  onNavigate,
  onOpenArcade,
  wireframe = false,
  onToggleWireframe,
  exploded = false,
  onToggleExploded,
  autoRotate = false,
  onToggleAutoRotate,
  crtEnabled = false,
  onToggleCrt,
}) => {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [cadMenuOpen, setCadMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAudioToggle = () => {
    const nextState = !audioEnabled;
    setAudioEnabled(nextState);
    soundFx.enabled = nextState;
    if (nextState) {
      soundFx.playCoin();
    }
  };

  const navLinks = [
    { id: 'cockpit', label: '00_OVERVIEW' },
    { id: 'mission', label: '01_MISSION' },
    { id: 'builds', label: '02_BUILDS' },
    { id: 'records', label: '03_ROADMAP' },
    { id: 'crew', label: '04_CREW' },
    { id: 'join', label: '05_JOIN' },
  ];

  const formattedAlt = Math.floor(currentAltitude).toLocaleString('en-US');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-2 sm:p-3 pointer-events-none select-none">
      <div className="max-w-[1400px] w-full mx-auto">
        <nav className="w-full bg-[#070a12] border-2 border-white/20 px-2.5 sm:px-4 py-2 rounded-none flex items-center justify-between gap-2 shadow-[4px_4px_0px_#000000] pointer-events-auto">
          {/* Brand Logo - Retro Marquee */}
          <button
            onClick={() => {
              soundFx.playClick();
              onNavigate('cockpit');
            }}
            className="flex items-center gap-2 text-left group cursor-pointer shrink-0"
          >
            <div className="w-8 h-8 rounded-none bg-white border-2 border-[#00f0ff] p-0.5 shadow-[2px_2px_0px_#000000] shrink-0 flex items-center justify-center overflow-hidden">
              <img src="/logo.png" alt="HITAM Rocketry Club Logo" className="w-full h-full object-contain" />
            </div>
            <div className="shrink-0">
              <div className="flex items-center gap-1 font-pixel text-xs sm:text-sm text-white group-hover:text-[#00f0ff] transition-colors tracking-wider">
                <AsciiGlitchRipple as="span">HITAM</AsciiGlitchRipple>
                <span className="text-[#ffe600]">/</span>
                <AsciiGlitchRipple as="span" className="text-[#00f0ff]">ROCKETRY</AsciiGlitchRipple>
              </div>
              <span className="hidden sm:block font-mono-tech text-[9px] text-[#00ff66] tracking-widest uppercase">
                [OFFICIAL_CLUB_LAUNCH]
              </span>
            </div>
          </button>

          {/* Retro Monospace Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 bg-black p-1 border border-white/20 shrink-0">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    soundFx.playClick();
                    onNavigate(link.id);
                  }}
                  className={`px-2 py-1 font-mono-tech text-xs tracking-wider transition-all cursor-pointer border whitespace-nowrap ${
                    isActive
                      ? 'bg-[#00f0ff] text-black font-bold border-white shadow-[2px_2px_0px_#000000]'
                      : 'bg-transparent text-slate-300 border-transparent hover:border-white/30 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Live Altitude Telemetry Box */}
            <div className="hidden md:flex items-center gap-1.5 px-2 py-1 bg-black border-2 border-white/20 font-mono-tech text-xs text-white shadow-[2px_2px_0px_#000000] shrink-0">
              <span className="w-2 h-2 bg-[#ffe600] arcade-blink" />
              <span className="text-white/50 text-[10px]">ALT:</span>
              <span className="text-[#00f0ff] font-bold tabular-nums">{formattedAlt}M</span>
              <span className="hidden 2xl:inline text-[#00ff66] text-[9px] font-bold ml-1">[PRE-RELEASE]</span>
            </div>

            {/* CRT Monitor Toggle */}
            {onToggleCrt && (
              <button
                onClick={() => {
                  soundFx.playClick();
                  onToggleCrt();
                }}
                className={`p-1.5 sm:px-2.5 sm:py-1 rounded-none border-2 text-xs font-mono-tech flex items-center gap-1 cursor-pointer transition-all shadow-[2px_2px_0px_#000000] shrink-0 ${
                  crtEnabled
                    ? 'border-[#00ff66] bg-[#00ff66] text-black font-bold'
                    : 'border-white/20 bg-black text-white/70 hover:border-white/50 hover:text-white'
                }`}
                title="Toggle Retro CRT Scanlines"
              >
                <Tv className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[10px]">CRT</span>
              </button>
            )}

            {/* 3D CAD Controls Dropdown Toggle */}
            <div className="relative shrink-0">
              <button
                onClick={() => setCadMenuOpen(!cadMenuOpen)}
                className={`p-1.5 sm:px-2.5 sm:py-1 rounded-none border-2 text-xs font-mono-tech flex items-center gap-1 cursor-pointer transition-all shadow-[2px_2px_0px_#000000] shrink-0 ${
                  wireframe || exploded || autoRotate
                    ? 'border-[#ffe600] bg-[#ffe600] text-black font-bold'
                    : 'border-white/20 bg-black text-white/70 hover:border-white/50 hover:text-white'
                }`}
                title="3D Rocket View Controls"
              >
                <Compass className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[10px]">3D CAD</span>
              </button>

              {/* Retro CAD Dropdown Menu */}
              {cadMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#070a12] border-2 border-white/30 p-2 shadow-[4px_4px_0px_#000000] flex flex-col gap-1 z-50">
                  <div className="font-pixel text-[8px] text-[#ffe600] px-2 py-1 uppercase border-b border-white/20 mb-1">
                    3D Inspector Controls
                  </div>

                  <button
                    onClick={() => {
                      soundFx.playToggle();
                      onToggleWireframe?.();
                    }}
                    className={`flex items-center justify-between px-2.5 py-1.5 text-xs font-mono-tech border cursor-pointer ${
                      wireframe ? 'bg-[#00f0ff] text-black font-bold border-white' : 'border-transparent text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5" /> Wireframe
                    </span>
                    <span className="text-[10px]">{wireframe ? '[ON]' : '[OFF]'}</span>
                  </button>

                  <button
                    onClick={() => {
                      soundFx.playToggle();
                      onToggleExploded?.();
                    }}
                    className={`flex items-center justify-between px-2.5 py-1.5 text-xs font-mono-tech border cursor-pointer ${
                      exploded ? 'bg-[#ff007f] text-white font-bold border-white' : 'border-transparent text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Compass className="w-3.5 h-3.5" /> Exploded
                    </span>
                    <span className="text-[10px]">{exploded ? '[ON]' : '[OFF]'}</span>
                  </button>

                  <button
                    onClick={() => {
                      soundFx.playToggle();
                      onToggleAutoRotate?.();
                    }}
                    className={`flex items-center justify-between px-2.5 py-1.5 text-xs font-mono-tech border cursor-pointer ${
                      autoRotate ? 'bg-[#00ff66] text-black font-bold border-white' : 'border-transparent text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <RotateCw className="w-3.5 h-3.5" /> Auto-Spin
                    </span>
                    <span className="text-[10px]">{autoRotate ? '[ON]' : '[OFF]'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Launch Arcade Flight Sim - Retro Push Button */}
            <button
              onClick={() => {
                soundFx.playStart();
                onOpenArcade();
              }}
              className="px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-none bg-[#ff007f] hover:bg-[#ff1a8c] text-white border-2 border-white font-pixel text-[8px] sm:text-[9px] flex items-center gap-1 sm:gap-1.5 transition-transform cursor-pointer shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 shrink-0"
              title="Launch Retro Flight Simulator"
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">SIMULATOR</span>
            </button>

            {/* Audio Toggle */}
            <button
              onClick={handleAudioToggle}
              className={`p-1.5 rounded-none border-2 text-xs cursor-pointer shadow-[2px_2px_0px_#000000] transition-colors shrink-0 ${
                audioEnabled
                  ? 'border-[#00ff66] text-[#00ff66] bg-black'
                  : 'border-white/20 text-white/40 bg-black hover:text-white'
              }`}
              title="Toggle Audio Effects"
            >
              {audioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            {/* Mobile / Tablet Menu Button */}
            <button
              onClick={() => {
                soundFx.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-1.5 rounded-none border-2 border-white/30 text-white bg-black hover:border-[#00f0ff] hover:text-[#00f0ff] cursor-pointer shadow-[2px_2px_0px_#000000] shrink-0"
              title="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
            </button>
          </div>
        </nav>

        {/* Mobile / Compact Stage Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 bg-[#070a12] border-2 border-[#00f0ff] p-3 shadow-[4px_4px_0px_#000000] pointer-events-auto flex flex-col gap-1.5">
            <div className="font-pixel text-[8px] text-[#00f0ff] px-2 py-1 uppercase border-b border-white/20 mb-1 flex items-center justify-between">
              <span>FLIGHT STAGE DIRECTORY</span>
              <span className="text-[#ffe600]">ALT: {formattedAlt}M</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => {
                      soundFx.playClick();
                      onNavigate(link.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-3 py-2 text-left font-mono-tech text-xs tracking-wider transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-[#00f0ff] text-black font-bold border-white shadow-[2px_2px_0px_#000000]'
                        : 'bg-black text-slate-300 border-white/20 hover:border-white/40 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default PixelArcadeNav;

