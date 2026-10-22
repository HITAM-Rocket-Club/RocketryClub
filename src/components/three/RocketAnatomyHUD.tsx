import React, { useState } from 'react';
import {
  Layers,
  Box,
  RotateCw,
  ChevronRight,
  ChevronLeft,
  Crosshair,
  Gauge,
} from 'lucide-react';
import { ROCKET_STAGES, type RocketStageInfo } from '../../types/rocketStages';
import { soundFx } from '../../utils/audio';

interface RocketAnatomyHUDProps {
  activeSection: string;
  scrollProgress: number;
  wireframe: boolean;
  exploded: boolean;
  autoRotate: boolean;
  onToggleWireframe: () => void;
  onToggleExploded: () => void;
  onToggleAutoRotate: () => void;
  onSelectStage: (sectionId: string) => void;
}

export const RocketAnatomyHUD: React.FC<RocketAnatomyHUDProps> = ({
  activeSection,
  scrollProgress,
  wireframe,
  exploded,
  autoRotate,
  onToggleWireframe,
  onToggleExploded,
  onToggleAutoRotate,
  onSelectStage,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  // Find currently active stage or fallback to stage 0
  const activeStage: RocketStageInfo =
    ROCKET_STAGES.find((s) => s.sectionId === activeSection) ||
    ROCKET_STAGES[Math.min(Math.floor(scrollProgress * ROCKET_STAGES.length), ROCKET_STAGES.length - 1)] ||
    ROCKET_STAGES[0];

  const currentAltMeters = Math.round(scrollProgress * 100000);
  const formattedAlt = currentAltMeters.toLocaleString('en-US').padStart(6, '0');
  const currentMach = (scrollProgress * 24.8).toFixed(1);

  return (
    <aside
      aria-label="3D Rocket Anatomy Telemetry"
      className="fixed right-2 sm:right-4 top-20 sm:top-24 z-30 flex flex-col items-end pointer-events-none select-none max-w-sm"
    >
      {/* 1. Vertical Miniature Rocket Stack Silhouette Mini-Map */}
      <div className="pointer-events-auto bg-[#0a0d14]/90 backdrop-blur-md border-2 border-[#00f0ff] p-2 mb-3 shadow-[0_0_20px_rgba(0,240,255,0.25)] flex flex-col items-center">
        <div className="font-pixel text-[7px] text-[#00f0ff] mb-2 tracking-wider uppercase border-b border-[#00f0ff]/40 pb-1 w-full text-center">
          3D STACK
        </div>

        <div className="flex flex-col gap-1 w-full">
          {ROCKET_STAGES.map((stage, idx) => {
            const isActive = stage.sectionId === activeStage.sectionId;
            return (
              <button
                key={stage.id}
                onClick={() => {
                  soundFx.playClick();
                  onSelectStage(stage.sectionId);
                }}
                title={`${stage.category} - ${stage.title}`}
                className={`group flex items-center justify-between gap-1.5 px-2 py-1 text-left transition-all border ${
                  isActive
                    ? 'bg-[#00f0ff] text-black border-white font-bold shadow-[0_0_10px_#00f0ff]'
                    : 'bg-black/60 text-white/60 border-white/20 hover:border-[#ffe600] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-black animate-ping' : 'bg-white/40'}`} />
                  <span className="font-pixel text-[8px] whitespace-nowrap">
                    0{idx} {stage.sectionId.toUpperCase().slice(0, 4)}
                  </span>
                </div>

                {/* Miniature stage block indicator */}
                <span
                  className={`w-2 h-2 border ${
                    isActive ? 'bg-[#ff007f] border-black' : 'bg-white/20 border-white/40'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Height indicator */}
        <div className="mt-2 pt-1 border-t border-white/20 w-full text-center font-pixel text-[7px] text-[#ffe600]">
          H: 38.5M
        </div>
      </div>

      {/* 2. Live CAD Telemetry Box, Scrolling Altitude Numbers & 3D Controls */}
      <div className="pointer-events-auto bg-[#080d14]/95 backdrop-blur-md border-2 border-[#ff007f] shadow-[0_0_20px_rgba(255,0,127,0.3)] w-72 sm:w-80">
        {/* Telemetry Header */}
        <div className="flex items-center justify-between px-3 py-2 border-b-2 border-[#ff007f] bg-[#140810]">
          <div className="flex items-center gap-2">
            <Crosshair className="w-3.5 h-3.5 text-[#00f0ff] animate-spin" style={{ animationDuration: '6s' }} />
            <span className="font-pixel text-[9px] text-[#ff007f] tracking-widest uppercase">
              ACTIVE CAD TELEMETRY
            </span>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              setCollapsed(!collapsed);
            }}
            className="text-white/60 hover:text-white transition-colors"
          >
            {collapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        {/* Compact Bar when collapsed */}
        {collapsed && (
          <div className="px-3 py-2 flex items-center justify-between font-pixel text-[8px] bg-black/80">
            <span className="text-[#ffe600]">ALT: {formattedAlt} M</span>
            <span className="text-[#00f0ff]">MACH {currentMach}</span>
          </div>
        )}

        {!collapsed && (
          <div className="p-3">
            {/* Active Part Designation */}
            <div className="mb-2">
              <span className="font-pixel text-[8px] text-[#ffe600] tracking-wider block">
                {activeStage.category}
              </span>
              <h4 className="font-pixel text-[11px] text-white leading-tight mt-0.5">
                {activeStage.title}
              </h4>
              <p className="font-mono-tech text-[10px] text-[#00f0ff] mt-0.5">
                {activeStage.subsystem}
              </p>
            </div>

            {/* Spec Sheet Grid */}
            <div className="grid grid-cols-2 gap-1.5 bg-black/80 border border-white/15 p-2 font-pixel text-[7px] mb-3">
              <div>
                <span className="text-white/40 block">ALTITUDE RANGE</span>
                <span className="text-[#00ff66]">{activeStage.altitudeRange}</span>
              </div>
              <div>
                <span className="text-white/40 block">SCALE</span>
                <span className="text-[#00f0ff]">{activeStage.dimensions}</span>
              </div>
              <div>
                <span className="text-white/40 block">DRY MASS</span>
                <span className="text-[#ffe600]">{activeStage.dryMass}</span>
              </div>
              <div>
                <span className="text-white/40 block">PRESSURE</span>
                <span className="text-[#ff3333] truncate block">{activeStage.pressureSpecs}</span>
              </div>
              <div className="col-span-2 pt-1 border-t border-white/10">
                <span className="text-white/40 block">MATERIALS</span>
                <span className="text-slate-300 font-mono-tech text-[9px]">{activeStage.materials}</span>
              </div>
            </div>

            {/* Live Scrolling Altitude & Velocity Telemetry Display (Fixes scrolling numbers) */}
            <div className="mb-3 p-2 bg-black border-2 border-[#ffe600] font-pixel text-[8px] space-y-1">
              <div className="flex items-center justify-between text-[#ffe600]">
                <div className="flex items-center gap-1.5">
                  <Gauge className="w-3.5 h-3.5 text-[#ffe600]" />
                  <span className="text-white/60 text-[7px]">LIVE ALTITUDE:</span>
                </div>
                <span className="text-[10px] font-bold tracking-wider text-[#ffe600]">
                  {formattedAlt} M
                </span>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[7px]">
                <span className="text-white/50">SPEED / TRAJECTORY:</span>
                <span className="text-[#00f0ff] font-bold">MACH {currentMach} // NOMINAL</span>
              </div>

              <div className="flex items-center justify-between text-[7px]">
                <span className="text-white/50">ACTIVE STAGE LOCK:</span>
                <span className="text-[#00ff66]">
                  0{activeStage.partIndex + 1} / 09 [ONLINE]
                </span>
              </div>
            </div>

            {/* 3D Model View Controls */}
            <div className="grid grid-cols-3 gap-1.5 font-pixel text-[8px]">
              {/* Wireframe toggle */}
              <button
                onClick={() => {
                  soundFx.playClick();
                  onToggleWireframe();
                }}
                className={`px-1.5 py-1.5 border flex flex-col items-center justify-center gap-1 transition-all ${
                  wireframe
                    ? 'bg-[#00f0ff] text-black border-white font-bold shadow-[0_0_8px_#00f0ff]'
                    : 'bg-black text-white border-white/30 hover:border-white'
                }`}
              >
                <Layers className="w-3 h-3" />
                <span>{wireframe ? 'SOLID' : 'WIRE'}</span>
              </button>

              {/* Exploded View toggle */}
              <button
                onClick={() => {
                  soundFx.playStart();
                  onToggleExploded();
                }}
                className={`px-1.5 py-1.5 border flex flex-col items-center justify-center gap-1 transition-all ${
                  exploded
                    ? 'bg-[#ff007f] text-white border-white font-bold shadow-[0_0_8px_#ff007f]'
                    : 'bg-black text-white border-white/30 hover:border-white'
                }`}
              >
                <Box className="w-3 h-3" />
                <span>{exploded ? 'ASSEMBLE' : 'EXPLODE'}</span>
              </button>

              {/* Turntable Auto-Rotate toggle */}
              <button
                onClick={() => {
                  soundFx.playClick();
                  onToggleAutoRotate();
                }}
                className={`px-1.5 py-1.5 border flex flex-col items-center justify-center gap-1 transition-all ${
                  autoRotate
                    ? 'bg-[#ffe600] text-black border-white font-bold shadow-[0_0_8px_#ffe600]'
                    : 'bg-black text-white border-white/30 hover:border-white'
                }`}
              >
                <RotateCw className="w-3 h-3" />
                <span>{autoRotate ? 'STOP' : 'SPIN'}</span>
              </button>
            </div>

            {/* Hint tag */}
            <div className="mt-2 text-center font-pixel text-[7px] text-white/40">
              ● DRAG 3D TO ROTATE // SCROLL TO TRACK STAGE
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
