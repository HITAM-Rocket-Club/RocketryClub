import React, { useState } from 'react';
import { MISSION_RECORDS } from '../../data/rocketryData';
import { soundFx } from '../../utils/audio';

export const KarmanAchievements: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'RECORD' | 'VERIFIED' | 'TARGET'>('ALL');

  const filteredRecords =
    filter === 'ALL'
      ? MISSION_RECORDS
      : MISSION_RECORDS.filter((r) => r.status === filter);

  return (
    <section
      id="records"
      className="relative min-h-screen flex flex-col justify-center px-4 py-24 border-t-4 border-[#ffe600]/30 select-none"
    >
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Stage 6 Arcade Banner */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b-2 border-white/20">
          <div>
            <div className="font-pixel text-[10px] text-[#ffe600] mb-1 tracking-widest">
              ★ STAGE 06 // KÁRMÁN LINE (50,000m - 100,000m) ★
            </div>
            <div className="inline-block bg-[#00ff66]/15 border border-[#00ff66] px-2 py-0.5 font-pixel text-[8px] text-[#00ff66] mb-2">
              ● 3D BG: PART 07 // AERODYNAMIC FIN CANISTER & TVC GIMBAL
            </div>
            <h2 className="font-pixel text-xl sm:text-3xl text-white tracking-wide">
              HIGH SCORES & MISSION RECORDS
            </h2>
          </div>
          <div className="font-pixel text-[9px] text-[#00ff66] bg-black border-2 border-[#00ff66] px-3 py-1.5 self-start sm:self-auto">
            HALL OF FAME LEADERBOARD
          </div>
        </div>

        {/* Arcade High-Score Table Frame */}
        <div className="arcade-box-yellow p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between pb-4 border-b-2 border-[#ffe600] mb-6 gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🏆</span>
              <div>
                <span className="font-pixel text-xs text-[#ffe600] block">
                  TOP PILOT FLIGHT RECORDS
                </span>
                <span className="font-pixel text-[8px] text-white/50">
                  RANKED BY CERTIFIED APOGEE & ACCELERATION
                </span>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex gap-2">
              {(['ALL', 'RECORD', 'VERIFIED', 'TARGET'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    soundFx.playClick();
                    setFilter(tab);
                  }}
                  className={`px-2.5 py-1 font-pixel text-[8px] border-2 transition-all ${
                    filter === tab
                      ? 'bg-[#ffe600] text-black border-white font-bold'
                      : 'bg-black text-white border-white/20 hover:border-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Classic Arcade Leaderboard Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left font-pixel text-[9px] border-collapse">
              <thead>
                <tr className="border-b-2 border-white/20 text-[#00f0ff] uppercase">
                  <th className="py-3 px-3">RANK</th>
                  <th className="py-3 px-3">MISSION / SQUADRON</th>
                  <th className="py-3 px-3">CATEGORY</th>
                  <th className="py-3 px-3">SCORE / APOGEE</th>
                  <th className="py-3 px-3">DATE</th>
                  <th className="py-3 px-3 text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredRecords.map((r) => (
                  <tr
                    key={r.id}
                    className="hover:bg-white/5 transition-colors group"
                  >
                    <td className="py-3.5 px-3 text-[#ffe600] font-bold text-xs">
                      {r.rank}
                    </td>
                    <td className="py-3.5 px-3 text-white">
                      <div>{r.missionName}</div>
                      <div className="font-mono-tech text-[10px] text-slate-400 mt-0.5">
                        {r.metrics}
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-[#00f0ff]">
                      {r.category}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="text-[#00ff66] bg-black px-2 py-1 border border-[#00ff66]/40">
                        {r.scoreOrAltitude}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-white/60">
                      {r.date}
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <span
                        className={`inline-block px-2 py-0.5 border text-[8px] ${
                          r.status === 'RECORD'
                            ? 'text-[#ffe600] border-[#ffe600] bg-[#ffe600]/10'
                            : r.status === 'VERIFIED'
                            ? 'text-[#00f0ff] border-[#00f0ff] bg-[#00f0ff]/10'
                            : 'text-[#ff007f] border-[#ff007f] bg-[#ff007f]/10'
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Arcade Hall of Fame Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-pixel text-[8px]">
          <div className="bg-black p-4 border-2 border-white/20">
            <span className="text-white/50 block mb-1">HIGHEST APOGEE</span>
            <div className="text-[#00ff66] text-sm">2,420m AGL</div>
            <span className="text-white/40 mt-1 block">LEVEL-1 CERTIFIED</span>
          </div>

          <div className="bg-black p-4 border-2 border-white/20">
            <span className="text-white/50 block mb-1">MAX PEAK THRUST</span>
            <div className="text-[#ffe600] text-sm">520 N PEAK</div>
            <span className="text-white/40 mt-1 block">AGNI HYBRID TEST</span>
          </div>

          <div className="bg-black p-4 border-2 border-white/20">
            <span className="text-white/50 block mb-1">CHUTE RELIABILITY</span>
            <div className="text-[#00f0ff] text-sm">100.0%</div>
            <span className="text-white/40 mt-1 block">DUAL DEPLOYMENT</span>
          </div>

          <div className="bg-black p-4 border-2 border-white/20">
            <span className="text-white/50 block mb-1">NEXT LEVEL LAUNCH</span>
            <div className="text-[#ff007f] text-sm">OCT 03 ~2PM</div>
            <span className="text-white/40 mt-1 block">ASTRA-01 LAUNCH</span>
          </div>
        </div>
      </div>
    </section>
  );
};
