import React, { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { ROCKET_BUILDS } from '../../data/rocketryData';
import type { RocketBuild } from '../../types';
import { soundFx } from '../../utils/audio';

export const StratosphereBuilds: React.FC = () => {
  const [selectedBuild, setSelectedBuild] = useState<RocketBuild | null>(null);

  return (
    <section
      id="builds"
      className="relative min-h-screen flex flex-col justify-center px-4 py-24 border-t-4 border-[#00f0ff]/30 select-none"
    >
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Stage 5 Arcade Banner */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b-2 border-white/20">
          <div>
            <div className="font-pixel text-[10px] text-[#00f0ff] mb-1 tracking-widest">
              ★ STAGE 05 // STRATOSPHERE (12,000m - 50,000m) ★
            </div>
            <div className="inline-block bg-[#ffe600]/15 border border-[#ffe600] px-2 py-0.5 font-pixel text-[8px] text-[#ffe600] mb-2">
              ● 3D BG: PART 06 // CORE BOOSTER FUSELAGE & CABLE RACEWAY
            </div>
            <h2 className="font-pixel text-xl sm:text-3xl text-white tracking-wide">
              ROCKET FLEET & HARDWARE
            </h2>
          </div>
          <div className="font-pixel text-[9px] text-[#ffe600] bg-black border-2 border-[#ffe600] px-3 py-1.5 self-start sm:self-auto">
            CATALOG: 4 ACTIVE VEHICLES
          </div>
        </div>

        {/* 8-bit Rocket Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ROCKET_BUILDS.map((build) => (
            <div
              key={build.id}
              className="arcade-box-cyan p-6 flex flex-col justify-between group hover:border-[#ffe600] transition-colors"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b-2 border-[#00f0ff] mb-4 font-pixel text-[9px]">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🚀</span>
                    <span className="text-white font-bold">{build.designation}</span>
                  </div>
                  <span className="px-2 py-0.5 bg-black border border-white/20 text-[#00ff66]">
                    {build.stage}
                  </span>
                </div>

                <h3 className="font-pixel text-base sm:text-lg text-white mb-1">
                  {build.name}
                </h3>
                <div className="font-pixel text-[9px] text-[#ffe600] mb-4">
                  {build.class}
                </div>

                <p className="font-mono-tech text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed">
                  {build.description}
                </p>

                {/* 8-bit Specs Grid */}
                <div className="grid grid-cols-2 gap-2 bg-black p-3 border-2 border-white/10 font-pixel text-[8px] mb-5">
                  <div>
                    <span className="text-white/50 block">APOGEE</span>
                    <span className="text-[#00ff66]">{build.targetApogee}</span>
                  </div>
                  <div>
                    <span className="text-white/50 block">MOTOR</span>
                    <span className="text-white truncate block">{build.motorType}</span>
                  </div>
                  <div>
                    <span className="text-white/50 block">DIMENSIONS</span>
                    <span className="text-[#00f0ff]">{build.length} × {build.diameter}</span>
                  </div>
                  <div>
                    <span className="text-white/50 block">RECOVERY</span>
                    <span className="text-[#ff007f] truncate block">{build.recovery}</span>
                  </div>
                </div>

                {/* Highlights */}
                <ul className="space-y-1.5 mb-5 font-mono-tech text-xs text-slate-300">
                  {build.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#ffe600] font-pixel text-[9px]">►</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  soundFx.playClick();
                  setSelectedBuild(build);
                }}
                className="arcade-btn arcade-btn-yellow w-full py-2.5 text-[9px] flex items-center justify-center gap-2"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>INSPECT FLIGHT SPECIFICATION</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 8-bit Modal */}
      {selectedBuild && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none">
          <div className="arcade-box-yellow p-6 sm:p-8 max-w-2xl w-full relative">
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#ffe600] mb-6">
              <div>
                <span className="font-pixel text-[9px] text-[#ff007f] block mb-1">
                  CAD SCHEMATIC // {selectedBuild.designation}
                </span>
                <h3 className="font-pixel text-lg sm:text-xl text-white">
                  {selectedBuild.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBuild(null)}
                className="font-pixel text-xs text-white hover:text-[#ff3333] p-2"
              >
                [X]
              </button>
            </div>

            <div className="space-y-4 font-pixel text-[9px]">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <div className="bg-black p-2.5 border border-white/20">
                  <span className="text-white/50 block text-[7px]">LENGTH</span>
                  <span className="text-white text-xs">{selectedBuild.length}</span>
                </div>
                <div className="bg-black p-2.5 border border-white/20">
                  <span className="text-white/50 block text-[7px]">DIAMETER</span>
                  <span className="text-white text-xs">{selectedBuild.diameter}</span>
                </div>
                <div className="bg-black p-2.5 border border-white/20">
                  <span className="text-white/50 block text-[7px]">DRY MASS</span>
                  <span className="text-white text-xs">{selectedBuild.dryMass}</span>
                </div>
                <div className="bg-black p-2.5 border border-white/20">
                  <span className="text-white/50 block text-[7px]">PROPELLANT</span>
                  <span className="text-[#ffe600] text-xs">{selectedBuild.propellant}</span>
                </div>
                <div className="bg-black p-2.5 border border-white/20">
                  <span className="text-white/50 block text-[7px]">RF LINK</span>
                  <span className="text-[#00f0ff] text-xs">{selectedBuild.telemetryBand}</span>
                </div>
                <div className="bg-black p-2.5 border border-white/20">
                  <span className="text-white/50 block text-[7px]">APOGEE</span>
                  <span className="text-[#00ff66] text-xs">{selectedBuild.targetApogee}</span>
                </div>
              </div>

              <div className="bg-black p-3 border border-white/20">
                <span className="text-[#ffe600] block mb-1">RECOVERY SYSTEM:</span>
                <p className="font-mono-tech text-xs text-slate-300">{selectedBuild.recovery}</p>
              </div>

              <div className="bg-black p-3 border border-white/20">
                <span className="text-[#00f0ff] block mb-1">TELEMETRY & AVIONICS:</span>
                <p className="font-mono-tech text-xs text-slate-300">
                  Redundant barometric deployment with dual SPI flash storage. 250 Hz attitude telemetry relayed down to ground station Yagi array.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t-2 border-[#ffe600] flex justify-end">
              <button
                onClick={() => setSelectedBuild(null)}
                className="arcade-btn py-2 px-4 text-[9px]"
              >
                DISMISS
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
