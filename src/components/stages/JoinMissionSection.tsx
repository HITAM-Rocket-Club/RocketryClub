import React, { useState } from 'react';
import { ArrowRight, ExternalLink, Copy, Check, FileText } from 'lucide-react';
import { soundFx } from '../../utils/audio';
import { AsciiGlitchRipple } from '../ui/ascii-glitch-ripple';
import { CLUB_METADATA } from '../../data/rocketryData';

interface JoinMissionSectionProps {
  onOpenArcade: () => void;
}

export const JoinMissionSection: React.FC<JoinMissionSectionProps> = ({ onOpenArcade }) => {
  const [copied, setCopied] = useState(false);
  const formUrl =
    CLUB_METADATA.registrationFormUrl ||
    'https://docs.google.com/forms/d/e/1FAIpQLSfTJdrssSSHRGgdXaueSd9zokNZIBEMoKkJE11rDCNyNagxIg/viewform?usp=publish-editor';

  const handleCopyUrl = () => {
    try {
      soundFx.playClick();
    } catch {}
    navigator.clipboard.writeText(formUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="join"
      className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 py-20 select-none"
    >
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-black border-2 border-[#00ff66] px-3.5 py-1 rounded-none mb-3 shadow-[2px_2px_0px_#000000]">
            <span className="w-2.5 h-2.5 bg-[#00ff66] arcade-blink" />
            <span className="font-pixel text-[8px] text-[#00ff66] uppercase tracking-wider">
              CADET ENLISTMENT // STAGE 05 · PRE-LAUNCH INTAKE
            </span>
          </div>
          <h2 className="font-pixel text-xl sm:text-3xl text-white tracking-wider mb-2">
            <AsciiGlitchRipple as="span" className="hover:text-[#00ff66] transition-colors">
              THE FUTURE STARTS HERE
            </AsciiGlitchRipple>
          </h2>
          <div className="mb-3">
            <AsciiGlitchRipple as="p" className="font-pixel text-xs sm:text-sm text-[#00f0ff] tracking-wide inline-block hover:text-white transition-colors">
              ★ HITAM ROCKETRY CLUB · FROM IDEAS TO FLIGHT ★
            </AsciiGlitchRipple>
          </div>
          <div className="font-mono-tech text-xs sm:text-sm text-slate-300 leading-relaxed bg-black/70 border border-white/20 p-4 max-w-2xl mx-auto shadow-[3px_3px_0px_#000000] text-left">
            <span className="text-[#00ff66] font-bold">&gt; FOUNDING INVITATION:</span> &ldquo;We are not just creating a club. We are creating a platform where students from different branches come together to design, build, test and innovate.&rdquo;
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Directives & Value */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-[#070a12] border-2 border-white/20 rounded-none p-5 sm:p-6 shadow-[5px_5px_0px_#000000]">
              <div className="font-pixel text-[8px] text-[#ffe600] uppercase mb-1 tracking-wider">
                INAUGURAL COHORT INTAKE
              </div>
              <h3 className="font-pixel text-xs sm:text-sm text-white mb-2">
                JOIN THE PLATFORM
              </h3>
              <p className="font-mono-tech text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed bg-black/40 p-2.5 border border-white/10">
                Open to all undergraduate students across all engineering branches at HITAM. No prior rocketry background is required—Phase 1 starts with hands-on foundational workshops and CAD simulations.
              </p>

              <div className="space-y-2.5 font-mono-tech text-xs text-slate-200">
                <div className="flex items-start gap-2">
                  <span className="text-[#00ff66] font-bold shrink-0">■</span>
                  <span><strong>Mechanical:</strong> Structures, aerodynamics, CAD, materials, fabrication</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#00ff66] font-bold shrink-0">■</span>
                  <span><strong>ECE:</strong> Sensors, avionics, telemetry, embedded systems</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#00ff66] font-bold shrink-0">■</span>
                  <span><strong>EEE:</strong> Power systems, electrical integration, instrumentation</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#00ff66] font-bold shrink-0">■</span>
                  <span><strong>CSE / IT:</strong> Flight-data software, simulation, dashboards, ground software</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#00ff66] font-bold shrink-0">■</span>
                  <span><strong>AI / DS:</strong> Data analysis, trajectory modelling, sensor-data processing</span>
                </div>
              </div>
            </div>

            {/* Slide 8 Speaker note quote box */}
            <div className="bg-black border-2 border-[#ffe600] rounded-none p-4 shadow-[3px_3px_0px_#000000]">
              <span className="font-pixel text-[8px] text-[#ffe600] block mb-1 uppercase">
                &gt; OFFICIAL CALL TO ACTION
              </span>
              <p className="font-mono-tech text-xs text-slate-300 leading-relaxed italic">
                &ldquo;Back the platform, join the work, and help HITAM build responsibly. Students learning by doing, collaborating across disciplines, and representing HITAM through meaningful engineering projects.&rdquo;
              </p>
            </div>

            {/* Quick Mini-game teaser */}
            <div className="bg-black border-2 border-[#00f0ff] rounded-none p-4 flex items-center justify-between shadow-[3px_3px_0px_#000000]">
              <div>
                <span className="font-pixel text-[8px] text-[#00f0ff] block mb-0.5">
                  FLIGHT SIMULATOR
                </span>
                <span className="font-mono-tech text-xs text-white">Asteroid Vector Arcade</span>
              </div>
              <button
                onClick={onOpenArcade}
                className="px-3.5 py-2 rounded-none bg-[#00f0ff] hover:bg-[#33f3ff] text-black font-pixel text-[8px] flex items-center gap-1.5 transition-transform cursor-pointer border border-white shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5"
              >
                <span>LAUNCH</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Right Column: Official Google Registration Form Terminal */}
          <div className="lg:col-span-7">
            <div className="bg-[#070a12] border-2 border-white/20 rounded-none p-5 sm:p-7 shadow-[6px_6px_0px_#000000] flex flex-col justify-between">
              <div>
                {/* Header Status Bar */}
                <div className="flex items-center justify-between pb-3 border-b-2 border-white/10 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-[#00ff66] arcade-blink" />
                    <span className="font-pixel text-[8px] text-[#00ff66] uppercase tracking-wider">
                      OFFICIAL INTAKE // LIVE PORTAL
                    </span>
                  </div>
                  <span className="font-mono-tech text-[10px] text-white/50">
                    PLATFORM: GOOGLE FORMS
                  </span>
                </div>

                {/* Logo & Form Announcement */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6 bg-black/70 p-4 border border-white/15 shadow-[3px_3px_0px_#000000]">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white border-2 border-[#00f0ff] p-1 shadow-[3px_3px_0px_#000000] shrink-0 flex items-center justify-center">
                    <img
                      src="/logo.png"
                      alt="HITAM Rocketry Club Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-center sm:text-left">
                    <span className="font-pixel text-[8px] text-[#ffe600] uppercase tracking-wider block mb-1">
                      GENESIS RECRUITMENT DRIVE
                    </span>
                    <h3 className="font-pixel text-sm sm:text-base text-white leading-tight mb-1.5">
                      OFFICIAL CADET REGISTRATION
                    </h3>
                    <p className="font-mono-tech text-xs text-slate-300 leading-relaxed">
                      Register to join the founding cohort of the HITAM Rocketry Club. All applications are officially processed through the central university club enrollment form.
                    </p>
                  </div>
                </div>

                {/* Specs / Checklist */}
                <div className="space-y-2.5 mb-6 font-mono-tech text-xs">
                  <div className="bg-black/50 p-2.5 border border-white/10 flex items-start gap-2.5">
                    <span className="font-pixel text-[8px] text-[#00f0ff] bg-black px-1.5 py-0.5 border border-[#00f0ff]/40 shrink-0">
                      01
                    </span>
                    <span className="text-slate-300">
                      <strong className="text-white">Open to all departments:</strong> Mechanical, ECE, EEE, CSE, IT, AI/DS &amp; allied engineering disciplines.
                    </span>
                  </div>
                  <div className="bg-black/50 p-2.5 border border-white/10 flex items-start gap-2.5">
                    <span className="font-pixel text-[8px] text-[#ffe600] bg-black px-1.5 py-0.5 border border-[#ffe600]/40 shrink-0">
                      02
                    </span>
                    <span className="text-slate-300">
                      <strong className="text-white">Zero prior rocketry experience needed:</strong> Phase 1 includes hands-on CAD workshops, aerodynamics, and simulation fundamentals.
                    </span>
                  </div>
                  <div className="bg-black/50 p-2.5 border border-white/10 flex items-start gap-2.5">
                    <span className="font-pixel text-[8px] text-[#00ff66] bg-black px-1.5 py-0.5 border border-[#00ff66]/40 shrink-0">
                      03
                    </span>
                    <span className="text-slate-300">
                      <strong className="text-white">Direct cohort notifications:</strong> Receive orientation dates, workshop schedules, and team induction details directly via email/phone.
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <a
                  href={formUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-crosshair-target
                  onClick={() => {
                    try { soundFx.playCoin(); } catch {}
                  }}
                  onMouseEnter={() => {
                    try { soundFx.playBlip(950, 0.02); } catch {}
                  }}
                  className="w-full py-4 px-5 rounded-none bg-[#00ff66] hover:bg-[#33ff88] text-black font-pixel text-xs sm:text-sm flex items-center justify-center gap-3 transition-transform cursor-pointer border-3 border-white shadow-[5px_5px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 group pointer-events-auto"
                >
                  <FileText className="w-4 h-4 text-black shrink-0" />
                  <span className="tracking-wide">[ LAUNCH GOOGLE REGISTRATION FORM ]</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                </a>

                {/* URL preview & Copy Button */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 bg-black p-2.5 border border-white/20 text-xs font-mono-tech">
                  <span className="text-white/60 text-[11px] truncate max-w-full sm:max-w-[320px]">
                    docs.google.com/forms/...
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyUrl}
                    className="shrink-0 px-2.5 py-1 bg-black hover:bg-white/10 text-[#00f0ff] border border-[#00f0ff]/40 font-pixel text-[8px] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-[#00ff66]" />
                        <span className="text-[#00ff66]">COPIED!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>COPY LINK</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinMissionSection;
