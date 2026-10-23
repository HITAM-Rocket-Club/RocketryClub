import React from 'react';
import { ChevronDown } from 'lucide-react';
import { AsciiGlitchRipple } from '../ui/ascii-glitch-ripple';

interface CockpitHeroProps {
  onScrollToNext: () => void;
  onOpenArcade: () => void;
  wireframe?: boolean;
  onToggleWireframe?: () => void;
  autoRotate?: boolean;
  onToggleAutoRotate?: () => void;
  exploded?: boolean;
  onToggleExploded?: () => void;
}

export const CockpitHero: React.FC<CockpitHeroProps> = ({
  onScrollToNext,
}) => {
  return (
    <section
      id="cockpit"
      className="relative min-h-[95vh] flex flex-col items-center justify-between px-4 sm:px-6 pt-24 sm:pt-28 pb-12 overflow-hidden select-none"
    >
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute inset-0 flex items-center justify-center z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.12)_0%,rgba(255,0,127,0.05)_45%,transparent_75%)] pointer-events-none" />
      </div>

      {/* Hero Content Center Stack */}
      <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col items-center text-center mt-2 sm:mt-4">
        {/* Official Club Logo Emblem */}
        <div className="mb-10 sm:mb-14 flex items-center justify-center">
          <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white border-2 border-[#00f0ff] p-2 shadow-[0_0_24px_rgba(0,240,255,0.2),4px_4px_0px_#000000] flex items-center justify-center overflow-hidden transition-transform hover:scale-105">
            <img
              src="/logo.png"
              alt="HITAM Rocketry Club Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Aerospace Retro Marquee Badge */}
        <div className="inline-flex items-center gap-2 bg-black border-2 border-[#00f0ff] px-3.5 py-1.5 rounded-none mb-5 shadow-[3px_3px_0px_#000000]">
          <span className="w-2 h-2 bg-[#00ff66] arcade-blink" />
          <span className="font-pixel text-[8px] sm:text-[9px] text-[#00f0ff] tracking-wider uppercase">
            HITAM · OFFICIAL CLUB LAUNCH // PRE-RELEASE
          </span>
        </div>

        {/* Hero Title in Authentic Retro Arcade Typography with ASCII Glitch Ripple */}
        <div className="mb-4">
          <h1 className="font-pixel text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-wider leading-snug drop-shadow-[0_4px_0_#000000]">
            <AsciiGlitchRipple as="span" className="inline-block hover:text-[#00f0ff] transition-colors">
              HITAM
            </AsciiGlitchRipple>{' '}
            <AsciiGlitchRipple as="span" className="text-[#ffe600] inline-block hover:text-white transition-colors">
              ROCKETRY
            </AsciiGlitchRipple>{' '}
            <AsciiGlitchRipple as="span" className="inline-block hover:text-[#00ff66] transition-colors">
              CLUB
            </AsciiGlitchRipple>
          </h1>
          <div className="mt-2">
            <AsciiGlitchRipple
              as="span"
              className="font-pixel text-[9px] sm:text-xs text-[#00f0ff] tracking-widest uppercase hover:text-white transition-colors"
            >
              ★ BUILDING ENGINEERS · ADVANCING INNOVATION · REACHING BEYOND ★
            </AsciiGlitchRipple>
          </div>
          <div className="mt-1">
            <AsciiGlitchRipple
              as="span"
              className="font-mono-tech text-[11px] sm:text-xs text-[#00ff66] font-semibold tracking-wider hover:text-[#ffe600] transition-colors"
            >
              FROM IDEAS TO FLIGHT · HYDERABAD INSTITUTE OF TECHNOLOGY AND MANAGEMENT
            </AsciiGlitchRipple>
          </div>
        </div>

        {/* Monospace Terminal Directive Prompt */}
        <div className="bg-black/85 border-2 border-white/20 p-4 max-w-3xl mx-auto mb-8 shadow-[4px_4px_0px_#000000] text-left">
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10 font-mono-tech text-[10px] text-white/50">
            <span className="text-[#00ff66]">●</span>
            <span>SYSTEM STATUS: PRE-LAUNCH // FOUNDING CADET INTAKE OPEN</span>
            <span className="ml-auto text-[#ffe600]">FACULTY FACILITATOR: DR. MOTILAL LAKAVAT (HOD, MECH)</span>
          </div>
          <p className="font-mono-tech text-xs sm:text-sm text-slate-200 leading-relaxed mb-2">
            <span className="text-[#00f0ff] font-bold">&gt; MISSION DIRECTIVE:</span> &ldquo;We are not just creating a club. We are creating a platform where students from different branches come together to design, build, test and innovate.&rdquo;
          </p>
          <p className="font-mono-tech text-[11px] text-slate-400 leading-relaxed">
            <span className="text-[#ffe600]">&gt; GOVERNANCE:</span> Build capability before chasing complexity. Progress is guided by safety checkpoints, resources, faculty supervision, and interdisciplinary collaboration across Mechanical, ECE, EEE, CSE/IT, and AI/Data Science.
          </p>
        </div>

        {/* Retro Telemetry Data Readout Boxes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-3xl w-full text-left">
          <div className="bg-[#070a12] border-2 border-white/20 p-3 rounded-none shadow-[3px_3px_0px_#000000]">
            <span className="text-white/40 text-[8px] font-pixel block mb-1">01_STATUS</span>
            <span className="text-[#00f0ff] font-mono-tech font-bold text-xs block">
              <AsciiGlitchRipple as="span">PRE-LAUNCH RELEASE</AsciiGlitchRipple>
            </span>
          </div>
          <div className="bg-[#070a12] border-2 border-white/20 p-3 rounded-none shadow-[3px_3px_0px_#000000]">
            <span className="text-white/40 text-[8px] font-pixel block mb-1">02_SHARED_SYSTEM</span>
            <span className="text-[#ffe600] font-mono-tech font-bold text-xs block">
              <AsciiGlitchRipple as="span">5 Branches Unified</AsciiGlitchRipple>
            </span>
          </div>
          <div className="bg-[#070a12] border-2 border-white/20 p-3 rounded-none shadow-[3px_3px_0px_#000000]">
            <span className="text-white/40 text-[8px] font-pixel block mb-1">03_FACILITATOR</span>
            <span className="text-[#00ff66] font-mono-tech font-bold text-xs truncate block" title="Dr. Motilal Lakavat, HOD Mech">
              <AsciiGlitchRipple as="span">Dr. Motilal (HOD)</AsciiGlitchRipple>
            </span>
          </div>
          <div className="bg-[#070a12] border-2 border-white/20 p-3 rounded-none shadow-[3px_3px_0px_#000000]">
            <span className="text-white/40 text-[8px] font-pixel block mb-1">04_MOTTO</span>
            <span className="text-[#ff007f] font-mono-tech font-bold text-xs block">
              <AsciiGlitchRipple as="span">From Ideas to Flight</AsciiGlitchRipple>
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Prompt */}
      <div
        role="button"
        tabIndex={0}
        onClick={onScrollToNext}
        onKeyDown={(e) => e.key === 'Enter' && onScrollToNext()}
        className="cursor-pointer group flex flex-col items-center gap-1.5 font-pixel text-[9px] text-[#00f0ff] hover:text-white transition-colors mt-8"
      >
        <span className="tracking-widest uppercase">▼ SCROLL TO ASCEND ▼</span>
        <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform text-[#ffe600] animate-bounce" />
      </div>
    </section>
  );
};

export default CockpitHero;
