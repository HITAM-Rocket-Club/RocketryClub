export interface SubTeam {
  id: string;
  code: string;
  name: string;
  lead: string;
  focus: string;
  currentResearch: string;
  technologies: string[];
  specs: { label: string; value: string }[];
}

export interface RocketBuild {
  id: string;
  designation: string;
  name: string;
  class: string;
  stage: 'Active' | 'Under Development' | 'Flight Ready' | 'Flight Proven';
  targetApogee: string;
  motorType: string;
  length: string;
  diameter: string;
  dryMass: string;
  propellant: string;
  telemetryBand: string;
  recovery: string;
  description: string;
  highlights: string[];
}

export interface MissionRecord {
  id: string;
  rank: string;
  missionName: string;
  category: string;
  scoreOrAltitude: string;
  date: string;
  status: 'VERIFIED' | 'TARGET' | 'RECORD';
  metrics: string;
}

export interface CrewMember {
  id: string;
  name: string;
  callsign: string;
  role: string;
  subsystem: string;
  classYear?: string;
  department?: string;
  email?: string;
  phone?: string;
  github?: string;
  linkedin?: string;
  since: string;
  status: 'ACTIVE' | 'MISSION CONTROL' | 'FACULTY ADVISOR' | 'CORE LEAD';
  avatarInitials: string;
  photoUrl: string;
  badge: string;
  bio: string;
  skills?: string[];
}

export interface ChecklistItem {
  id: string;
  code: string;
  system: string;
  label: string;
  telemetryRef: string;
  status: 'NOMINAL' | 'STANDBY' | 'ARMED';
  detail: string;
}

export interface TelemetryState {
  altitudeMeters: number;
  velocityMs: number;
  stageName: string;
  fuelPercent: number;
  cabinPressureAtm: number;
  gForce: number;
  mach: number;
}

export interface ClubPillar {
  id: string;
  code: string;
  title: string;
  summary: string;
  whatWeDo: string[];
  deliverables: string;
  badgeColor: string;
}

