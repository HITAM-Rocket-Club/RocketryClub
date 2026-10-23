import React from 'react';
import { ArrowUp, Compass, Radio, MapPin } from 'lucide-react';
import { CLUB_METADATA } from '../../data/rocketryData';
import { soundFx } from '../../utils/audio';

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export const Footer: React.FC = () => {
  const scrollToTop = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    try {
      soundFx.playCoin();
    } catch {
      // silenced
    }
    const hero = document.getElementById('cockpit');
    if (hero) {
      hero.scrollIntoView({ behavior: 'smooth' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-30 border-t-2 border-white/20 bg-[#04060a] px-4 sm:px-6 py-12 text-slate-400 font-mono-tech text-xs">
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b-2 border-white/15">
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <div className="w-8 h-8 rounded-none bg-white border-2 border-[#00f0ff] p-0.5 shadow-[2px_2px_0px_#000000] shrink-0 flex items-center justify-center overflow-hidden">
                <img src="/logo.png" alt="HITAM Rocketry Club Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-pixel text-xs sm:text-sm text-white tracking-wider">
                  {CLUB_METADATA.clubNameFull}
                </span>
                <span className="px-2 py-0.5 rounded-none bg-black text-[#00f0ff] border border-[#00f0ff] font-pixel text-[8px]">
                  PRE-RELEASE
                </span>
              </div>
            </div>
            <p className="text-slate-300 text-xs">
              {CLUB_METADATA.tagline}
            </p>
            <p className="text-[#00ff66] text-[11px] font-semibold mt-0.5">
              {CLUB_METADATA.subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            data-crosshair-target
            className="relative z-10 px-4 py-2 rounded-none bg-black hover:bg-white/10 text-white border-2 border-white/40 font-pixel text-[8px] flex items-center gap-2 transition-transform cursor-pointer pointer-events-auto shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5"
          >
            <span>[ BACK TO TOP ]</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#00f0ff]" />
          </button>
        </div>

        {/* Social Uplinks / Telemetry Channels */}
        <div className="relative z-10 my-6 p-4 sm:p-5 bg-black/90 border-2 border-white/20 shadow-[4px_4px_0px_#000000] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#00ff66] arcade-blink shrink-0" />
            <div>
              <span className="font-pixel text-[8px] sm:text-[9px] text-[#00f0ff] uppercase tracking-wider block">
                COMMUNICATION CHANNELS // OFFICIAL LINKS
              </span>
              <p className="font-mono-tech text-[11px] text-slate-300 mt-0.5">
                Connect with HITAM Rocketry Club across official networks &amp; repositories.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* LinkedIn */}
            <a
              href={CLUB_METADATA.socials?.linkedin || "https://www.linkedin.com/company/145342832/admin/dashboard/"}
              target="_blank"
              rel="noopener noreferrer"
              data-crosshair-target
              onClick={() => {
                try { soundFx.playClick(); } catch {}
              }}
              onMouseEnter={() => {
                try { soundFx.playBlip(900, 0.015); } catch {}
              }}
              className="relative z-10 pointer-events-auto cursor-pointer flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 py-2 bg-[#070a12] hover:bg-[#0077b5]/20 text-white border-2 border-white/30 hover:border-[#0077b5] font-pixel text-[8px] transition-all duration-150 shadow-[2px_2px_0px_#000000] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 group"
            >
              <LinkedinIcon className="w-3.5 h-3.5 text-[#00a0dc] group-hover:scale-110 transition-transform" />
              <span>LINKEDIN</span>
            </a>

            {/* GitHub */}
            <a
              href={CLUB_METADATA.socials?.github || "https://github.com/HITAM-Rocket-Club"}
              target="_blank"
              rel="noopener noreferrer"
              data-crosshair-target
              onClick={() => {
                try { soundFx.playClick(); } catch {}
              }}
              onMouseEnter={() => {
                try { soundFx.playBlip(900, 0.015); } catch {}
              }}
              className="relative z-10 pointer-events-auto cursor-pointer flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 py-2 bg-[#070a12] hover:bg-white/10 text-white border-2 border-white/30 hover:border-white font-pixel text-[8px] transition-all duration-150 shadow-[2px_2px_0px_#000000] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 group"
            >
              <GithubIcon className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform" />
              <span>GITHUB</span>
            </a>

            {/* Instagram */}
            <a
              href={CLUB_METADATA.socials?.instagram || "https://www.instagram.com/hitamrocketryclub?xtok=d2U4NmViMng5cGln"}
              target="_blank"
              rel="noopener noreferrer"
              data-crosshair-target
              onClick={() => {
                try { soundFx.playClick(); } catch {}
              }}
              onMouseEnter={() => {
                try { soundFx.playBlip(900, 0.015); } catch {}
              }}
              className="relative z-10 pointer-events-auto cursor-pointer flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 py-2 bg-[#070a12] hover:bg-[#e1306c]/20 text-white border-2 border-white/30 hover:border-[#e1306c] font-pixel text-[8px] transition-all duration-150 shadow-[2px_2px_0px_#000000] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 group"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-[#e1306c] group-hover:scale-110 transition-transform" />
              <span>INSTAGRAM</span>
            </a>
          </div>
        </div>

        {/* 3 Column Spec Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 py-6 border-b-2 border-white/15 text-xs text-slate-400">
          <div className="bg-black/60 p-4 border border-white/15 shadow-[2px_2px_0px_#000000]">
            <div className="text-[#ffe600] font-pixel text-[8px] mb-2.5 flex items-center gap-1.5 uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              Faculty Facilitator &amp; Campus
            </div>
            <p className="leading-relaxed text-slate-300">
              <strong className="text-white">{CLUB_METADATA.facultyFacilitator}</strong><br />
              {CLUB_METADATA.missionControlRoom}<br />
              {CLUB_METADATA.organization}<br />
              Coords: <span className="text-[#00f0ff]">{CLUB_METADATA.coordinates}</span>
            </p>
          </div>

          <div className="bg-black/60 p-4 border border-white/15 shadow-[2px_2px_0px_#000000]">
            <div className="text-[#00f0ff] font-pixel text-[8px] mb-2.5 flex items-center gap-1.5 uppercase tracking-wider">
              <Radio className="w-3.5 h-3.5" />
              One Shared System
            </div>
            <p className="leading-relaxed text-slate-300">
              5 Participating Engineering Branches:<br />
              <span className="text-white">Mechanical · ECE · EEE · CSE/IT · AI/DS</span><br />
              Shared Outcome: Integrated Aerospace Platform
            </p>
          </div>

          <div className="bg-black/60 p-4 border border-white/15 shadow-[2px_2px_0px_#000000]">
            <div className="text-[#00ff66] font-pixel text-[8px] mb-2.5 flex items-center gap-1.5 uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              Capability &amp; Safety
            </div>
            <p className="leading-relaxed text-slate-300">
              Build capability before chasing complexity.<br />
              Phased progression with formal safety checkpoints.<br />
              Supervised launches where legally permitted.
            </p>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-white/50 font-mono-tech">
          <p>© {new Date().getFullYear()} HITAM Rocketry Club. All rights reserved.</p>
          <div className="flex items-center gap-2 bg-black px-2.5 py-1 border border-white/20">
            <span className="w-2 h-2 bg-[#ffe600] arcade-blink" />
            <span className="text-[#ffe600] font-bold">STATUS: PRE-RELEASE // OFFICIAL CLUB LAUNCH UPCOMING</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
