import React, { useState } from 'react';
import {
  ShieldAlert,
  Calendar,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import {
  CAPABILITY_PHASES,
  RESPONSIBLE_ROADMAP,
  COMPOUNDING_VALUES,
} from '../../data/rocketryData';
import { soundFx } from '../../utils/audio';
import { AsciiGlitchRipple } from '../ui/ascii-glitch-ripple';

export const KarmanAchievements: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'PHASES' | 'ROADMAP' | 'VALUE'>('PHASES');

  return (
    <section
      id="records"
      className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 py-20 select-none"
    >
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Section Header: Slide 5 - CAPABILITY BEFORE COMPLEXITY */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-black border-2 border-[#00ff66] px-3.5 py-1 rounded-none mb-3 shadow-[2px_2px_0px_#000000]">
            <span className="w-2 h-2 bg-[#00ff66] arcade-blink" />
            <span className="font-pixel text-[8px] text-[#00ff66] uppercase tracking-wider">
              STAGE 03 // RESPONSIBLE ROADMAP &amp; CAPABILITY
            </span>
          </div>
          <h2 className="font-pixel text-xl sm:text-3xl text-white tracking-wider mb-2">
            <AsciiGlitchRipple as="span" className="hover:text-[#00ff66] transition-colors">
              CAPABILITY BEFORE COMPLEXITY
            </AsciiGlitchRipple>
          </h2>
          <div className="mb-3">
            <AsciiGlitchRipple as="p" className="font-pixel text-xs sm:text-sm text-[#ffe600] tracking-wide inline-block hover:text-white transition-colors">
              ★ BUILD CAPABILITY BEFORE CHASING COMPLEXITY ★
            </AsciiGlitchRipple>
          </div>
          <div className="font-mono-tech text-xs sm:text-sm text-slate-300 leading-relaxed bg-black/70 border border-white/20 p-4 shadow-[3px_3px_0px_#000000] text-left">
            <span className="text-[#00ff66] font-bold">&gt; PRINCIPLE:</span> Every step has a learning objective and a checkpoint. Advanced launches are future goals, not immediate claims. Progress depends on resources, approvals, faculty supervision, funding, safety, and student participation.
          </div>
        </div>

        {/* View Switcher Controls */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('PHASES');
            }}
            className={`px-4 py-2 font-pixel text-[9px] border-2 transition-all cursor-pointer shadow-[3px_3px_0px_#000000] ${
              activeTab === 'PHASES'
                ? 'bg-[#00f0ff] text-black font-bold border-white'
                : 'bg-black text-slate-300 border-white/20 hover:border-white hover:text-white'
            }`}
          >
            [ 01 · PHASES &amp; SAFETY CHECKPOINTS ]
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('ROADMAP');
            }}
            className={`px-4 py-2 font-pixel text-[9px] border-2 transition-all cursor-pointer shadow-[3px_3px_0px_#000000] ${
              activeTab === 'ROADMAP'
                ? 'bg-[#ffe600] text-black font-bold border-white'
                : 'bg-black text-slate-300 border-white/20 hover:border-white hover:text-white'
            }`}
          >
            [ 02 · 3-YEAR RESPONSIBLE ROADMAP ]
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('VALUE');
            }}
            className={`px-4 py-2 font-pixel text-[9px] border-2 transition-all cursor-pointer shadow-[3px_3px_0px_#000000] ${
              activeTab === 'VALUE'
                ? 'bg-[#ff007f] text-white font-bold border-white'
                : 'bg-black text-slate-300 border-white/20 hover:border-white hover:text-white'
            }`}
          >
            [ 03 · VALUE THAT COMPOUNDS ]
          </button>
        </div>

        {/* TAB 1: PHASES & SAFETY CHECKPOINTS (Slide 5) */}
        {activeTab === 'PHASES' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {CAPABILITY_PHASES.map((cp, idx) => (
                <div
                  key={cp.id}
                  className="bg-[#070a12] border-2 rounded-none p-5 sm:p-6 shadow-[5px_5px_0px_#000000] flex flex-col justify-between"
                  style={{ borderColor: cp.color }}
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b-2 border-white/10 mb-4">
                      <span
                        className="font-pixel text-[9px] px-2 py-0.5 border bg-black font-bold"
                        style={{ color: cp.color, borderColor: cp.color }}
                      >
                        STAGE 0{idx + 1}
                      </span>
                      <span className="font-mono-tech text-[10px] text-white/50">
                        PROGRESSIVE COMPLEXITY
                      </span>
                    </div>

                    <h3 className="font-pixel text-sm sm:text-base text-white mb-1">
                      {cp.phase}
                    </h3>
                    <div className="font-mono-tech text-xs text-[#ffe600] font-semibold mb-4">
                      {cp.subtitle}
                    </div>

                    {/* Activities */}
                    <div className="mb-5 space-y-1.5 font-mono-tech text-xs text-slate-200 bg-black/40 p-3 border border-white/10">
                      <span className="text-[10px] text-white/40 uppercase block mb-1">
                        Core Activities
                      </span>
                      {cp.activities.map((act, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <span className="text-[#00ff66] font-bold">■</span>
                          <span>{act}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Safety Checkpoint Box */}
                  <div className="bg-black border-2 border-[#ff007f] p-3.5 shadow-[2px_2px_0px_#000000]">
                    <div className="flex items-center gap-2 mb-1.5 font-pixel text-[8px] text-[#ff007f]">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>SAFETY CHECKPOINT: {cp.safetyCheckpoint}</span>
                    </div>
                    <p className="font-mono-tech text-[11px] text-slate-300 leading-relaxed">
                      {cp.checkpointDetail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mandatory Governance Alert Box from Slide 5 */}
            <div className="bg-[#14050e] border-2 border-[#ff007f] p-4 rounded-none shadow-[4px_4px_0px_#000000] flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[#ff007f] shrink-0 mt-0.5" />
              <div className="font-mono-tech text-xs text-slate-300 leading-relaxed">
                <span className="text-white font-bold block uppercase text-[11px] mb-0.5">
                  OPERATIONAL SAFETY PREREQUISITE &amp; GOVERNANCE (SLIDE 05):
                </span>
                Progress across all phases is strictly conditional on resources, official institutional approvals, faculty supervision, safety protocols, funding, and student participation. Advanced launches are future goals, not immediate claims.
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: RESPONSIBLE ROADMAP (Slide 7) */}
        {activeTab === 'ROADMAP' && (
          <div className="space-y-6">
            <div className="bg-black/80 border-2 border-white/20 p-4 mb-2 text-center font-mono-tech text-xs text-slate-300 shadow-[3px_3px_0px_#000000]">
              <span className="text-[#ffe600] font-bold">&gt; THREE-YEAR STRATEGY:</span> Three years to establish, develop, and expand. Roadmap is subject to resources, approvals, faculty supervision, funding, safety, and student participation.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {RESPONSIBLE_ROADMAP.map((year, idx) => (
                <div
                  key={year.id}
                  className="bg-[#070a12] border-2 rounded-none p-5 sm:p-6 shadow-[5px_5px_0px_#000000] flex flex-col justify-between"
                  style={{ borderColor: year.badgeColor }}
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b-2 border-white/10 mb-3">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-[#ffe600]" />
                        <span className="font-pixel text-[9px] text-white">
                          YEAR 0{idx + 1}
                        </span>
                      </div>
                      <span
                        className="font-pixel text-[7px] px-2 py-0.5 border bg-black font-bold"
                        style={{ color: year.badgeColor, borderColor: year.badgeColor }}
                      >
                        {year.status}
                      </span>
                    </div>

                    <h3 className="font-pixel text-sm sm:text-base text-white mb-1">
                      {year.year}
                    </h3>
                    <div className="font-mono-tech text-xs text-[#00f0ff] font-semibold mb-3">
                      {year.title}
                    </div>

                    <p className="font-mono-tech text-xs text-[#ffe600] italic bg-black/60 p-2.5 border border-white/10 mb-4">
                      &ldquo;{year.tagline}&rdquo;
                    </p>

                    <div className="space-y-2 font-mono-tech text-xs text-slate-200">
                      {year.deliverables.map((item, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <span className="text-[#00ff66] font-bold">▸</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/10 font-mono-tech text-[10px] text-white/40 text-right">
                    HITAM // RESPONSIBLE ROADMAP
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: VALUE THAT COMPOUNDS (Slide 6) */}
        {activeTab === 'VALUE' && (
          <div className="space-y-6">
            <div className="bg-black/80 border-2 border-white/20 p-4 mb-2 text-center font-mono-tech text-xs text-slate-300 shadow-[3px_3px_0px_#000000]">
              <span className="text-[#00ff66] font-bold">&gt; INSTITUTIONAL ASSET (SLIDE 06):</span> The club becomes an institutional asset when projects become evidence of learning, research, visibility, and partnerships. It connects the classroom to work students can show, improve, and carry forward.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {COMPOUNDING_VALUES.map((val) => (
                <div
                  key={val.id}
                  className="bg-[#070a12] border-2 rounded-none p-5 shadow-[4px_4px_0px_#000000] flex flex-col justify-between"
                  style={{ borderColor: val.color }}
                >
                  <div>
                    <div className="flex items-center gap-2 pb-2 border-b border-white/10 mb-3">
                      <TrendingUp className="w-4 h-4" style={{ color: val.color }} />
                      <h3 className="font-pixel text-xs text-white">
                        {val.title}
                      </h3>
                    </div>

                    <p className="font-mono-tech text-xs text-slate-400 mb-3">
                      {val.description}
                    </p>

                    <div className="space-y-1.5 font-mono-tech text-xs text-slate-200 bg-black/40 p-3 border border-white/10">
                      {val.bullets.map((b, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <span className="text-[#00ff66] font-bold">■</span>
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-2 border-t border-white/10 text-right font-pixel text-[8px] text-white/50">
                    COMPOUNDING VALUE
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Next Stage */}
        <div className="text-center pt-10">
          <button
            onClick={() => {
              soundFx.playClick();
              const el = document.getElementById('crew');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-black hover:bg-white/10 border-2 border-[#00ff66] text-[#00ff66] hover:text-white font-pixel text-[9px] cursor-pointer shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5"
          >
            <span>[ NEXT: FACULTY FACILITATOR &amp; FOUNDING LEADERSHIP ]</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default KarmanAchievements;
