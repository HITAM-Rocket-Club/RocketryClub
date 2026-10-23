import React, { useState } from 'react';
import {
  Mail,
  ExternalLink,
  GraduationCap,
  X,
  Crown,
} from 'lucide-react';
import { CREW_ROSTER } from '../../data/rocketryData';
import type { CrewMember } from '../../types';
import { soundFx } from '../../utils/audio';
import { AsciiGlitchRipple } from '../ui/ascii-glitch-ripple';

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

export const OrbitDeckCrew: React.FC = () => {
  const [selectedOfficer, setSelectedOfficer] = useState<CrewMember | null>(null);

  const facultyAdvisor =
    CREW_ROSTER.find((c) => c.status === 'FACULTY ADVISOR') || CREW_ROSTER[0];
  const studentOfficers = CREW_ROSTER.filter((c) => c.id !== facultyAdvisor.id);

  return (
    <section
      id="crew"
      className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 py-20 select-none"
    >
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-black border-2 border-[#ff007f] px-3.5 py-1 rounded-none mb-3 shadow-[2px_2px_0px_#000000]">
            <span className="w-2 h-2 bg-[#ff007f] arcade-blink" />
            <span className="font-pixel text-[8px] text-[#ff007f] uppercase tracking-wider">
              STAGE 04 // FACULTY FACILITATOR &amp; FOUNDING LEADS
            </span>
          </div>
          <h2 className="font-pixel text-xl sm:text-3xl text-white tracking-wider mb-3">
            <AsciiGlitchRipple as="span" className="hover:text-[#ff007f] transition-colors">
              LEADERSHIP &amp; LAUNCH COMMITTEE
            </AsciiGlitchRipple>
          </h2>
          <p className="font-mono-tech text-xs sm:text-sm text-slate-300 leading-relaxed bg-black/60 border border-white/10 p-3 max-w-xl mx-auto shadow-[2px_2px_0px_#000000]">
            The academic facilitator and founding student leads organizing the official inauguration of the HITAM Rocketry Club.
          </p>
        </div>

        {/* 1. Faculty Facilitator Spotlight - Retro Command Dossier (Slide 1) */}
        <div className="bg-[#090712] border-2 border-[#ff007f] rounded-none p-5 sm:p-7 mb-10 shadow-[6px_6px_0px_#000000]">
          <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
            <div className="relative shrink-0">
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-none overflow-hidden border-2 border-[#ff007f] shadow-[4px_4px_0px_#000000]">
                <img
                  src={facultyAdvisor.photoUrl}
                  alt={facultyAdvisor.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 p-1.5 rounded-none bg-[#ff007f] text-black shadow-[2px_2px_0px_#000000] border border-black">
                <Crown className="w-4 h-4" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-none bg-black border-2 border-[#ff007f] text-[#ff007f] font-pixel text-[8px] mb-2 shadow-[2px_2px_0px_#000000]">
                <span>FACULTY FACILITATOR // HOD, MECHANICAL ENGINEERING</span>
              </div>
              <h3 className="font-pixel text-lg sm:text-xl text-white mb-1.5 tracking-wide">
                {facultyAdvisor.name}
              </h3>
              <p className="font-mono-tech text-xs sm:text-sm text-[#00f0ff] mb-3 font-semibold">
                Head of Department, Mechanical Engineering · HITAM
              </p>
              <p className="font-mono-tech text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 max-w-3xl bg-black/50 p-3 border border-white/10">
                &ldquo;Today marks the official launch of the HITAM Rocketry Club. The purpose is practical: building engineers, advancing innovation, and reaching beyond the classroom through responsible engineering work.&rdquo;
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-mono-tech text-white/70">
                <div className="flex items-center gap-1.5 bg-black px-2.5 py-1 border border-white/20">
                  <GraduationCap className="w-4 h-4 text-[#ffe600]" />
                  <span>PhD, Mechanical Engineering · Faculty Facilitator</span>
                </div>
                {facultyAdvisor.phone && (
                  <span className="flex items-center gap-1.5 text-white/80 bg-black px-2.5 py-1 border border-white/20">
                    <span className="text-[#00ff66]">TEL:</span> {facultyAdvisor.phone}
                  </span>
                )}
                {facultyAdvisor.linkedin && (
                  <a
                    href={facultyAdvisor.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[#00f0ff] hover:underline bg-black px-2.5 py-1 border border-[#00f0ff]/40"
                  >
                    <span>[ LINKEDIN DOSSIER ]</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 2. Student Officers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {studentOfficers.map((officer) => (
            <div
              key={officer.id}
              className="bg-[#070a12] border-2 border-white/20 hover:border-[#00f0ff] rounded-none p-5 flex flex-col justify-between transition-all duration-150 group shadow-[4px_4px_0px_#000000] hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-center gap-3.5 mb-4 pb-3 border-b-2 border-white/10">
                  <div className="w-14 h-14 rounded-none overflow-hidden border-2 border-white/30 shrink-0 shadow-[2px_2px_0px_#000000]">
                    <img
                      src={officer.photoUrl}
                      alt={officer.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <span className="font-pixel text-[8px] text-[#00f0ff] font-semibold block uppercase tracking-wider">
                      {officer.role}
                    </span>
                    <h4 className="font-pixel text-xs sm:text-sm text-white leading-tight mt-1">
                      {officer.name}
                    </h4>
                    <span className="font-mono-tech text-[10px] text-white/50 block mt-0.5">
                      {officer.department}
                    </span>
                  </div>
                </div>

                <p className="font-mono-tech text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">
                  {officer.bio}
                </p>
              </div>

              <div className="pt-3 border-t-2 border-white/10 flex items-center justify-between">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedOfficer(officer);
                  }}
                  className="font-pixel text-[8px] text-[#00f0ff] hover:text-[#ffe600] cursor-pointer flex items-center gap-1.5 transition-colors"
                >
                  <span>[ FULL DOSSIER ]</span>
                  <ExternalLink className="w-3 h-3" />
                </button>

                {/* Social / Contact Links */}
                <div className="flex items-center gap-1.5">
                  {officer.linkedin && (
                    <a
                      href={officer.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-none bg-black border border-white/20 text-white/70 hover:text-white hover:border-[#00f0ff] transition-colors"
                      title="LinkedIn"
                    >
                      <LinkedinIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {officer.github && (
                    <a
                      href={officer.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-none bg-black border border-white/20 text-white/70 hover:text-white hover:border-[#00f0ff] transition-colors"
                      title="GitHub"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {officer.email && (
                    <a
                      href={`mailto:${officer.email}`}
                      className="p-1.5 rounded-none bg-black border border-white/20 text-white/70 hover:text-white hover:border-[#00f0ff] transition-colors"
                      title="Email"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Officer Modal */}
        {selectedOfficer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85">
            <div className="bg-[#070a12] border-3 border-[#00f0ff] rounded-none max-w-lg w-full p-6 shadow-[8px_8px_0px_#000000] animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-3 border-b-2 border-white/20 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-none overflow-hidden border-2 border-white/30 shadow-[2px_2px_0px_#000000]">
                    <img
                      src={selectedOfficer.photoUrl}
                      alt={selectedOfficer.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="font-pixel text-[8px] text-[#00f0ff] font-semibold block uppercase">
                      {selectedOfficer.role}
                    </span>
                    <h3 className="font-pixel text-sm sm:text-base text-white mt-0.5">
                      {selectedOfficer.name}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedOfficer(null)}
                  className="p-1.5 rounded-none bg-black hover:bg-white/20 border border-white/30 text-white cursor-pointer"
                  title="Close Dossier"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 font-mono-tech text-xs mb-6">
                <div>
                  <span className="text-white/40 block text-[10px] uppercase mb-1">Academic Department</span>
                  <span className="text-white font-medium">{selectedOfficer.department}</span>
                </div>

                <div>
                  <span className="text-white/40 block text-[10px] uppercase mb-1">Biography &amp; Focus</span>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {selectedOfficer.bio}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t-2 border-white/20">
                <div className="flex items-center gap-2">
                  {selectedOfficer.linkedin && (
                    <a
                      href={selectedOfficer.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-none bg-black hover:bg-white/10 text-white border border-white/30 font-pixel text-[8px] flex items-center gap-1.5 shadow-[2px_2px_0px_#000000]"
                    >
                      <LinkedinIcon className="w-3.5 h-3.5" />
                      <span>LINKEDIN</span>
                    </a>
                  )}
                  {selectedOfficer.github && (
                    <a
                      href={selectedOfficer.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-none bg-black hover:bg-white/10 text-white border border-white/30 font-pixel text-[8px] flex items-center gap-1.5 shadow-[2px_2px_0px_#000000]"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>GITHUB</span>
                    </a>
                  )}
                  {selectedOfficer.email && (
                    <a
                      href={`mailto:${selectedOfficer.email}`}
                      className="px-3 py-1.5 rounded-none bg-black hover:bg-white/10 text-white border border-white/30 font-pixel text-[8px] flex items-center gap-1.5 shadow-[2px_2px_0px_#000000]"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>EMAIL</span>
                    </a>
                  )}
                </div>

                <button
                  onClick={() => setSelectedOfficer(null)}
                  className="px-4 py-1.5 rounded-none bg-[#00f0ff] text-black font-pixel text-[9px] cursor-pointer border-2 border-white shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5"
                >
                  [ CLOSE ]
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default OrbitDeckCrew;
