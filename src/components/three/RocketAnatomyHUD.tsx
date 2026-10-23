import React, { useState } from 'react';
import {
  Layers,
  RotateCw,
  Compass,
  Sparkles,
  ChevronUp,
  ChevronDown,
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
  onSelectStage?: (sectionId: string) => void;
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
}) => {
  const [expanded, setExpanded] = useState(false);

  // Find currently active stage or fallback to stage 0
  const activeStage: RocketStageInfo =
    ROCKET_STAGES.find((s) => s.sectionId === activeSection) ||
    ROCKET_STAGES[Math.min(Math.floor(scrollProgress * ROCKET_STAGES.length), ROCKET_STAGES.length - 1)] ||
    ROCKET_STAGES[0];

  return (
    <aside
      aria-label="3D Rocket Controls"
      className="fixed bottom-4 right-4 z-40 flex flex-col items-end pointer-events-none select-none max-w-sm"
    >
      {/* Expanded Detail Card - Retro Telemetry HUD */}
      {expanded && (
        <div className="pointer-events-auto bg-[#070a12] border-2 border-[#00f0ff] rounded-none p-3.5 mb-2 shadow-[5px_5px_0px_#000000] w-64 text-left animate-in fade-in">
          <div className="flex items-center justify-between border-b-2 border-white/10 pb-2 mb-2">
            <span className="font-pixel text-[8px] text-[#00f0ff] uppercase">{activeStage.category}</span>
            <span className="font-mono-tech text-[#00ff66] text-[10px] font-bold">HITAM // 3D CAD</span>
          </div>

          <h4 className="font-pixel text-[10px] text-white mb-1.5 leading-snug">
            {activeStage.title}
          </h4>

          <p className="font-mono-tech text-[11px] text-slate-300 mb-2.5 leading-relaxed">
            {activeStage.subsystem}
          </p>

          <div className="space-y-1 font-mono-tech text-[10px] bg-black p-2 border border-white/20 text-white/80 shadow-[2px_2px_0px_#000000]">
            <div className="flex justify-between">
              <span className="text-white/50">Materials:</span>
              <span className="text-white font-semibold">{activeStage.materials.split(',')[0]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Dry Mass:</span>
              <span className="text-[#00ff66] font-bold">{activeStage.dryMass}</span>
            </div>
          </div>
        </div>
      )}

      {/* Retro Hardware 3D Switchboard Dock */}
      <div className="pointer-events-auto bg-[#070a12] border-2 border-white/30 rounded-none p-1.5 flex items-center gap-1.5 shadow-[4px_4px_0px_#000000]">
        {/* Wireframe Toggle */}
        <button
          onClick={() => {
            soundFx.playToggle();
            onToggleWireframe();
          }}
          className={`p-2 rounded-none border transition-all cursor-pointer ${
            wireframe
              ? 'bg-[#00f0ff] text-black font-bold border-white shadow-[2px_2px_0px_#000000]'
              : 'border-white/20 bg-black text-white/70 hover:text-white hover:border-white/50'
          }`}
          title={wireframe ? 'Disable Wireframe' : 'Enable 3D Wireframe'}
        >
          <Layers className="w-3.5 h-3.5" />
        </button>

        {/* Exploded View Toggle */}
        <button
          onClick={() => {
            soundFx.playToggle();
            onToggleExploded();
          }}
          className={`p-2 rounded-none border transition-all cursor-pointer ${
            exploded
              ? 'bg-[#ff007f] text-white font-bold border-white shadow-[2px_2px_0px_#000000]'
              : 'border-white/20 bg-black text-white/70 hover:text-white hover:border-white/50'
          }`}
          title={exploded ? 'Assemble Stages' : 'Explode 3D Stages'}
        >
          <Compass className="w-3.5 h-3.5" />
        </button>

        {/* Auto-Rotate Toggle */}
        <button
          onClick={() => {
            soundFx.playToggle();
            onToggleAutoRotate();
          }}
          className={`p-2 rounded-none border transition-all cursor-pointer ${
            autoRotate
              ? 'bg-[#00ff66] text-black font-bold border-white shadow-[2px_2px_0px_#000000]'
              : 'border-white/20 bg-black text-white/70 hover:text-white hover:border-white/50'
          }`}
          title={autoRotate ? 'Stop Rotation' : 'Auto-Rotate 3D Rocket'}
        >
          <RotateCw className="w-3.5 h-3.5" />
        </button>

        <div className="w-[1px] h-4 bg-white/20 mx-0.5" />

        {/* Toggle Telemetry Info */}
        <button
          onClick={() => {
            soundFx.playClick();
            setExpanded(!expanded);
          }}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-none border border-white/20 bg-black text-[9px] font-pixel text-[#ffe600] hover:border-[#ffe600] transition-colors cursor-pointer"
        >
          <Sparkles className="w-3 h-3 text-[#ffe600]" />
          <span className="hidden sm:inline">STAGE_INFO</span>
          {expanded ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
        </button>
      </div>
    </aside>
  );
};

export default RocketAnatomyHUD;
