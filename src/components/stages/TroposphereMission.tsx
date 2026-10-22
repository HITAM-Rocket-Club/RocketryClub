import React, { useState } from 'react';
import {
  Target,
  Layers,
  ArrowUpRight,
  Flame,
  Compass,
  Cpu,
  Shield,
  Activity,
  Rocket,
  CheckCircle2,
  Wrench,
  BookOpen,
  Award,
  Radio,
} from 'lucide-react';
import {
  SUB_TEAMS,
  CLUB_METADATA,
  CLUB_PILLARS,
  FLIGHT_LIFECYCLE_STEPS,
} from '../../data/rocketryData';
import { soundFx } from '../../utils/audio';

type MissionViewTab = 'pillars' | 'subteams' | 'lifecycle';

export const TroposphereMission: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MissionViewTab>('pillars');
  const [activeTeamId, setActiveTeamId] = useState(SUB_TEAMS[0].id);

  const selectedTeam = SUB_TEAMS.find((t) => t.id === activeTeamId) || SUB_TEAMS[0];

  const getSubteamIcon = (id: string) => {
    switch (id) {
      case 'propulsion':
        return <Flame className="w-4 h-4 text-[#ff3333]" />;
      case 'aerodynamics':
        return <Compass className="w-4 h-4 text-[#00f0ff]" />;
      case 'avionics':
        return <Cpu className="w-4 h-4 text-[#00ff66]" />;
      case 'structures':
        return <Shield className="w-4 h-4 text-[#ffe600]" />;
      case 'payload':
        return <Activity className="w-4 h-4 text-[#ff007f]" />;
      default:
        return <Layers className="w-4 h-4 text-white" />;
    }
  };

  const getPillarIcon = (id: string) => {
    switch (id) {
      case 'sounding_rockets':
        return <Rocket className="w-5 h-5 text-[#00f0ff]" />;
      case 'propulsion_testing':
        return <Flame className="w-5 h-5 text-[#ff3333]" />;
      case 'flight_avionics':
        return <Radio className="w-5 h-5 text-[#00ff66]" />;
      case 'competitions_payloads':
        return <Award className="w-5 h-5 text-[#ffe600]" />;
      default:
        return <Wrench className="w-5 h-5 text-white" />;
    }
  };

  return (
    <section
      id="mission"
      className="relative min-h-screen flex flex-col justify-center px-4 py-24 border-t-4 border-[#00ff66]/30 select-none"
    >
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Stage 4 Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b-2 border-white/20">
          <div>
            <div className="font-pixel text-[10px] text-[#ffe600] mb-1 tracking-widest">
              ★ STAGE 04 // TROPOSPHERE (0 - 12,000m) ★
            </div>
            <div className="inline-block bg-[#00f0ff]/15 border border-[#00f0ff] px-2 py-0.5 font-pixel text-[8px] text-[#00f0ff] mb-2">
              ● 3D BG: PART 05 // STAGE-2 UPPER PROPULSION & CRYOGENIC LOX TANK
            </div>
            <h2 className="font-pixel text-xl sm:text-3xl text-white tracking-wide">
              WHAT THE CLUB DOES // MISSION & OPERATIONS
            </h2>
          </div>
          <div className="font-pixel text-[9px] text-[#00ff66] bg-black border-2 border-[#00ff66] px-3 py-1.5 self-start sm:self-auto">
            STATUS: ACTIVE FLIGHT LAB
          </div>
        </div>

        {/* 1. Core Club Executive Summary Card */}
        <div className="arcade-box-cyan p-6 sm:p-8 mb-8">
          <div className="flex items-center gap-2 font-pixel text-[10px] text-[#ffe600] mb-3">
            <Target className="w-4 h-4" />
            <span>HITAM ROCKETRY CLUB // EXECUTIVE OVERVIEW</span>
          </div>

          <h3 className="font-pixel text-base sm:text-xl text-white mb-3">
            EXPLORING AEROSPACE THROUGH HANDS-ON SOUNDING ROCKETRY
          </h3>

          <p className="font-mono-tech text-sm sm:text-base text-slate-200 leading-relaxed mb-4">
            {CLUB_METADATA.extendedOverview}
          </p>

          <p className="font-mono-tech text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 border-l-2 border-[#ffe600] pl-3 py-1 bg-black/40">
            <strong className="text-[#ffe600]">OUR CORE DIRECTIVE:</strong> We don't just study theoretical aerospace equations—we machine bulkheads, cast and static-test rocket motors, solder flight computer PCBs, simulate supersonic aerodynamics, and field-launch real sounding rockets to apogee.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t-2 border-[#00f0ff] font-pixel text-[9px]">
            <div>
              <span className="text-white/50 block text-[8px]">HQ FACILITY</span>
              <span className="text-white">{CLUB_METADATA.missionControlRoom}</span>
            </div>
            <div>
              <span className="text-white/50 block text-[8px]">ACTIVE CADETS</span>
              <span className="text-[#00ff66]">25+ RESEARCHERS</span>
            </div>
            <div>
              <span className="text-white/50 block text-[8px]">ORGANIZATION</span>
              <span className="text-[#ffe600]">HITAM HYDERABAD</span>
            </div>
            <div>
              <span className="text-white/50 block text-[8px]">TARGET LAUNCH</span>
              <span className="text-[#ff007f]">{CLUB_METADATA.launchTargetDisplay}</span>
            </div>
          </div>
        </div>

        {/* 2. Navigation Tabs between Pillars, Sub-teams, and Flight Lifecycle */}
        <div className="grid grid-cols-3 gap-2 mb-8 font-pixel text-[8px] sm:text-[10px]">
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('pillars');
            }}
            className={`py-2.5 px-2 border-2 transition-all flex items-center justify-center gap-1.5 text-center ${
              activeTab === 'pillars'
                ? 'bg-[#00f0ff] text-black font-bold border-white shadow-[0_0_12px_#00f0ff]'
                : 'bg-black/75 text-white/70 border-white/20 hover:border-white hover:text-white'
            }`}
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>01 // WHAT WE DO (4 PILLARS)</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('subteams');
            }}
            className={`py-2.5 px-2 border-2 transition-all flex items-center justify-center gap-1.5 text-center ${
              activeTab === 'subteams'
                ? 'bg-[#ffe600] text-black font-bold border-white shadow-[0_0_12px_#ffe600]'
                : 'bg-black/75 text-white/70 border-white/20 hover:border-white hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>02 // 5 SUB-TEAMS</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('lifecycle');
            }}
            className={`py-2.5 px-2 border-2 transition-all flex items-center justify-center gap-1.5 text-center ${
              activeTab === 'lifecycle'
                ? 'bg-[#ff007f] text-black font-bold border-white shadow-[0_0_12px_#ff007f]'
                : 'bg-black/75 text-white/70 border-white/20 hover:border-white hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>03 // FLIGHT LIFECYCLE</span>
          </button>
        </div>

        {/* TAB 1: WHAT WE DO (4 CORE OPERATIONAL PILLARS) */}
        {activeTab === 'pillars' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CLUB_PILLARS.map((pillar) => (
                <div
                  key={pillar.id}
                  className="bg-black/85 border-2 p-6 flex flex-col justify-between shadow-lg"
                  style={{ borderColor: pillar.badgeColor }}
                >
                  <div>
                    {/* Header with Icon & Code */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/20 mb-4">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-black border border-white/20">
                          {getPillarIcon(pillar.id)}
                        </div>
                        <div>
                          <span
                            className="font-pixel text-[8px] px-1.5 py-0.5 border"
                            style={{ color: pillar.badgeColor, borderColor: pillar.badgeColor }}
                          >
                            {pillar.code}
                          </span>
                          <h4 className="font-pixel text-xs sm:text-sm text-white mt-1">
                            {pillar.title}
                          </h4>
                        </div>
                      </div>
                    </div>

                    <p className="font-mono-tech text-xs sm:text-sm text-[#00f0ff] font-semibold mb-3">
                      {pillar.summary}
                    </p>

                    {/* What We Do bullet list */}
                    <div className="mb-4">
                      <span className="font-pixel text-[8px] text-white/50 block mb-2 tracking-wider">
                        KEY ACTIVITIES & WORKFLOW:
                      </span>
                      <ul className="space-y-2 font-mono-tech text-xs text-slate-300">
                        {pillar.whatWeDo.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#ffe600] mt-0.5 text-xs">▶</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Deliverable Callout Box */}
                  <div className="mt-4 pt-3 border-t border-white/15 bg-black/60 p-2.5">
                    <span className="font-pixel text-[7px] text-white/50 block mb-1">
                      KEY DELIVERABLE:
                    </span>
                    <span className="font-mono-tech text-xs text-[#00ff66] font-semibold">
                      {pillar.deliverables}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Student Eligibility & Workshops Callout */}
            <div className="bg-[#10141f] border-2 border-[#ffe600] p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-[#ffe600] shrink-0 mt-1" />
                <div>
                  <h4 className="font-pixel text-xs text-[#ffe600] tracking-wider mb-1">
                    STUDENT ELIGIBILITY & NO-EXPERIENCE TRAINING
                  </h4>
                  <p className="font-mono-tech text-xs text-slate-200 leading-relaxed">
                    {CLUB_METADATA.eligibility}
                  </p>
                </div>
              </div>
              <a
                href="#join"
                onClick={() => soundFx.playClick()}
                className="arcade-btn arcade-btn-yellow py-2 px-4 font-pixel text-[9px] shrink-0 whitespace-nowrap"
              >
                APPLY TO JOIN SQUADRON
              </a>
            </div>
          </div>
        )}

        {/* TAB 2: SPECIALIZED SUB-TEAMS */}
        {activeTab === 'subteams' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sub-team Selector */}
            <div className="lg:col-span-4 flex flex-col gap-2 font-pixel text-[9px]">
              <div className="text-white/60 px-1 py-1 tracking-wider uppercase">
                SELECT SQUADRON:
              </div>
              {SUB_TEAMS.map((team) => {
                const isActive = activeTeamId === team.id;
                return (
                  <button
                    key={team.id}
                    onClick={() => {
                      soundFx.playClick();
                      setActiveTeamId(team.id);
                    }}
                    className={`flex items-center justify-between p-3 border-2 transition-all text-left ${
                      isActive
                        ? 'bg-[#ffe600] text-black border-white shadow-[0_0_12px_#ffe600]'
                        : 'bg-black/80 text-white/70 border-white/20 hover:border-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {getSubteamIcon(team.id)}
                      <div>
                        <div className="text-[10px] leading-tight font-bold">{team.name}</div>
                        <div className="text-[8px] opacity-70 mt-0.5">{team.code}</div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                  </button>
                );
              })}
            </div>

            {/* Sub-team Spec Card */}
            <div className="lg:col-span-8 arcade-box-magenta p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b-2 border-[#ff007f] mb-4 font-pixel text-[9px]">
                  <span className="text-[#ffe600]">
                    [{selectedTeam.code}] // {selectedTeam.lead}
                  </span>
                  <span className="text-[#00ff66]">● RESEARCH ACTIVE</span>
                </div>

                <h3 className="font-pixel text-lg sm:text-xl text-white mb-3">
                  {selectedTeam.name}
                </h3>

                <p className="font-mono-tech text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                  {selectedTeam.focus}
                </p>

                <div className="bg-black p-4 border-2 border-white/20 mb-6">
                  <span className="font-pixel text-[9px] text-[#ffe600] block mb-1">
                    CURRENT RESEARCH BENCHMARK:
                  </span>
                  <p className="font-mono-tech text-xs text-slate-300">
                    {selectedTeam.currentResearch}
                  </p>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <span className="font-pixel text-[8px] text-white/50 block mb-2">
                    TOOLCHAIN & ENGINEERING SKILLS:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedTeam.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-black border border-white/20 font-pixel text-[8px] text-[#00f0ff]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Spec Matrix */}
              <div className="grid grid-cols-3 gap-2.5 pt-4 border-t-2 border-[#ff007f] font-pixel text-[9px]">
                {selectedTeam.specs.map((s) => (
                  <div key={s.label} className="bg-black p-2.5 border border-white/10">
                    <span className="text-white/50 block text-[7px]">{s.label}</span>
                    <span className="text-white font-bold text-[9px] mt-0.5 block">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: 4-PHASE FLIGHT LIFECYCLE */}
        {activeTab === 'lifecycle' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {FLIGHT_LIFECYCLE_STEPS.map((stage) => (
                <div
                  key={stage.step}
                  className="bg-black/85 border-2 p-5 flex flex-col justify-between"
                  style={{ borderColor: stage.color }}
                >
                  <div>
                    <div className="flex items-center justify-between pb-2 border-b border-white/20 mb-3">
                      <span
                        className="font-pixel text-lg font-bold"
                        style={{ color: stage.color }}
                      >
                        {stage.step}
                      </span>
                      <span
                        className="font-pixel text-[7px] px-1.5 py-0.5 border"
                        style={{ color: stage.color, borderColor: stage.color }}
                      >
                        {stage.tag}
                      </span>
                    </div>

                    <div className="font-pixel text-[8px] text-white/50 mb-1">
                      {stage.phase}
                    </div>

                    <h4 className="font-pixel text-xs text-white mb-3">
                      {stage.title}
                    </h4>

                    <p className="font-mono-tech text-xs text-slate-300 leading-relaxed">
                      {stage.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1.5 text-[#00ff66] font-pixel text-[7px]">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>FLIGHT STANDARD VERIFIED</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Safety & Standards Note */}
            <div className="bg-black border border-white/20 p-4 font-mono-tech text-xs text-slate-300 flex items-center justify-between gap-4">
              <span>
                <strong className="text-[#00f0ff] font-pixel text-[9px]">RANGE SAFETY PROTOCOL: </strong>
                All motor tests and sounding launches adhere strictly to Tripoli Rocketry Association (TRA) High Power Safety Codes and local DGCA/air traffic clearance.
              </span>
              <span className="font-pixel text-[8px] text-[#ffe600] shrink-0 border border-[#ffe600] px-2 py-1">
                SAFETY LEVEL: 100%
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
