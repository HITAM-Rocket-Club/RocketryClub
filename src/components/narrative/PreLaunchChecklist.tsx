import React, { useState } from 'react';
import { Play, Sparkles, CheckSquare, Square, ChevronRight } from 'lucide-react';
import { CHECKLIST_ITEMS } from '../../data/rocketryData';
import { soundFx } from '../../utils/audio';

interface PreLaunchChecklistProps {
  onAllVerified: () => void;
}

export const PreLaunchChecklist: React.FC<PreLaunchChecklistProps> = ({ onAllVerified }) => {
  const [checkedItems, setCheckedItems] = useState<{ [id: string]: boolean }>({
    'chk-1': true,
    'chk-2': true,
  });
  const [expandedId, setExpandedId] = useState<string | null>('chk-1');
  const [isVerifying, setIsVerifying] = useState(false);

  const toggleCheck = (id: string) => {
    soundFx.playClick();
    setCheckedItems((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      const allChecked = CHECKLIST_ITEMS.every((item) => next[item.id]);
      if (allChecked) {
        soundFx.playSuccess();
        onAllVerified();
      }
      return next;
    });
  };

  const runAutoVerification = () => {
    if (isVerifying) return;
    setIsVerifying(true);
    soundFx.playStart();

    CHECKLIST_ITEMS.forEach((item, index) => {
      setTimeout(() => {
        setCheckedItems((prev) => {
          const next = { ...prev, [item.id]: true };
          soundFx.playClick();
          if (index === CHECKLIST_ITEMS.length - 1) {
            setIsVerifying(false);
            soundFx.playSuccess();
            onAllVerified();
          }
          return next;
        });
        setExpandedId(item.id);
      }, (index + 1) * 450);
    });
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const isComplete = completedCount === CHECKLIST_ITEMS.length;

  return (
    <section
      id="checklist"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-24 border-t-4 border-[#ff007f]/30 select-none"
    >
      <div className="relative z-10 max-w-4xl mx-auto w-full">
        {/* Stage 2 Arcade Banner */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b-2 border-white/20">
          <div>
            <div className="font-pixel text-[10px] text-[#00ff66] mb-1 tracking-widest">
              ★ STAGE 02 // FLIGHT COMPUTER VERIFICATION ★
            </div>
            <div className="inline-block bg-[#00ff66]/15 border border-[#00ff66] px-2 py-0.5 font-pixel text-[8px] text-[#00ff66] mb-2">
              ● 3D BG: PART 03 // AVIONICS BAY, IMU & HELIUM COPV
            </div>
            <h2 className="font-pixel text-xl sm:text-3xl text-white tracking-wide">
              PRE-LAUNCH CHECKLIST
            </h2>
          </div>

          <button
            onClick={runAutoVerification}
            disabled={isVerifying || isComplete}
            className={`arcade-btn ${
              isComplete
                ? 'arcade-btn-cyan'
                : 'arcade-btn-yellow'
            } flex items-center gap-2 text-[10px]`}
          >
            {isComplete ? (
              <>
                <Sparkles className="w-3.5 h-3.5" /> 100% READY
              </>
            ) : isVerifying ? (
              <>
                <span className="arcade-blink">VERIFYING...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-black" /> AUTO-CHECK ALL
              </>
            )}
          </button>
        </div>

        {/* 8-bit Scoreboard Progress Bar */}
        <div className="arcade-box-green p-4 sm:p-5 mb-8">
          <div className="flex items-center justify-between font-pixel text-[10px] mb-3">
            <span className="text-[#00ff66]">SYSTEMS INTEGRITY:</span>
            <span className="text-[#ffe600]">
              {completedCount} / {CHECKLIST_ITEMS.length} [
              {Math.round((completedCount / CHECKLIST_ITEMS.length) * 100)}%]
            </span>
          </div>

          {/* Stepped Pixel Progress Blocks */}
          <div className="flex gap-1.5 h-4 bg-black p-1 border border-white/20">
            {CHECKLIST_ITEMS.map((item, idx) => {
              const isChecked = !!checkedItems[item.id];
              return (
                <div
                  key={idx}
                  className={`flex-1 transition-colors ${
                    isChecked
                      ? 'bg-[#00ff66] shadow-[0_0_8px_#00ff66]'
                      : 'bg-white/10'
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Checklist Rows with Pixel Checkboxes */}
        <div className="space-y-3 font-pixel text-[10px]">
          {CHECKLIST_ITEMS.map((item) => {
            const isChecked = !!checkedItems[item.id];
            const isExpanded = expandedId === item.id;

            return (
              <div
                key={item.id}
                className={`border-2 transition-all p-3 sm:p-4 cursor-pointer select-none ${
                  isChecked
                    ? 'border-[#00ff66] bg-[#00ff66]/10 text-white'
                    : 'border-white/20 bg-black/80 text-white/60 hover:border-white/40'
                }`}
                onClick={() => toggleCheck(item.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-[#00ff66]">
                      {isChecked ? (
                        <CheckSquare className="w-5 h-5 text-[#00ff66]" />
                      ) : (
                        <Square className="w-5 h-5 text-white/40" />
                      )}
                    </span>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9px] px-1.5 py-0.5 bg-black border border-white/20 text-[#ffe600]">
                          {item.code}
                        </span>
                        <span className="text-[9px] text-white/50">[{item.system}]</span>
                      </div>
                      <h4 className="text-xs sm:text-sm text-white font-normal">
                        {item.label}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline-block px-2 py-0.5 bg-black border border-white/20 text-[9px] text-[#00f0ff]">
                      {item.telemetryRef}
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isExpanded ? 'rotate-90 text-[#ffe600]' : 'text-white/40'
                      }`}
                    />
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-white/10 font-mono-tech text-xs text-slate-300">
                    <span className="text-[#ffe600] font-pixel text-[9px] block mb-1">
                      TECHNICAL SPEC:
                    </span>
                    {item.detail}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 100% Ready Banner */}
        {isComplete && (
          <div className="mt-8 p-4 bg-[#08140c] border-2 border-[#00ff66] text-center font-pixel text-xs text-[#00ff66] shadow-[0_0_20px_rgba(0,255,102,0.3)]">
            <span className="arcade-blink">★ ALL SYSTEMS GO! RANGE SAFETY CLEAR FOR IGNITION ★</span>
          </div>
        )}
      </div>
    </section>
  );
};
