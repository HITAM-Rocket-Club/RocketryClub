import React, { useState } from 'react';
import {
  Rocket,
  Cpu,
  Zap,
  Terminal,
  BrainCircuit,
  ArrowRight,
} from 'lucide-react';
import { BRANCH_CONTRIBUTIONS } from '../../data/rocketryData';
import type { BranchContribution } from '../../types';
import { soundFx } from '../../utils/audio';
import { AsciiGlitchRipple } from '../ui/ascii-glitch-ripple';

export const StratosphereBuilds: React.FC = () => {
  const [selectedBranch, setSelectedBranch] = useState<BranchContribution>(BRANCH_CONTRIBUTIONS[0]);

  const getBranchIcon = (code: string) => {
    switch (code) {
      case 'MECH':
        return <Rocket className="w-5 h-5 text-[#00f0ff]" />;
      case 'ECE':
        return <Cpu className="w-5 h-5 text-[#ff007f]" />;
      case 'EEE':
        return <Zap className="w-5 h-5 text-[#ffe600]" />;
      case 'CSE / IT':
        return <Terminal className="w-5 h-5 text-[#00ff66]" />;
      case 'AI / DS':
        return <BrainCircuit className="w-5 h-5 text-[#a855f7]" />;
      default:
        return <Rocket className="w-5 h-5 text-white" />;
    }
  };

  return (
    <section
      id="builds"
      className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 py-20 select-none"
    >
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Section Header: Slide 4 - ONE SHARED SYSTEM */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-black border-2 border-[#ffe600] px-3.5 py-1 rounded-none mb-3 shadow-[2px_2px_0px_#000000]">
            <span className="w-2 h-2 bg-[#ffe600] arcade-blink" />
            <span className="font-pixel text-[8px] text-[#ffe600] uppercase tracking-wider">
              STAGE 02 // MULTIDISCIPLINARY INTEGRATION
            </span>
          </div>
          <h2 className="font-pixel text-xl sm:text-3xl text-white tracking-wider mb-2">
            <AsciiGlitchRipple as="span" className="hover:text-[#ffe600] transition-colors">
              ONE SHARED SYSTEM
            </AsciiGlitchRipple>
          </h2>
          <div className="mb-3">
            <AsciiGlitchRipple as="p" className="font-pixel text-xs sm:text-sm text-[#00f0ff] tracking-wide inline-block hover:text-white transition-colors">
              ★ ONE PROJECT · MANY BRANCHES · ONE SHARED OUTCOME ★
            </AsciiGlitchRipple>
          </div>
          <div className="font-mono-tech text-xs sm:text-sm text-slate-300 leading-relaxed bg-black/70 border border-white/20 p-4 shadow-[3px_3px_0px_#000000] text-left">
            <span className="text-[#ffe600] font-bold">&gt; ARCHITECTURE:</span> The rocket is our shared system, not a Mechanical-only project. Each branch contributes a distinct capability, uniting hardware, avionics, energy, software, and predictive data into one integrated aerospace vehicle.
          </div>
        </div>

        {/* 5 Engineering Branch Matrix - Interactive Subsystem Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-12">
          {/* Left Column: Branch Selector Tabs */}
          <div className="lg:col-span-5 space-y-3">
            <div className="font-pixel text-[8px] text-white/50 px-1 uppercase tracking-wider mb-2">
              SELECT SUBSYSTEM BRANCH // 5 DISCIPLINES
            </div>
            {BRANCH_CONTRIBUTIONS.map((branch) => {
              const isSelected = selectedBranch.id === branch.id;
              return (
                <button
                  key={branch.id}
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedBranch(branch);
                  }}
                  className={`w-full p-4 rounded-none border-2 text-left transition-all cursor-pointer flex items-center justify-between shadow-[3px_3px_0px_#000000] ${
                    isSelected
                      ? 'bg-[#070a12] border-white shadow-[5px_5px_0px_#000000] translate-x-1'
                      : 'bg-black/80 border-white/20 hover:border-white/50 hover:bg-white/5'
                  }`}
                  style={{
                    borderColor: isSelected ? branch.color : undefined,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2 bg-black border-2 shadow-[2px_2px_0px_#000000]"
                      style={{ borderColor: branch.color }}
                    >
                      {getBranchIcon(branch.code)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className="font-pixel text-[8px] px-1.5 py-0.5 border bg-black font-bold"
                          style={{ color: branch.color, borderColor: branch.color }}
                        >
                          {branch.code}
                        </span>
                        <span className="font-pixel text-xs text-white">
                          {branch.branch}
                        </span>
                      </div>
                      <span className="font-mono-tech text-[10px] text-slate-400 block mt-0.5">
                        {branch.subsystemRole}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono-tech text-xs font-bold" style={{ color: branch.color }}>
                    {isSelected ? '▶' : '▷'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Branch Technical Blueprint */}
          <div className="lg:col-span-7">
            <div
              className="bg-[#070a12] border-3 rounded-none p-6 shadow-[8px_8px_0px_#000000]"
              style={{ borderColor: selectedBranch.color }}
            >
              <div className="flex items-center justify-between pb-4 border-b-2 border-white/20 mb-5">
                <div className="flex items-center gap-3">
                  <div
                    className="p-2.5 bg-black border-2 shadow-[2px_2px_0px_#000000]"
                    style={{ borderColor: selectedBranch.color }}
                  >
                    {getBranchIcon(selectedBranch.code)}
                  </div>
                  <div>
                    <span
                      className="font-pixel text-[8px] uppercase tracking-wider block"
                      style={{ color: selectedBranch.color }}
                    >
                      BRANCH CONTRIBUTION PROFILE
                    </span>
                    <h3 className="font-pixel text-base sm:text-xl text-white mt-0.5">
                      {selectedBranch.branch}
                    </h3>
                  </div>
                </div>
                <span className="bg-black border border-white/20 font-mono-tech text-xs text-white/60 px-3 py-1 shadow-[2px_2px_0px_#000000]">
                  {selectedBranch.code}
                </span>
              </div>

              {/* Subsystem Role Overview */}
              <div className="mb-5 bg-black/60 p-3.5 border border-white/10">
                <span className="font-mono-tech text-[10px] text-white/40 uppercase block mb-1">
                  Primary Subsystem Responsibility
                </span>
                <p className="font-mono-tech text-xs sm:text-sm text-[#ffe600] font-semibold">
                  {selectedBranch.subsystemRole}
                </p>
              </div>

              {/* Core Contributions from PPT Slide 4 */}
              <div className="mb-5">
                <div className="font-pixel text-[9px] text-[#00f0ff] uppercase mb-2 tracking-wider">
                  &gt; OFFICIAL CONTRIBUTIONS (SLIDE 04)
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedBranch.contributions.map((c, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-black border-2 font-mono-tech text-xs text-white shadow-[2px_2px_0px_#000000]"
                      style={{ borderColor: selectedBranch.color }}
                    >
                      ■ {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specific Engineering Deliverables */}
              <div className="mb-6">
                <div className="font-pixel text-[9px] text-white/70 uppercase mb-2 tracking-wider">
                  &gt; PHYSICAL HARDWARE &amp; SOFTWARE DELIVERABLES
                </div>
                <div className="space-y-2 font-mono-tech text-xs text-slate-200 bg-black/40 p-4 border border-white/10">
                  {selectedBranch.deliverables.map((deliv, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-[#00ff66] font-bold shrink-0">✓</span>
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Note */}
              <div className="pt-3 border-t-2 border-white/10 flex items-center justify-between font-mono-tech text-[11px] text-white/50">
                <span>SHARED SYSTEM OUTCOME // ROCKETRY</span>
                <span className="text-[#00ff66] font-semibold">NO BRANCH STANDS ALONE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full Overview Matrix Table from Slide 4 */}
        <div className="bg-black border-2 border-white/30 p-5 rounded-none shadow-[6px_6px_0px_#000000]">
          <div className="flex items-center justify-between pb-3 border-b-2 border-white/20 mb-4 font-mono-tech text-xs">
            <span className="font-pixel text-[9px] text-[#ffe600]">
              COMPLETE BRANCH MATRIX // ONE SHARED OUTCOME
            </span>
            <span className="text-white/40">PPTX SLIDE 04 TABLE</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono-tech text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-white/20 bg-white/5">
                  <th className="p-3 text-white font-pixel text-[9px]">BRANCH</th>
                  <th className="p-3 text-[#00f0ff] font-pixel text-[9px]">OFFICIAL CONTRIBUTION</th>
                  <th className="p-3 text-[#00ff66] font-pixel text-[9px]">INTEGRATION SCOPE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {BRANCH_CONTRIBUTIONS.map((b) => (
                  <tr key={b.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3 font-bold text-white whitespace-nowrap">
                      <span className="text-xs" style={{ color: b.color }}>■ </span>
                      {b.branch} ({b.code})
                    </td>
                    <td className="p-3 text-slate-300 font-semibold">
                      {b.contributions.join(', ')}
                    </td>
                    <td className="p-3 text-slate-400">
                      {b.subsystemRole}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Call to Next Stage */}
        <div className="text-center pt-8">
          <button
            onClick={() => {
              soundFx.playClick();
              const el = document.getElementById('records');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-black hover:bg-white/10 border-2 border-[#ffe600] text-[#ffe600] hover:text-white font-pixel text-[9px] cursor-pointer shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5"
          >
            <span>[ NEXT: CAPABILITY BEFORE COMPLEXITY &amp; ROADMAP ]</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default StratosphereBuilds;
