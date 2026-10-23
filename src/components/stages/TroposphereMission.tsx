import React from 'react';
import {
  Wrench,
  Cpu,
  FolderGit2,
  Users2,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import {
  THEORY_TO_PRACTICE,
  STUDENT_TAKEAWAYS,
} from '../../data/rocketryData';
import { soundFx } from '../../utils/audio';
import { AsciiGlitchRipple } from '../ui/ascii-glitch-ripple';

export const TroposphereMission: React.FC = () => {
  return (
    <section
      id="mission"
      className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 py-20 select-none"
    >
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Section Header: Slide 2 - FROM THEORY TO PRACTICE */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-black border-2 border-[#00f0ff] px-3.5 py-1 rounded-none mb-3 shadow-[2px_2px_0px_#000000]">
            <span className="w-2 h-2 bg-[#00ff66] arcade-blink" />
            <span className="font-pixel text-[8px] text-[#00f0ff] uppercase tracking-wider">
              STAGE 01 // FOUNDATION &amp; PHILOSOPHY
            </span>
          </div>
          <h2 className="font-pixel text-xl sm:text-3xl text-white tracking-wider mb-3">
            <AsciiGlitchRipple as="span" className="hover:text-[#00f0ff] transition-colors">
              {THEORY_TO_PRACTICE.title}
            </AsciiGlitchRipple>
          </h2>
          <div className="mb-3">
            <AsciiGlitchRipple as="p" className="font-pixel text-xs sm:text-sm text-[#ffe600] tracking-wide inline-block hover:text-white transition-colors">
              {`★ ${THEORY_TO_PRACTICE.headline} ★`}
            </AsciiGlitchRipple>
          </div>
          <div className="font-mono-tech text-xs sm:text-sm text-slate-300 leading-relaxed bg-black/70 border border-white/20 p-4 shadow-[3px_3px_0px_#000000] text-left">
            <span className="text-[#00ff66] font-bold">&gt; FOUNDATIONAL PREMISE:</span> {THEORY_TO_PRACTICE.speakerNote}
          </div>
        </div>

        {/* 3 Core Tenets from Slide 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {THEORY_TO_PRACTICE.tenets.map((tenet, idx) => (
            <div
              key={tenet.id}
              className="bg-[#070a12] border-2 border-white/20 hover:border-[#00f0ff] rounded-none p-5 flex flex-col justify-between transition-all duration-150 shadow-[4px_4px_0px_#000000] hover:-translate-y-0.5 group"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b-2 border-white/10 mb-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#ffe600]" />
                    <span className="font-pixel text-[9px] text-[#00f0ff]">
                      TENET_0{idx + 1}
                    </span>
                  </div>
                  <span className="font-mono-tech text-[10px] text-white/50 bg-black px-2 py-0.5 border border-white/10">
                    {tenet.code}
                  </span>
                </div>
                <h3 className="font-pixel text-xs sm:text-sm text-white mb-2 leading-relaxed">
                  {tenet.title}
                </h3>
                <p className="font-mono-tech text-xs text-slate-300 leading-relaxed bg-black/40 p-3 border border-white/10">
                  {tenet.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono-tech text-[#00ff66]">
                <span>■ HANDS-ON LEARNING</span>
                <span>HITAM // HRC</span>
              </div>
            </div>
          ))}
        </div>

        {/* Slide 3: WHAT STUDENTS TAKE WITH THEM */}
        <div className="bg-[#050c14] border-3 border-[#00f0ff] p-6 sm:p-8 rounded-none shadow-[8px_8px_0px_#000000] mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b-2 border-white/20 mb-6">
            <div>
              <div className="font-pixel text-[8px] sm:text-[9px] text-[#ffe600] uppercase tracking-wider mb-1">
                SLIDE 03 // VALUE PROPOSITION
              </div>
              <h3 className="font-pixel text-base sm:text-2xl text-white tracking-wide">
                WHAT STUDENTS TAKE WITH THEM
              </h3>
              <p className="font-mono-tech text-xs sm:text-sm text-[#00ff66] font-semibold mt-1">
                &ldquo;Students leave with proof they can build.&rdquo;
              </p>
            </div>
            <div className="bg-black border border-white/20 px-3 py-1.5 font-mono-tech text-xs text-slate-300 shadow-[2px_2px_0px_#000000]">
              <span className="text-[#00f0ff] font-bold">4 CORE PILLARS</span> // REPEATABLE CAPABILITY
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {STUDENT_TAKEAWAYS.map((takeaway) => {
              const getIcon = (cat: string) => {
                if (cat.includes('Practical')) return <Wrench className="w-5 h-5 text-[#00f0ff]" />;
                if (cat.includes('Project')) return <Cpu className="w-5 h-5 text-[#ffe600]" />;
                if (cat.includes('Career')) return <FolderGit2 className="w-5 h-5 text-[#ff007f]" />;
                return <Users2 className="w-5 h-5 text-[#00ff66]" />;
              };

              return (
                <div
                  key={takeaway.id}
                  className="bg-black border-2 border-white/20 p-4 rounded-none flex flex-col justify-between shadow-[3px_3px_0px_#000000]"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
                      {getIcon(takeaway.category)}
                      <h4 className="font-pixel text-[10px] sm:text-xs text-white leading-tight">
                        {takeaway.category}
                      </h4>
                    </div>

                    <p className="font-mono-tech text-[11px] text-slate-400 mb-3 italic">
                      {takeaway.summary}
                    </p>

                    <div className="space-y-1.5 font-mono-tech text-xs text-slate-200">
                      {takeaway.skills.map((skill, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-1.5">
                          <span className="text-[#00f0ff] text-[10px] shrink-0">▸</span>
                          <span className="text-[11px]">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-2 border-t border-white/10 text-right">
                    <span
                      className="font-pixel text-[8px] px-2 py-0.5 border"
                      style={{ color: takeaway.badgeColor, borderColor: takeaway.badgeColor }}
                    >
                      VERIFIABLE PROOF
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Slide 3 Speaker Note Banner */}
          <div className="mt-6 pt-4 border-t-2 border-white/10 font-mono-tech text-xs text-slate-300 leading-relaxed bg-black/50 p-3 border border-white/10">
            <span className="text-[#ffe600] font-bold">&gt; CORE TAKEAWAY:</span> The value is not one launch; it is a repeatable way to learn, document, and demonstrate engineering work. Students build practical capability, project experience, career evidence, and professional skills.
          </div>
        </div>

        {/* Call to Next Stage */}
        <div className="text-center pt-2">
          <button
            onClick={() => {
              soundFx.playClick();
              const el = document.getElementById('builds');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-black hover:bg-white/10 border-2 border-[#00f0ff] text-[#00f0ff] hover:text-white font-pixel text-[9px] cursor-pointer shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5"
          >
            <span>[ NEXT: EXPLORE THE 5 BRANCH CONTRIBUTIONS ]</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TroposphereMission;
