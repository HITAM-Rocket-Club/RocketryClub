import React, { useState } from 'react';
import {
  Rocket,
  Gauge,
  Rotate3d,
  Gamepad2,
  ChevronRight,
  ChevronLeft,
  X,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface MissionBriefingTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartMission: () => void;
}

export const MissionBriefingTutorialModal: React.FC<MissionBriefingTutorialModalProps> = ({
  isOpen,
  onClose,
  onStartMission,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  if (!isOpen) return null;

  const slides = [
    {
      step: '01 / 04',
      badge: 'ABOUT HRC & SCROLL',
      title: 'WHAT WE DO & THE 3D SCROLL LOGIC',
      icon: <Rocket className="w-6 h-6 text-[#00f0ff]" />,
      lead: 'What is HITAM Rocketry Club (HRC / Astra)?',
      body: 'HRC is the student aerospace engineering division at Hyderabad Institute of Technology and Management (HITAM). We design, build, test, and launch real high-power sounding rockets. Our 25+ student engineers research 4 core pillars: (1) Sounding Rocket Airframes & Dual Recovery, (2) Solid & Hybrid Propulsion Static Test Benches, (3) Custom PCB Flight Computers & LoRa Telemetry, and (4) Intercollegiate Aerospace Competitions.',
      bullets: [
        'Why does scrolling move the rocket? The website is an interactive vertical CAD schematic. Scrolling down takes you on a journey through the 9 stages—from the Cockpit/Nosecone at the top down to the Engines on the launchpad.',
        'Open to all branches: No prior aerospace background needed—we provide practical training in CAD, simulation, electronics, and lab safety.',
      ],
      highlight: 'Scroll down to travel through stages // Scroll up to ascend toward orbit.',
      accent: 'border-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.25)]',
      color: '#00f0ff',
    },
    {
      step: '02 / 04',
      badge: 'LIVE TELEMETRY',
      title: 'FLIGHT MONITOR & 3D STACK MINI-MAP',
      icon: <Gauge className="w-6 h-6 text-[#ffe600]" />,
      lead: 'Real-time flight instrumentation tracking your descent.',
      body: 'Look at the CAD Telemetry gauge in the bottom-right corner. It dynamically displays your altitude in meters, Mach velocity, and the live subsystem specifications (materials, mass, chamber pressure) for whichever rocket stage is currently on screen. Use the vertical "3D STACK" mini-map on the right to jump directly to any stage.',
      highlight: 'Live altitude numbers count down to launchpad or up to orbit.',
      accent: 'border-[#ffe600] shadow-[0_0_20px_rgba(255,230,0,0.25)]',
      color: '#ffe600',
    },
    {
      step: '03 / 04',
      badge: '3D CAD CONTROLS',
      title: '360° DRAG, WIREFRAME & EXPLODED VIEW',
      icon: <Rotate3d className="w-6 h-6 text-[#ff007f]" />,
      lead: 'Full interactive 3D inspection at your fingertips.',
      body: 'You are in full control of the 3D vehicle schematic:',
      bullets: [
        '360° Drag Inspection: Click & drag anywhere with your mouse (or swipe on touchscreens) to rotate the rocket in full 3D.',
        '[WIRE] Mode: Toggle between Solid Titanium Hull and Blueprint Wireframe to see through the fuselage.',
        '[EXPLODE] Mode: Separate all 9 stages in 3D space to inspect internal propellant anti-slosh baffles, turbopump impellers, and helium COPVs.',
      ],
      highlight: 'Zoom is locked to keep smooth page scrolling effortless.',
      accent: 'border-[#ff007f] shadow-[0_0_20px_rgba(255,0,127,0.25)]',
      color: '#ff007f',
    },
    {
      step: '04 / 04',
      badge: 'FLIGHT SQUADRON',
      title: 'RETRO ARCADE & CLUB RECRUITMENT',
      icon: <Gamepad2 className="w-6 h-6 text-[#00ff66]" />,
      lead: 'Test your pilot reflexes and join the HRC rocketry team.',
      body: 'HITAM Rocketry Club (HRC) designs, builds, and launches real high-powered sounding rockets. Try the retro Asteroids Flight Simulator by clicking [PLAY] in the top navigation or in the hero deck. When you reach the bottom (Stage 08), fill out the Cadet Ingestion form to join our Propulsion, Avionics, Airframes, or Flight Simulation divisions.',
      highlight: 'No prior rocketry experience needed — hands-on student aerospace training.',
      accent: 'border-[#00ff66] shadow-[0_0_20px_rgba(0,255,102,0.25)]',
      color: '#00ff66',
    },
  ];

  const current = slides[currentSlide];

  const handleNext = () => {
    soundFx.playClick();
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    soundFx.playClick();
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleComplete = () => {
    soundFx.playStart();
    if (dontShowAgain) {
      localStorage.setItem('hrc_tutorial_dismissed', 'true');
    }
    onStartMission();
  };

  const handleClose = () => {
    soundFx.playToggle();
    if (dontShowAgain) {
      localStorage.setItem('hrc_tutorial_dismissed', 'true');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn select-none">
      {/* Retro Arcade Modal Cabinet Container */}
      <div
        className={`relative w-full max-w-2xl bg-[#090d16] border-2 ${current.accent} p-4 sm:p-6 flex flex-col justify-between max-h-[92vh] overflow-y-auto shadow-2xl transition-all duration-300`}
      >
        {/* Top Header Marquee Bar */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-white/20">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-black border border-white/20">
              {current.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="font-pixel text-[8px] sm:text-[9px] px-1.5 py-0.5 border"
                  style={{ color: current.color, borderColor: current.color }}
                >
                  {current.badge}
                </span>
                <span className="font-pixel text-[8px] text-white/50">
                  {current.step}
                </span>
              </div>
              <h3 className="font-pixel text-xs sm:text-sm text-white tracking-wider mt-0.5">
                MISSION BRIEFING // TUTORIAL
              </h3>
            </div>
          </div>

          {/* Quick Close Button */}
          <button
            onClick={handleClose}
            className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 transition-colors border border-white/20"
            title="Skip Tutorial"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Navigation Tabs */}
        <div className="grid grid-cols-4 gap-1.5 mb-4">
          {slides.map((s, idx) => {
            const active = idx === currentSlide;
            return (
              <button
                key={s.step}
                onClick={() => {
                  soundFx.playClick();
                  setCurrentSlide(idx);
                }}
                className={`py-1 px-1 sm:px-2 font-pixel text-[7px] sm:text-[8px] text-center border transition-all truncate ${
                  active
                    ? 'bg-[#00f0ff] text-black font-bold border-white shadow-[0_0_8px_#00f0ff]'
                    : 'bg-black/60 text-white/50 border-white/20 hover:border-white/50 hover:text-white'
                }`}
              >
                {idx + 1}. {s.badge.split(' ')[0]}
              </button>
            );
          })}
        </div>

        {/* Main Slide Content Card */}
        <div className="bg-black/75 border border-white/15 p-4 sm:p-5 mb-4 flex-1">
          <h4
            className="font-pixel text-sm sm:text-base leading-snug tracking-wide mb-2"
            style={{ color: current.color }}
          >
            {current.title}
          </h4>

          <p className="font-mono-tech text-xs sm:text-sm text-[#00f0ff] mb-3 font-semibold">
            {current.lead}
          </p>

          <p className="font-mono-tech text-xs sm:text-sm text-slate-200 leading-relaxed mb-3">
            {current.body}
          </p>

          {/* Bullets if present */}
          {current.bullets && (
            <ul className="space-y-1.5 mb-3 font-mono-tech text-xs sm:text-sm text-slate-300 pl-1">
              {current.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#00f0ff] mt-0.5">▶</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Highlight Callout Box */}
          <div className="bg-[#101726] border-l-4 border-[#00f0ff] p-2.5 flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-[#ffe600] shrink-0" />
            <span className="font-pixel text-[8px] sm:text-[9px] text-[#ffe600] tracking-wide">
              {current.highlight}
            </span>
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-white/15">
          {/* Don't Show Again Checkbox */}
          <label className="flex items-center gap-2 cursor-pointer font-pixel text-[8px] text-white/60 hover:text-white select-none">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="accent-[#00f0ff] w-3.5 h-3.5 cursor-pointer"
            />
            <span>DO NOT SHOW ON LAUNCH</span>
          </label>

          {/* Previous / Next / Start Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {currentSlide > 0 && (
              <button
                onClick={handlePrev}
                className="arcade-btn bg-black text-white border-2 border-white/40 hover:border-white py-1.5 px-3 font-pixel text-[9px] flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>BACK</span>
              </button>
            )}

            {currentSlide < slides.length - 1 ? (
              <button
                onClick={handleNext}
                className="arcade-btn arcade-btn-cyan py-1.5 px-4 font-pixel text-[9px] flex items-center gap-1.5"
              >
                <span>NEXT STEP</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                className="arcade-btn arcade-btn-magenta py-1.5 px-5 font-pixel text-[9px] flex items-center gap-1.5 arcade-blink"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>START MISSION // COMMENCE FLIGHT</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
