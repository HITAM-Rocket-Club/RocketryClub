import React, { useState } from 'react';
import { Video, Wind, Thermometer, Sliders, ShieldCheck } from 'lucide-react';
import { soundFx } from '../../utils/audio';

export const LaunchPadStage: React.FC = () => {
  const [activeCam, setActiveCam] = useState<'PAD_01' | 'RAIL_02' | 'BASE_03'>('PAD_01');

  return (
    <section
      id="pad"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-24 border-t-4 border-[#00f0ff]/30 select-none"
    >
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        {/* Arcade Stage 1 Banner */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b-2 border-white/20">
          <div>
            <div className="font-pixel text-[10px] text-[#ff007f] mb-1 tracking-widest">
              ★ STAGE 01 // LAUNCH PAD DECK ★
            </div>
            <div className="inline-block bg-[#00f0ff]/15 border border-[#00f0ff] px-2 py-0.5 font-pixel text-[8px] text-[#00f0ff] mb-2">
              ● 3D BG: PART 02 // UPPER FAIRING & GANTRY UMBILICAL
            </div>
            <h2 className="font-pixel text-xl sm:text-3xl text-white tracking-wide">
              GANTRY RAIL & VEHICLE HULL
            </h2>
          </div>
          <div className="font-pixel text-[9px] text-[#ffe600] bg-black border-2 border-[#ffe600] px-3 py-1.5 self-start sm:self-auto">
            SECTOR: HITAM PAD-ALPHA
          </div>
        </div>

        {/* 8-bit Optical Monitor Bezel */}
        <div className="arcade-box-cyan p-6 sm:p-8 relative overflow-hidden mb-8">
          {/* Top Bezel Status */}
          <div className="flex items-center justify-between pb-4 border-b-2 border-[#00f0ff] mb-6 font-pixel text-[10px]">
            <div className="flex items-center gap-2 text-[#00ff66]">
              <span className="w-2.5 h-2.5 bg-[#00ff66] arcade-blink"></span>
              <span>CAM FEED: {activeCam} // 60 FPS</span>
            </div>

            {/* Camera Switches */}
            <div className="flex gap-2">
              {(['PAD_01', 'RAIL_02', 'BASE_03'] as const).map((cam) => (
                <button
                  key={cam}
                  onClick={() => {
                    soundFx.playClick();
                    setActiveCam(cam);
                  }}
                  className={`px-2.5 py-1 font-pixel text-[9px] border-2 transition-all ${
                    activeCam === cam
                      ? 'bg-[#ffe600] text-black border-white font-bold'
                      : 'bg-black text-white border-white/30 hover:border-white'
                  }`}
                >
                  <Video className="w-3 h-3 inline mr-1" />
                  {cam}
                </button>
              ))}
            </div>
          </div>

          {/* Central Stenciled Pixel Rocket Hull */}
          <div className="py-8 flex flex-col items-center justify-center text-center relative">
            <div className="arcade-box-yellow p-6 sm:p-8 max-w-lg w-full text-left relative">
              <div className="font-pixel text-[9px] text-[#ff007f] uppercase mb-1">
                STENCILED VEHICLE SERIAL // 001
              </div>
              <h3 className="font-pixel text-lg sm:text-2xl text-white mb-2 tracking-wider">
                HRC // ASTRA-01
              </h3>
              <p className="font-mono-tech text-xs text-slate-300 mb-6 uppercase">
                HITAM ROCKETRY CLUB // RESEARCH VEHICLE // HYDERABAD
              </p>

              {/* 8-bit Specs Table */}
              <div className="grid grid-cols-2 gap-3 bg-black p-4 border-2 border-white/20 font-pixel text-[9px] mb-4">
                <div>
                  <span className="text-white/50 block text-[8px]">LENGTH</span>
                  <span className="text-[#00f0ff]">2,150 mm</span>
                </div>
                <div>
                  <span className="text-white/50 block text-[8px]">DIAMETER</span>
                  <span className="text-[#00f0ff]">76 mm (3.0")</span>
                </div>
                <div>
                  <span className="text-white/50 block text-[8px]">MOTOR</span>
                  <span className="text-[#ffe600]">CESARONI K</span>
                </div>
                <div>
                  <span className="text-white/50 block text-[8px]">DRY MASS</span>
                  <span className="text-[#00ff66]">3.40 KG</span>
                </div>
              </div>

              <div className="font-pixel text-[8px] text-[#ff3333] border border-[#ff3333] p-2 bg-[#ff3333]/10 flex justify-between">
                <span>▲ CAUTION: EXPLOSIVE BOLTS</span>
                <span>NO STEP</span>
              </div>
            </div>
          </div>

          {/* Environmental Telemetry */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t-2 border-[#00f0ff] font-pixel text-[9px]">
            <div className="bg-black p-3 border border-white/10 flex items-center gap-2">
              <Wind className="w-4 h-4 text-[#00f0ff]" />
              <div>
                <span className="text-white/50 block text-[8px]">WIND</span>
                <span className="text-white">4.2 KTS</span>
              </div>
            </div>
            <div className="bg-black p-3 border border-white/10 flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-[#ffe600]" />
              <div>
                <span className="text-white/50 block text-[8px]">PAD TEMP</span>
                <span className="text-white">28.4°C</span>
              </div>
            </div>
            <div className="bg-black p-3 border border-white/10 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#00ff66]" />
              <div>
                <span className="text-white/50 block text-[8px]">RAIL ANGLE</span>
                <span className="text-white">84.0° ELEV</span>
              </div>
            </div>
            <div className="bg-black p-3 border border-white/10 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#ff007f]" />
              <div>
                <span className="text-white/50 block text-[8px]">UMBILICAL</span>
                <span className="text-[#00ff66]">ONLINE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
