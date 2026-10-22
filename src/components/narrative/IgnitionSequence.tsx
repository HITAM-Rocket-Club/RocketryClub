import React, { useState } from 'react';
import { Zap, ArrowDown, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../../utils/audio';

interface IgnitionSequenceProps {
  onLaunched: () => void;
}

export const IgnitionSequence: React.FC<IgnitionSequenceProps> = ({ onLaunched }) => {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isIgnited, setIsIgnited] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const startIgnition = () => {
    if (countdown !== null || isIgnited) return;

    soundFx.playStart();
    setCountdown(5);

    let current = 5;
    const interval = setInterval(() => {
      current -= 1;
      if (current > 0) {
        soundFx.playBlip(750, 0.08, 'square');
        setCountdown(current);
      } else if (current === 0) {
        setCountdown(0);
        soundFx.playThruster(1.8);
        setIsIgnited(true);
        setIsShaking(true);

        // Pixel-like square confetti particles
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.8 },
          colors: ['#ffe600', '#ff007f', '#00f0ff', '#ffffff', '#ff3333'],
          shapes: ['square'],
        });

        setTimeout(() => {
          setIsShaking(false);
          onLaunched();
        }, 1800);

        clearInterval(interval);
      }
    }, 850);
  };

  const resetIgnition = () => {
    setCountdown(null);
    setIsIgnited(false);
    setIsShaking(false);
    soundFx.playClick();
  };

  return (
    <section
      id="ignition"
      className={`relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-24 border-t-4 border-[#ffe600]/30 select-none ${
        isShaking ? 'animate-bounce' : ''
      }`}
    >
      {/* Pixel Flame Plume when ignited */}
      {isIgnited && (
        <div className="absolute inset-x-0 bottom-0 h-96 flex justify-center pointer-events-none z-0">
          <div className="w-80 h-full bg-gradient-to-t from-[#ff3333] via-[#ffe600]/80 to-transparent blur-2xl opacity-80 animate-pulse" />
        </div>
      )}

      <div className="relative z-10 max-w-3xl mx-auto w-full text-center">
        {/* Stage 3 Banner */}
        <div className="inline-block bg-[#140810] border-2 border-[#ff007f] px-4 py-2 mb-3">
          <span className="font-pixel text-[10px] text-[#ff007f] tracking-widest uppercase">
            ★ STAGE 03 // MAIN BOOSTER IGNITION SEQUENCE ★
          </span>
        </div>
        <div className="mb-6">
          <span className="inline-block bg-[#ff007f]/15 border border-[#ff007f] px-2.5 py-0.5 font-pixel text-[8px] text-[#ff007f]">
            ● 3D BG: PART 04 // INTERSTAGE TRUSS & TITANIUM GRID FINS
          </span>
        </div>

        <h2 className="font-pixel text-2xl sm:text-4xl text-white tracking-wide mb-4">
          THRUST CONTROLLER
        </h2>

        <p className="font-mono-tech text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-8">
          Solid motor igniter continuity verified. Engaging high-current electrical discharge into composite grain core.
        </p>

        {/* 8-bit Ignition Arcade Box */}
        <div className="arcade-box-yellow p-6 sm:p-8 max-w-xl mx-auto relative">
          <div className="flex items-center justify-between pb-3 border-b-2 border-[#ffe600] mb-6 font-pixel text-[10px]">
            <span className="text-white/60">INTERLOCK: UNLOCKED</span>
            <span className={isIgnited ? 'text-[#ff3333]' : 'text-[#00ff66]'}>
              {isIgnited ? 'BOOSTER IGNITED!' : 'ARMED & READY'}
            </span>
          </div>

          {/* Big Chunky 8-bit Countdown Display */}
          <div className="py-6 flex flex-col items-center justify-center">
            {countdown !== null && !isIgnited && (
              <div className="font-pixel">
                <div className="text-[10px] text-white/50 mb-2">T-MINUS COUNTDOWN</div>
                <div className="text-6xl sm:text-8xl text-[#ffe600] arcade-blink-fast tracking-widest">
                  0{countdown}
                </div>
                <div className="text-[9px] text-[#00f0ff] mt-3">HOLDING RANGE CLEARANCE</div>
              </div>
            )}

            {isIgnited && (
              <div className="font-pixel">
                <div className="text-[10px] text-[#ff3333] mb-2">LIFTOFF CONFIRMED</div>
                <div className="text-4xl sm:text-6xl text-[#ff007f] arcade-blink tracking-widest">
                  LIFTOFF!
                </div>
                <div className="text-[10px] text-[#00ff66] mt-3">
                  CLEARING LAUNCH RAIL // MAX-Q INBOUND
                </div>
              </div>
            )}

            {countdown === null && !isIgnited && (
              <div className="font-pixel">
                <div className="text-[10px] text-white/50 mb-2">SYSTEM STANDBY</div>
                <div className="text-5xl sm:text-6xl text-white tracking-widest">
                  T-05
                </div>
                <div className="text-[10px] text-[#ffe600] mt-3">
                  PRESS BUTTON TO TRIGGER IGNITION
                </div>
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="pt-6 border-t-2 border-[#ffe600] flex flex-col sm:flex-row gap-3 justify-center">
            {!isIgnited ? (
              <button
                onClick={startIgnition}
                disabled={countdown !== null}
                className="arcade-btn arcade-btn-magenta flex items-center justify-center gap-2 text-xs py-3 px-6 hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>IGNITE & COMMENCE ASCENT</span>
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
                <a
                  href="#mission"
                  onClick={() => soundFx.playClick()}
                  className="arcade-btn arcade-btn-cyan flex items-center justify-center gap-2 text-xs py-3 px-6"
                >
                  <span>ASCEND TO STAGE 04 (MISSION)</span>
                  <ArrowDown className="w-4 h-4" />
                </a>
                <button
                  onClick={resetIgnition}
                  className="arcade-btn flex items-center justify-center gap-2 text-xs py-3 px-4"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>RESET</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
