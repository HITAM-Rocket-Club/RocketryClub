import React, { useState } from 'react';
import { Send, Gamepad2, Sparkles, Terminal } from 'lucide-react';
import { SUB_TEAMS } from '../../data/rocketryData';
import { soundFx } from '../../utils/audio';

interface JoinMissionSectionProps {
  onOpenArcade: () => void;
}

export const JoinMissionSection: React.FC<JoinMissionSectionProps> = ({ onOpenArcade }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    rollNumber: '',
    department: 'AERO / MECH',
    year: '2nd Year',
    subsystem: 'propulsion',
    statement: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [packetHash, setPacketHash] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playSuccess();
    const hash = 'HRC-PILOT-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    setPacketHash(hash);
    setSubmitted(true);
  };

  return (
    <section
      id="join"
      className="relative min-h-screen flex flex-col justify-center px-4 py-24 border-t-4 border-[#00ff66]/30 select-none"
    >
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        {/* Stage 8 Arcade Banner */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b-2 border-white/20">
          <div>
            <div className="font-pixel text-[10px] text-[#00ff66] mb-1 tracking-widest">
              ★ STAGE 08 // DOCK YOUR SHIP & JOIN SQUADRON ★
            </div>
            <div className="inline-block bg-[#ff3333]/15 border border-[#ff3333] px-2 py-0.5 font-pixel text-[8px] text-[#ff3333] mb-2">
              ● 3D BG: PART 09 // RAPTOR CLUSTER & SUPERSONIC PLASMA PLUME
            </div>
            <h2 className="font-pixel text-xl sm:text-3xl text-white tracking-wide">
              RECRUITMENT TERMINAL
            </h2>
          </div>
          <div className="font-pixel text-[9px] text-[#ffe600] bg-black border-2 border-[#ffe600] px-3 py-1.5 self-start sm:self-auto">
            STATUS: ACCEPTING CANDIDATES
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Mission Callout & Arcade Game Banner */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="arcade-box p-6">
              <div className="flex items-center gap-2 font-pixel text-[10px] text-[#ffe600] mb-2">
                <Terminal className="w-4 h-4" />
                <span>MISSION SQUADRON DIRECTIVE</span>
              </div>
              <h3 className="font-pixel text-sm sm:text-base text-white mb-3">
                Build Real Sounding Rockets
              </h3>
              <p className="font-mono-tech text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                Whether you specialize in propulsion chemistry, CAD airframes, avionics PCBs, or flight simulation — there is an open flight station for you in HRC.
              </p>

              <div className="space-y-2 font-pixel text-[8px] text-white/70 border-t border-white/20 pt-4">
                <div className="flex items-center gap-2">
                  <span className="text-[#00ff66]">►</span>
                  <span>NO PRIOR ROCKETRY EXP NEEDED</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#00ff66]">►</span>
                  <span>HANDS-ON LABORATORY SESSIONS</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#00ff66]">►</span>
                  <span>COMPETITION LAUNCH FLIGHTS</span>
                </div>
              </div>
            </div>

            {/* Flight Simulator Promotion Box */}
            <div className="arcade-box-yellow p-6 relative overflow-hidden">
              <div className="flex items-center justify-between pb-2 border-b-2 border-[#ffe600] mb-3 font-pixel text-[9px]">
                <span className="text-[#ff007f] flex items-center gap-1.5">
                  <Gamepad2 className="w-4 h-4" /> PILOT QUALIFIER
                </span>
                <span className="text-[#00ff66]">EASTER EGG</span>
              </div>

              <h4 className="font-pixel text-xs sm:text-sm text-white mb-2">
                Dock Your Ship in Asteroids Arcade
              </h4>
              <p className="font-mono-tech text-xs text-slate-300 mb-4">
                Test your flight reaction speed on the 8-bit vector Asteroids flight simulator!
              </p>

              <button
                onClick={() => {
                  soundFx.playStart();
                  onOpenArcade();
                }}
                className="arcade-btn arcade-btn-magenta w-full py-2.5 text-[9px] flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>LAUNCH ASTEROIDS ARCADE</span>
              </button>
            </div>
          </div>

          {/* Right Column: Ingestion Form */}
          <div className="lg:col-span-7 arcade-box-cyan p-6 sm:p-8">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4 font-pixel text-[9px]">
                <div className="flex items-center justify-between pb-3 border-b-2 border-[#00f0ff] mb-4">
                  <span className="text-[#ffe600]">
                    CADET INGESTION PROTOCOL
                  </span>
                  <span className="text-white/50 text-[8px]">TERMINAL 01</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/70 block mb-1">
                      CANDIDATE FULL NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Neil Armstrong"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full p-2.5 bg-black border-2 border-white/20 text-white font-mono-tech text-xs focus:outline-none focus:border-[#ffe600]"
                    />
                  </div>

                  <div>
                    <label className="text-white/70 block mb-1">
                      COLLEGE EMAIL *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="rollno@hitam.org"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-2.5 bg-black border-2 border-white/20 text-white font-mono-tech text-xs focus:outline-none focus:border-[#ffe600]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-white/70 block mb-1">ROLL NUMBER</label>
                    <input
                      type="text"
                      placeholder="23X81A0301"
                      value={formData.rollNumber}
                      onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                      className="w-full p-2.5 bg-black border-2 border-white/20 text-white font-mono-tech text-xs focus:outline-none focus:border-[#ffe600]"
                    />
                  </div>

                  <div>
                    <label className="text-white/70 block mb-1">DEPARTMENT</label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full p-2.5 bg-black border-2 border-white/20 text-white font-mono-tech text-xs focus:outline-none focus:border-[#ffe600]"
                    >
                      <option value="AERO / MECH">Mechanical / Aero</option>
                      <option value="ECE / EEE">ECE / Electrical</option>
                      <option value="CSE / IT">CSE / Information Tech</option>
                      <option value="AI / ML / DS">AI & Data Science</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-white/70 block mb-1">YEAR</label>
                    <select
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="w-full p-2.5 bg-black border-2 border-white/20 text-white font-mono-tech text-xs focus:outline-none focus:border-[#ffe600]"
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-white/70 block mb-1">
                    DESIRED SUB-TEAM SPECIALIZATION *
                  </label>
                  <select
                    value={formData.subsystem}
                    onChange={(e) => setFormData({ ...formData, subsystem: e.target.value })}
                    className="w-full p-2.5 bg-black border-2 border-white/20 text-white font-mono-tech text-xs focus:outline-none focus:border-[#ffe600]"
                  >
                    {SUB_TEAMS.map((t) => (
                      <option key={t.id} value={t.id}>
                        [{t.code}] {t.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-white/70 block mb-1">
                    STATEMENT OF MOTIVATION
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us what you want to research or build..."
                    value={formData.statement}
                    onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                    className="w-full p-2.5 bg-black border-2 border-white/20 text-white font-mono-tech text-xs focus:outline-none focus:border-[#ffe600] resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="arcade-btn arcade-btn-yellow w-full py-3.5 text-[10px] flex items-center justify-center gap-2 hover:scale-[1.02]"
                  >
                    <Send className="w-4 h-4 fill-black" />
                    <span>TRANSMIT MISSION CANDIDACY</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <div className="text-4xl mb-3">🚀</div>
                <div className="font-pixel text-xs text-[#00ff66] mb-2 uppercase">
                  TRANSMISSION CONFIRMED!
                </div>
                <h3 className="font-pixel text-base text-white mb-3">
                  Welcome aboard, Cadet {formData.fullName}!
                </h3>
                <p className="font-mono-tech text-xs text-slate-300 max-w-md mb-6 leading-relaxed">
                  Assigned Flight Hash:{' '}
                  <span className="text-[#ffe600] font-bold font-pixel text-[10px]">{packetHash}</span>.
                  Your dossier has been logged into the Oct 03 flight operations briefing.
                </p>

                <button
                  onClick={() => setSubmitted(false)}
                  className="arcade-btn py-2 px-4 text-[9px]"
                >
                  NEW APPLICATION
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
