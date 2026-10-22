import React, { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  ExternalLink,
  Copy,
  Check,
  X,
  GraduationCap,
  Terminal,
  Crown,
} from 'lucide-react';
import { CREW_ROSTER } from '../../data/rocketryData';
import type { CrewMember } from '../../types';

// Custom Crisp SVGs for GitHub and LinkedIn
const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

export const OrbitDeckCrew: React.FC = () => {
  const [selectedOfficer, setSelectedOfficer] = useState<CrewMember | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedOfficer(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2200);
  };

  const facultyAdvisor =
    CREW_ROSTER.find((c) => c.status === 'FACULTY ADVISOR') || CREW_ROSTER[0];
  const studentOfficers = CREW_ROSTER.filter((c) => c.id !== facultyAdvisor.id);

  const filteredOfficers = studentOfficers.filter((officer) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'PRESIDENT') return officer.id === 'crew-mokshith';
    if (activeFilter === 'TECHNICAL') return officer.id === 'crew-athrva';
    if (activeFilter === 'ADMIN_FINANCE') return officer.id === 'crew-pranitha' || officer.id === 'crew-shishir';
    if (activeFilter === 'OUTREACH') return officer.id === 'crew-jose';
    return true;
  });

  return (
    <section
      id="crew"
      className="relative min-h-screen flex flex-col justify-center px-4 py-24 border-t-4 border-[#ff007f]/30 select-none"
    >
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Stage 7 Arcade Banner */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b-2 border-white/20">
          <div>
            <div className="font-pixel text-[10px] text-[#ff007f] mb-1 tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-[#ff007f] inline-block animate-ping" />
              ★ STAGE 07 // ORBIT DECK &amp; FLIGHT CREW DOSSIERS (100,000m+) ★
            </div>
            <div className="inline-block bg-[#ff007f]/15 border border-[#ff007f] px-2 py-0.5 font-pixel text-[8px] text-[#ff007f] mb-2">
              ● 3D BG: PART 08 // MACHINED THRUST PUCK &amp; TURBOPUMPS
            </div>
            <h2 className="font-pixel text-xl sm:text-3xl text-white tracking-wide">
              FLIGHT CREW &amp; ADVISORY LEADERSHIP
            </h2>
            <p className="font-mono-tech text-xs text-slate-300 mt-1 max-w-2xl">
              Official aerospace flight clearance manifests, executive command, and engineering team leads driving airframe design, propulsion, avionics, and space technology research at HITAM.
            </p>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-1.5 shrink-0">
            <div className="font-pixel text-[9px] text-[#00f0ff] bg-black border-2 border-[#00f0ff] px-3 py-1.5 shadow-[0_0_12px_rgba(0,240,255,0.4)]">
              STATION STATUS: DOCKED // LEO
            </div>
            <div className="font-pixel text-[8px] text-[#00ff66]">
              ● 6 OFFICERS CLEARANCE: VERIFIED
            </div>
          </div>
        </div>

        {/* =========================================================================
            FACULTY ADVISOR GRAND TITLE CARD (Dr. Motilal Lakavat, PhD)
        ========================================================================= */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-0.5 bg-[#ff007f] text-black font-pixel text-[8px] font-bold">
              FLIGHT COMMAND
            </span>
            <span className="font-pixel text-[9px] text-white/70">
              // INSTITUTIONAL AEROSPACE ADVISORY
            </span>
          </div>

          <div className="arcade-box-magenta p-6 sm:p-8 relative overflow-hidden group">
            {/* Ambient Corner Decors */}
            <div className="absolute top-2 right-2 font-pixel text-[8px] text-[#ff007f]/40 hidden sm:block">
              SEC-LVL: ADVISORY-01 // HITAM
            </div>
            <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-[#ff007f]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 relative z-10">
              {/* Photo Portrait with Cyber HUD Frame */}
              <div className="flex flex-col items-center shrink-0">
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 bg-black border-4 border-[#ff007f] p-1.5 shadow-[0_0_24px_rgba(255,0,127,0.45)]">
                  {/* Real Photo */}
                  <div className="w-full h-full relative overflow-hidden bg-slate-900 border border-white/20">
                    <img
                      src={facultyAdvisor.photoUrl}
                      alt={facultyAdvisor.name}
                      className="w-full h-full object-cover object-center filter contrast-105 group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Scanline CRT overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#ff007f]/5 to-transparent pointer-events-none opacity-50" />
                  </div>

                  {/* Corner Brackets */}
                  <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#ffe600]" />
                  <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#ffe600]" />
                  <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#ffe600]" />
                  <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#ffe600]" />
                </div>

                <div className="mt-3 px-3 py-1 bg-black border-2 border-[#ffe600] font-pixel text-[8px] text-[#ffe600] text-center shadow-[0_0_8px_rgba(255,230,0,0.3)]">
                  ★ {facultyAdvisor.badge} ★
                </div>
              </div>

              {/* Identity & Bio */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-black border border-[#ffe600] font-pixel text-[8px] text-[#ffe600]">
                    CALLSIGN: {facultyAdvisor.callsign}
                  </span>
                  <span className="font-pixel text-[8px] text-[#00f0ff] bg-black/60 px-2 py-0.5 border border-[#00f0ff]/40">
                    {facultyAdvisor.classYear}
                  </span>
                  <span className="font-pixel text-[8px] text-[#00ff66] ml-auto hidden sm:inline-block">
                    ● ACTIVE MENTORSHIP
                  </span>
                </div>

                <h3 className="font-pixel text-xl sm:text-2xl text-white mb-1 tracking-wide">
                  {facultyAdvisor.name}
                </h3>
                <div className="font-pixel text-[10px] sm:text-xs text-[#00f0ff] mb-1">
                  {facultyAdvisor.role}
                </div>
                <div className="font-mono-tech text-xs text-slate-400 mb-4 flex items-center justify-center md:justify-start gap-2">
                  <GraduationCap className="w-3.5 h-3.5 text-[#ffe600] shrink-0" />
                  <span>{facultyAdvisor.department}</span>
                </div>

                <p className="font-mono-tech text-xs sm:text-sm text-slate-300 leading-relaxed mb-5 bg-black/40 p-3 border-l-2 border-[#ff007f]">
                  "{facultyAdvisor.bio}"
                </p>

                {/* Skills & Specialization Tags */}
                {facultyAdvisor.skills && (
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 mb-5">
                    {facultyAdvisor.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="font-pixel text-[7.5px] px-2 py-0.5 bg-black border border-white/20 text-slate-300"
                      >
                        + {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* Direct Action & Contact Buttons */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-3 border-t border-white/10">
                  {facultyAdvisor.linkedin && (
                    <a
                      href={facultyAdvisor.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0077b5]/20 hover:bg-[#0077b5]/40 border-2 border-[#0077b5] text-white font-pixel text-[8.5px] transition-all cursor-pointer"
                    >
                      <LinkedinIcon className="w-3.5 h-3.5 text-[#00a0dc]" />
                      LINKEDIN DOSSIER
                      <ExternalLink className="w-3 h-3 text-[#00a0dc]" />
                    </a>
                  )}

                  {facultyAdvisor.phone && (
                    <a
                      href={`tel:${facultyAdvisor.phone.replace(/\s+/g, '')}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black hover:bg-white/10 border-2 border-[#00ff66] text-[#00ff66] font-pixel text-[8.5px] transition-all cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#00ff66]" />
                      CALL: {facultyAdvisor.phone}
                    </a>
                  )}

                  <button
                    onClick={() => setSelectedOfficer(facultyAdvisor)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black hover:bg-[#ff007f]/20 border-2 border-[#ff007f] text-[#ff007f] font-pixel text-[8.5px] transition-all ml-auto cursor-pointer"
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    INSPECT DOSSIER
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            STUDENT LEADERSHIP FILTER TABS
        ========================================================================= */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#ffe600] inline-block animate-pulse" />
            <span className="font-pixel text-[9px] text-[#ffe600] uppercase tracking-wider">
              STUDENT EXECUTIVE CORPS // PRESIDENT &amp; 4 CORE LEADS
            </span>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'ALL', label: 'ALL OFFICERS (5)' },
              { id: 'PRESIDENT', label: '★ PRESIDENT' },
              { id: 'TECHNICAL', label: 'TECH & SYSTEMS' },
              { id: 'ADMIN_FINANCE', label: 'SECRETARY & TREASURER' },
              { id: 'OUTREACH', label: 'PR & COMMS' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`font-pixel text-[7.5px] px-2.5 py-1 border transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-[#ffe600] text-black border-[#ffe600] font-bold shadow-[0_0_8px_rgba(255,230,0,0.4)]'
                    : 'bg-black text-slate-400 border-white/20 hover:border-white/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* =========================================================================
            DEDICATED OFFICER TITLE CARDS (Grid of 5 leads with Mokshith as President)
        ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOfficers.map((officer) => {
            const isPresident = officer.id === 'crew-mokshith';
            const isTech = officer.id === 'crew-athrva';
            const isSecretary = officer.id === 'crew-pranitha';
            const isTreasurer = officer.id === 'crew-shishir';

            const accentBorder = isPresident
              ? 'border-[#ffe600]'
              : isTech
              ? 'border-[#00f0ff]'
              : isSecretary
              ? 'border-[#ff007f]'
              : isTreasurer
              ? 'border-[#00ff66]'
              : 'border-[#00f0ff]';

            const accentColor = isPresident
              ? 'text-[#ffe600]'
              : isTech
              ? 'text-[#00f0ff]'
              : isSecretary
              ? 'text-[#ff007f]'
              : isTreasurer
              ? 'text-[#00ff66]'
              : 'text-[#00f0ff]';

            const badgeBg = isPresident
              ? 'bg-[#ffe600] text-black font-extrabold shadow-[0_0_10px_rgba(255,230,0,0.5)]'
              : isTech
              ? 'bg-[#00f0ff] text-black font-bold'
              : isSecretary
              ? 'bg-[#ff007f] text-white font-bold'
              : isTreasurer
              ? 'bg-[#00ff66] text-black font-bold'
              : 'bg-[#00f0ff] text-black font-bold';

            return (
              <div
                key={officer.id}
                className={`arcade-box p-0 flex flex-col justify-between relative group transition-all duration-300 ${
                  isPresident
                    ? 'border-4 border-[#ffe600] shadow-[0_0_24px_rgba(255,230,0,0.25)]'
                    : `hover:${accentBorder}`
                }`}
              >
                {/* Top Card Bar */}
                <div
                  className={`px-4 py-2.5 border-b-2 flex items-center justify-between ${
                    isPresident
                      ? 'bg-gradient-to-r from-black via-[#ffe600]/10 to-black border-[#ffe600]/40'
                      : 'bg-black/90 border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    {isPresident ? (
                      <Crown className="w-3.5 h-3.5 text-[#ffe600] shrink-0 animate-bounce" />
                    ) : (
                      <span className="w-1.5 h-1.5 bg-[#00ff66] rounded-full inline-block animate-ping" />
                    )}
                    <span
                      className={`font-pixel text-[8px] ${
                        isPresident ? 'text-[#ffe600] font-bold' : 'text-white/70'
                      }`}
                    >
                      // {officer.callsign}
                    </span>
                  </div>
                  <span className={`font-pixel text-[7.5px] px-2 py-0.5 ${badgeBg}`}>
                    {officer.badge}
                  </span>
                </div>

                {/* Officer Photo (Perfect 4:5 Portrait Ratio, Face Centered) */}
                <div className="p-4 pb-2">
                  <div
                    className={`relative w-full aspect-[4/5] bg-black border-2 overflow-hidden transition-colors ${
                      isPresident
                        ? 'border-[#ffe600]/60 group-hover:border-[#ffe600]'
                        : `border-white/20 group-hover:${accentBorder}`
                    }`}
                  >
                    <img
                      src={officer.photoUrl}
                      alt={officer.name}
                      className="w-full h-full object-cover object-center filter contrast-105 group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Subtle lower gradient so face remains bright & visible */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                    {/* Department Tag Overlay cleanly placed at bottom */}
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                      <span className="px-2 py-0.5 bg-black/85 border border-white/40 font-pixel text-[7.5px] text-[#ffe600] backdrop-blur-xs">
                        {officer.classYear}
                      </span>
                      <span className="px-2 py-0.5 bg-black/85 border border-white/40 font-pixel text-[7px] text-white/80 backdrop-blur-xs">
                        SINCE {officer.since}
                      </span>
                    </div>

                    {/* Corner Cyber Brackets */}
                    <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t border-l border-white/60" />
                    <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t border-r border-white/60" />
                    <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b border-l border-white/60" />
                    <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b border-r border-white/60" />
                  </div>

                  {/* Identity */}
                  <div className="mt-3.5">
                    <div className="flex items-center gap-1.5">
                      {isPresident && (
                        <Crown className="w-3.5 h-3.5 text-[#ffe600] shrink-0" />
                      )}
                      <h4
                        className={`font-pixel text-sm sm:text-base tracking-wide transition-colors ${
                          isPresident
                            ? 'text-[#ffe600] font-bold'
                            : 'text-white group-hover:text-[#00f0ff]'
                        }`}
                      >
                        {officer.name}
                      </h4>
                    </div>

                    <div className={`font-pixel text-[9px] mt-1 ${accentColor}`}>
                      {officer.role}
                    </div>
                    <div className="font-mono-tech text-[10px] text-slate-400 mt-0.5">
                      {officer.department}
                    </div>
                  </div>

                  {/* Biography Excerpt */}
                  <div
                    className={`mt-3 p-2.5 border-l-2 text-slate-300 font-mono-tech text-[11px] leading-relaxed line-clamp-4 ${
                      isPresident
                        ? 'bg-black/70 border-[#ffe600]'
                        : 'bg-black/50 border-white/20'
                    }`}
                  >
                    "{officer.bio}"
                  </div>

                  {/* Skill Chips */}
                  {officer.skills && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {officer.skills.slice(0, 3).map((skill, idx) => (
                        <span
                          key={idx}
                          className="font-pixel text-[7px] px-1.5 py-0.5 bg-black/70 border border-white/10 text-slate-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Footer: Quick Actions */}
                <div className="p-3 bg-black/80 border-t border-white/10 flex items-center justify-between gap-1.5 mt-2">
                  <div className="flex items-center gap-1.5">
                    {officer.github && (
                      <a
                        href={officer.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 bg-black border border-white/20 hover:border-[#00f0ff] hover:text-[#00f0ff] text-white transition-colors cursor-pointer"
                        title="GitHub Profile"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {officer.linkedin && (
                      <a
                        href={officer.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 bg-black border border-white/20 hover:border-[#0077b5] hover:text-[#0077b5] text-white transition-colors cursor-pointer"
                        title="LinkedIn Profile"
                      >
                        <LinkedinIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {officer.email && (
                      <a
                        href={`mailto:${officer.email}`}
                        className="p-1.5 bg-black border border-white/20 hover:border-[#ffe600] hover:text-[#ffe600] text-white transition-colors cursor-pointer"
                        title={`Mail: ${officer.email}`}
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {officer.phone && (
                      <a
                        href={`tel:${officer.phone}`}
                        className="p-1.5 bg-black border border-white/20 hover:border-[#00ff66] hover:text-[#00ff66] text-white transition-colors cursor-pointer"
                        title={`Call: ${officer.phone}`}
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedOfficer(officer)}
                    className={`font-pixel text-[7.5px] px-2.5 py-1.5 bg-black border transition-all flex items-center gap-1 cursor-pointer ${
                      isPresident
                        ? 'border-[#ffe600] text-[#ffe600] hover:bg-[#ffe600] hover:text-black'
                        : 'border-white/30 text-white hover:border-[#00f0ff] hover:text-[#00f0ff]'
                    }`}
                  >
                    DOSSIER &gt;
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          INTERACTIVE FULL DOSSIER INSPECTOR MODAL
      ========================================================================= */}
      {selectedOfficer && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedOfficer(null)}
        >
          <div
            className="arcade-box-cyan max-w-2xl w-full p-6 sm:p-8 relative my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedOfficer(null)}
              className="absolute top-4 right-4 p-1.5 bg-black border-2 border-white hover:border-[#ff007f] hover:text-[#ff007f] text-white transition-colors cursor-pointer"
              title="Close Dossier"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Dossier Header */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-white/20">
              <span className="w-2.5 h-2.5 bg-[#00f0ff] inline-block animate-pulse" />
              <div className="font-pixel text-[10px] text-[#00f0ff]">
                RESTRICTED DOSSIER // CALLSIGN: {selectedOfficer.callsign}
              </div>
              <span className="px-2 py-0.5 bg-[#ffe600] text-black font-pixel text-[8px] font-bold ml-auto mr-8">
                {selectedOfficer.badge}
              </span>
            </div>

            {/* Main Officer Content */}
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Officer High-Res Portrait (Centered 4:5 Ratio) */}
              <div className="flex flex-col items-center shrink-0">
                <div className="w-44 aspect-[4/5] bg-black border-4 border-[#00f0ff] p-1 relative shadow-[0_0_20px_rgba(0,240,255,0.4)] overflow-hidden">
                  <img
                    src={selectedOfficer.photoUrl}
                    alt={selectedOfficer.name}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 left-2 right-2 text-center">
                    <span className="font-pixel text-[7.5px] text-[#00ff66] bg-black/90 px-2 py-0.5 border border-[#00ff66]">
                      CLEARANCE: VERIFIED
                    </span>
                  </div>
                </div>

                <div className="mt-3 font-pixel text-[8px] text-white/50 text-center">
                  MANIFEST ID: {selectedOfficer.id}
                </div>
              </div>

              {/* Identity & Technical Specs */}
              <div className="flex-1">
                <h3 className="font-pixel text-lg sm:text-xl text-white mb-1">
                  {selectedOfficer.name}
                </h3>
                <div className="font-pixel text-xs text-[#00f0ff] mb-1">
                  {selectedOfficer.role}
                </div>
                <div className="font-mono-tech text-xs text-[#ffe600] mb-3">
                  {selectedOfficer.classYear} — {selectedOfficer.department}
                </div>

                <div className="bg-black/60 p-3.5 border-l-3 border-[#00f0ff] mb-4">
                  <div className="font-pixel text-[8px] text-white/50 mb-1">
                    OFFICER BIO &amp; STATEMENT:
                  </div>
                  <p className="font-mono-tech text-xs text-slate-200 leading-relaxed">
                    "{selectedOfficer.bio}"
                  </p>
                </div>

                {/* Subsystem & Status Grid */}
                <div className="grid grid-cols-2 gap-2 mb-4 font-pixel text-[8px]">
                  <div className="bg-black p-2 border border-white/10">
                    <span className="text-white/50 block mb-0.5">SUBSYSTEM</span>
                    <span className="text-white">{selectedOfficer.subsystem}</span>
                  </div>
                  <div className="bg-black p-2 border border-white/10">
                    <span className="text-white/50 block mb-0.5">TENURE</span>
                    <span className="text-[#ffe600]">SINCE {selectedOfficer.since}</span>
                  </div>
                </div>

                {/* Competencies */}
                {selectedOfficer.skills && (
                  <div className="mb-4">
                    <div className="font-pixel text-[8px] text-white/50 mb-1.5">
                      TECHNICAL COMPETENCIES &amp; DOMAINS:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedOfficer.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="font-pixel text-[7.5px] px-2 py-0.5 bg-black border border-white/20 text-slate-200"
                        >
                          + {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Direct Comms & Contact Panel */}
            <div className="mt-6 pt-4 border-t-2 border-white/15">
              <div className="flex items-center justify-between mb-2">
                <span className="font-pixel text-[8.5px] text-[#00f0ff]">
                  DIRECT COMMS CHANNELS &amp; CREDENTIALS
                </span>
                {copiedField && (
                  <span className="font-pixel text-[8px] text-[#00ff66] bg-black px-2 py-0.5 border border-[#00ff66] animate-pulse">
                    COPIED {copiedField} // OK
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedOfficer.email && (
                  <div className="flex items-center justify-between bg-black p-2 border border-white/20">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <Mail className="w-3.5 h-3.5 text-[#ffe600] shrink-0" />
                      <a
                        href={`mailto:${selectedOfficer.email}`}
                        className="font-mono-tech text-xs text-white hover:text-[#ffe600] truncate"
                      >
                        {selectedOfficer.email}
                      </a>
                    </div>
                    <button
                      onClick={() => handleCopy(selectedOfficer.email!, 'EMAIL')}
                      className="p-1 hover:text-[#00f0ff] text-white/60 ml-2 cursor-pointer"
                      title="Copy Email"
                    >
                      {copiedField === 'EMAIL' ? (
                        <Check className="w-3.5 h-3.5 text-[#00ff66]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                )}

                {selectedOfficer.phone && (
                  <div className="flex items-center justify-between bg-black p-2 border border-white/20">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <Phone className="w-3.5 h-3.5 text-[#00ff66]" />
                      <a
                        href={`tel:${selectedOfficer.phone.replace(/\s+/g, '')}`}
                        className="font-mono-tech text-xs text-white hover:text-[#00ff66] truncate"
                      >
                        {selectedOfficer.phone}
                      </a>
                    </div>
                    <button
                      onClick={() => handleCopy(selectedOfficer.phone!, 'PHONE')}
                      className="p-1 hover:text-[#00f0ff] text-white/60 ml-2 cursor-pointer"
                      title="Copy Phone"
                    >
                      {copiedField === 'PHONE' ? (
                        <Check className="w-3.5 h-3.5 text-[#00ff66]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                )}

                {selectedOfficer.linkedin && (
                  <a
                    href={selectedOfficer.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between bg-black p-2 border border-[#0077b5]/50 hover:border-[#0077b5] text-white transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <LinkedinIcon className="w-3.5 h-3.5 text-[#00a0dc]" />
                      <span className="font-pixel text-[8px] text-[#00a0dc]">
                        LINKEDIN DOSSIER
                      </span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[#00a0dc]" />
                  </a>
                )}

                {selectedOfficer.github && (
                  <a
                    href={selectedOfficer.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between bg-black p-2 border border-white/20 hover:border-white text-white transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <GithubIcon className="w-3.5 h-3.5 text-white" />
                      <span className="font-pixel text-[8px] text-white">
                        GITHUB CODEBASE
                      </span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-white" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
