import type {
  SubTeam,
  RocketBuild,
  MissionRecord,
  CrewMember,
  ChecklistItem,
  ClubPillar,
  BranchContribution,
  CapabilityPhase,
  RoadmapYear,
  CompoundingValue,
  StudentTakeaway,
} from '../types';

export const CLUB_METADATA = {
  clubNamePrimary: 'HRC',
  clubNameFull: 'HITAM ROCKETRY CLUB',
  clubNameAlt: 'HITAM Official Club Launch',
  tagline: 'Building Engineers. Advancing Innovation. Reaching Beyond.',
  subtitle: 'From Ideas to Flight · Official Club Launch',
  organization: 'Hyderabad Institute of Technology and Management (HITAM)',
  status: 'PRE-RELEASE // INAUGURAL CLUB LAUNCH PREPARATION',
  statusBadge: 'PRE-LAUNCH // GENESIS PHASE',
  launchNotice: 'OFFICIAL CLUB RELEASE UPCOMING',
  facultyFacilitator: 'Dr. Motilal Lakavat, HOD, Mechanical Engineering',
  coordinates: '17.593° N, 78.471° E',
  elevation: '592m MSL',
  missionControlRoom: 'HITAM ENGINEERING WORKSHOP // BLOCK-C',
  logoUrl: '/logo.png',
  registrationFormUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLSfTJdrssSSHRGgdXaueSd9zokNZIBEMoKkJE11rDCNyNagxIg/viewform?usp=publish-editor',
  socials: {
    linkedin: 'https://www.linkedin.com/company/145342832/admin/dashboard/',
    github: 'https://github.com/HITAM-Rocket-Club',
    instagram: 'https://www.instagram.com/hitamrocketryclub?xtok=d2U4NmViMng5cGln',
  },
  description:
    'We are not just creating a club. We are creating a platform where students from different branches come together to design, build, test and innovate.',
  speakerNoteOpening:
    'Today marks the official launch of the HITAM Rocketry Club. The purpose is practical: building engineers, advancing innovation, and reaching beyond the classroom through responsible engineering work.',
  coreManifesto:
    'Classroom theory becomes engineering when students build. The rocket is our shared system—uniting Mechanical, ECE, EEE, CSE, IT, and AI/Data Science on one platform for hands-on learning, experimentation, teamwork, and innovation.',
  governanceClause:
    'A Responsible Roadmap: Build capability before chasing complexity. Progress is subject to resources, approvals, faculty supervision, funding, safety, and student participation.',
};

/**
 * Slide 2: FROM THEORY TO PRACTICE
 * Classroom theory becomes engineering when students build.
 */
export const THEORY_TO_PRACTICE = {
  title: 'FROM THEORY TO PRACTICE',
  headline: 'Classroom theory becomes engineering when students build',
  speakerNote:
    'Bridge the gap between knowing a concept and making it work under real constraints. The club gives students one platform where theory becomes a project, and where different disciplines have to work together.',
  tenets: [
    {
      id: 'tenet-1',
      code: 'CORE-01',
      title: 'Apply Concepts to Real Projects',
      desc: 'Bridge the gap between textbook equations and physical hardware operating under real atmospheric and thermal constraints.',
      color: '#00f0ff',
    },
    {
      id: 'tenet-2',
      code: 'CORE-02',
      title: 'Multidisciplinary Collaboration',
      desc: 'Aerospace work demands multiple disciplines together—no single branch can engineer a flight vehicle alone.',
      color: '#ffe600',
    },
    {
      id: 'tenet-3',
      code: 'CORE-03',
      title: 'One Shared Learning Platform',
      desc: 'One unified institutional hub for hands-on prototyping, experimentation, team leadership, and student innovation.',
      color: '#00ff66',
    },
  ],
};

/**
 * Slide 3: WHAT STUDENTS TAKE WITH THEM
 * Students leave with proof they can build.
 */
export const STUDENT_TAKEAWAYS: StudentTakeaway[] = [
  {
    id: 'practical-skills',
    category: 'Practical Skills',
    summary: 'Hands-on engineering toolkits used in industry',
    skills: [
      'CAD Modeling & Simulation',
      'Electronics & PCB Design',
      'Embedded Programming',
      'Physical Fabrication & Assembly',
      'Hardware Testing & Diagnostics',
    ],
    badgeColor: '#00f0ff',
  },
  {
    id: 'project-experience',
    category: 'Project Experience',
    summary: 'Full lifecycle execution from sketch to flight',
    skills: [
      'Concept-to-Prototype Workflow',
      'Design Review Milestones',
      'Subsystem Bench Validation',
      'Iterative Engineering Troubleshooting',
      'Hardware-in-the-Loop Testing',
    ],
    badgeColor: '#ffe600',
  },
  {
    id: 'career-development',
    category: 'Career Development',
    summary: 'Tangible proof for resumes, research, and hiring',
    skills: [
      'Engineering Project Portfolios',
      'Hands-on Research Experience',
      'National Competition Projects',
      'Technical Paper Authorship',
      'Aerospace Industry Pathways',
    ],
    badgeColor: '#ff007f',
  },
  {
    id: 'professional-skills',
    category: 'Professional Skills',
    summary: 'Core leadership and collaborative competencies',
    skills: [
      'Technical Team Leadership',
      'Interdisciplinary Communication',
      'Collaborative Teamwork',
      'Safety Management & Risk Protocols',
      'Project Planning & Execution',
    ],
    badgeColor: '#00ff66',
  },
];

/**
 * Slide 4: ONE SHARED SYSTEM
 * One project. Many branches. One shared outcome.
 */
export const BRANCH_CONTRIBUTIONS: BranchContribution[] = [
  {
    id: 'mech',
    branch: 'Mechanical Engineering',
    code: 'MECH',
    subsystemRole: 'Airframe Structures & Aerodynamics',
    contributions: [
      'Structures',
      'Aerodynamics & CFD',
      'CAD 3D Modeling',
      'Materials Science',
      'Physical Fabrication',
    ],
    deliverables: [
      'Airframe structural shells & motor mount assemblies',
      'Aerodynamic fin geometry & Center-of-Pressure (CP) stability',
      'Composite material layups (fiberglass / carbon fiber)',
      'Machined recovery bays and retention bulkheads',
    ],
    color: '#00f0ff',
  },
  {
    id: 'ece',
    branch: 'Electronics & Communication',
    code: 'ECE',
    subsystemRole: 'Avionics, Sensors & RF Telemetry',
    contributions: [
      'Sensors',
      'Avionics',
      'Telemetry',
      'Embedded Systems',
    ],
    deliverables: [
      'Flight computer sensor integration (IMU, barometer, GPS)',
      'Long-range RF telemetry uplinks/downlinks & antennas',
      'Pyrotechnic deployment firing circuits & battery safety',
      'Real-time microcontroller firmware and communications',
    ],
    color: '#ff007f',
  },
  {
    id: 'eee',
    branch: 'Electrical & Electronics',
    code: 'EEE',
    subsystemRole: 'Power Systems & Instrumentation',
    contributions: [
      'Power Systems',
      'Electrical Integration',
      'Instrumentation',
    ],
    deliverables: [
      'Regulated avionics power distribution buses (LiPo)',
      'Static test stand load cell and sensor instrumentation',
      'Ground support umbilical power & safety interlocks',
      'High-reliability wiring harnesses and harness isolation',
    ],
    color: '#ffe600',
  },
  {
    id: 'cse_it',
    branch: 'CSE / IT',
    code: 'CSE / IT',
    subsystemRole: 'Flight Software & Ground Dashboards',
    contributions: [
      'Flight-Data Software',
      'Flight Simulation',
      'Mission Dashboards',
      'Ground Station Software',
    ],
    deliverables: [
      'Real-time ground control mission dashboard and UI',
      'Flight simulation software and trajectory computation',
      'Black-box telemetry packet parsing and flash storage',
      'Club digital infrastructure and cadet portals',
    ],
    color: '#00ff66',
  },
  {
    id: 'ai_ds',
    branch: 'AI / Data Science',
    code: 'AI / DS',
    subsystemRole: 'Data Analysis & Trajectory Modeling',
    contributions: [
      'Data Analysis',
      'Trajectory Modelling',
      'Sensor-Data Processing',
    ],
    deliverables: [
      'Post-flight sensor data fusion and Kalman filtering',
      'Atmospheric trajectory modeling and dispersion analysis',
      'Sensor calibration anomaly detection models',
      'Predictive simulation vs actual flight verification',
    ],
    color: '#a855f7',
  },
];

/**
 * Slide 5: CAPABILITY BEFORE COMPLEXITY
 * Build capability before chasing complexity.
 */
export const CAPABILITY_PHASES: CapabilityPhase[] = [
  {
    id: 'phase-1',
    phase: 'Phase 1 · Foundations',
    subtitle: 'Core Knowledge & Prototyping',
    activities: [
      'Technical workshops & safety orientation',
      'CAD modeling & aerodynamic simulations',
      'Small benchtop scale prototypes',
      'Basic sensor breadboarding & coding',
    ],
    safetyCheckpoint: 'Design Review & Risk Assessment',
    checkpointDetail:
      'Rigorous peer and faculty review of structural blueprints, CAD calculations, and preliminary hazard logs prior to fabrication.',
    color: '#00f0ff',
  },
  {
    id: 'phase-2',
    phase: 'Phase 2 · Subsystems',
    subtitle: 'Bench Testing & Sensor Demonstrations',
    activities: [
      'Avionics bench demonstrations & sensor logging',
      'Static load-cell thrust bench trials & sensor calibrations',
      'Deployment charge continuity and ejection validation',
      'Telemetry communication range trials',
    ],
    safetyCheckpoint: 'System Check & Test Readiness',
    checkpointDetail:
      'Formal check of electronics redundancy, battery voltage stability, structural load limits, and range safety protocols.',
    color: '#ffe600',
  },
  {
    id: 'phase-3',
    phase: 'Phase 3 · Integration',
    subtitle: 'System Integration & Supervised Flights',
    activities: [
      'Model-rocketry integrated airframe projects',
      'Supervised launches where legally permitted',
      'Multi-subsystem telemetry and flight data recording',
      'Post-flight hardware recovery & payload data extraction',
    ],
    safetyCheckpoint: 'Flight Review & Lessons Learned',
    checkpointDetail:
      'Comprehensive post-launch debrief analyzing flight data, telemetry logs, anomaly root causes, and continuous improvements.',
    color: '#00ff66',
  },
  {
    id: 'phase-longterm',
    phase: 'Long Term · Advanced Frontiers',
    subtitle: 'Research, Competitions & Industry Ties',
    activities: [
      'Advanced aerospace research investigations',
      'Participation in national collegiate rocketry competitions',
      'Collaborations with aerospace organizations & research labs',
      'Student-authored technical publications and patents',
    ],
    safetyCheckpoint: 'Operating Prerequisite Condition',
    checkpointDetail:
      'Condition: Dependent on resources, formal approvals, faculty supervision, funding, safety protocols, and student participation.',
    color: '#ff007f',
  },
];

/**
 * Slide 6: VALUE THAT COMPOUNDS
 * The club becomes an institutional asset.
 */
export const COMPOUNDING_VALUES: CompoundingValue[] = [
  {
    id: 'val-1',
    title: 'Research Culture',
    description: 'Fostering inquiry and scholarly aerospace research',
    bullets: [
      'Student-led technical investigations',
      'Potential research papers & conference publications',
      'Interdisciplinary research collaboration across departments',
    ],
    color: '#00f0ff',
  },
  {
    id: 'val-2',
    title: 'Institutional Visibility',
    description: 'Putting HITAM on the national aerospace map',
    bullets: [
      'Showcasing engineering builds at technical festivals',
      'Entering intercollegiate rocketry and aerospace competitions',
      'Public exhibitions and aerospace symposium presentations',
    ],
    color: '#ffe600',
  },
  {
    id: 'val-3',
    title: 'Industry Connections',
    description: 'Bridging academia with aerospace leaders',
    bullets: [
      'Guest expert lectures and industry tech talks',
      'Mentorship from practicing aerospace engineers',
      'Collaborative opportunities with aerospace organizations',
    ],
    color: '#ff007f',
  },
  {
    id: 'val-4',
    title: 'Project-Based Learning',
    description: 'Education driven by real physical challenges',
    bullets: [
      'Real engineering experience beyond classroom theory',
      'Authentic hardware debugging and cross-team workflows',
      'Hands-on fabrication, testing, and validation cycles',
    ],
    color: '#00ff66',
  },
  {
    id: 'val-5',
    title: 'Student Innovation',
    description: 'Catalyzing prototypes and technical entrepreneurship',
    bullets: [
      'Novel mechanical and electronic prototypes',
      'Interdisciplinary problem-solving across branches',
      'Pathways into aerospace startups and tech innovation',
    ],
    color: '#a855f7',
  },
];

/**
 * Slide 7: A RESPONSIBLE ROADMAP
 * Three years to establish, develop, and expand.
 */
export const RESPONSIBLE_ROADMAP: RoadmapYear[] = [
  {
    id: 'year-1',
    year: 'Year 1 · Establish',
    title: 'Foundation & Capacity Building',
    tagline: 'Build teams, train members, establish safety procedures, complete foundational projects',
    deliverables: [
      'Recruit and onboard inaugural interdisciplinary student cohorts',
      'Establish comprehensive lab safety procedures & operational guidelines',
      'Conduct core training workshops in CAD, simulation, and soldering',
      'Complete Phase 1 foundational bench projects and scale models',
    ],
    status: 'INAUGURAL YEAR TARGET',
    badgeColor: '#00f0ff',
  },
  {
    id: 'year-2',
    year: 'Year 2 · Develop',
    title: 'Integrated Subsystems & Supervised Testing',
    tagline: 'Build integrated prototypes, conduct supervised tests, present results',
    deliverables: [
      'Manufacture integrated multi-subsystem airframes and avionics bays',
      'Conduct supervised static bench test firings and sensor logging',
      'Execute model-rocketry test flights where legally approved',
      'Document and present technical results at institutional forums',
    ],
    status: 'DEVELOPMENT PHASE',
    badgeColor: '#ffe600',
  },
  {
    id: 'year-3',
    year: 'Year 3+ · Expand',
    title: 'Competitions & Advanced Research',
    tagline: 'Pursue competitions, research partnerships, external mentorship, more ambitious projects',
    deliverables: [
      'Enter national rocketry challenges and intercollegiate competitions',
      'Forge research partnerships with aerospace industry bodies',
      'Publish student-authored technical investigations',
      'Mentor successive generations of HITAM aerospace engineers',
    ],
    status: 'LONG-TERM VISION',
    badgeColor: '#00ff66',
  },
];

/**
 * Pre-launch Verification Checklist (Aligned with Slide 5 Safety Checkpoints)
 */
export const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'chk-1',
    code: 'GOV-01',
    system: 'GOVERNANCE',
    label: 'Faculty Facilitator Oversight & Institutional Approval',
    telemetryRef: 'DR. MOTILAL LAKAVAT // APPROVED',
    status: 'NOMINAL',
    detail: 'Faculty Facilitator Dr. Motilal Lakavat, HOD Mechanical Engineering, providing institutional oversight and safety guidelines.',
  },
  {
    id: 'chk-2',
    code: 'SAF-02',
    system: 'SAFETY PROTOCOL',
    label: 'Standard Operating Procedures & Hazard Assessment',
    telemetryRef: 'SAFETY AUDITED',
    status: 'NOMINAL',
    detail: 'Rigorous safety checkpoints established for each phase: design review, system readiness check, and flight review.',
  },
  {
    id: 'chk-3',
    code: 'SYS-03',
    system: 'ONE SHARED SYSTEM',
    label: 'Multidisciplinary Branch Integration Architecture',
    telemetryRef: '5 BRANCHES LINKED',
    status: 'NOMINAL',
    detail: 'Roles mapped across Mechanical, ECE, EEE, CSE/IT, and AI/Data Science for one shared aerospace project.',
  },
  {
    id: 'chk-4',
    code: 'CAD-04',
    system: 'PHASE 1 FOUNDATION',
    label: 'Foundational CAD & Trajectory Simulation Curriculum',
    telemetryRef: 'WORKSHOPS PLANNED',
    status: 'STANDBY',
    detail: 'Hands-on CAD modeling, aerodynamic simulation, and scale model prototyping curriculum prepared for incoming cohorts.',
  },
  {
    id: 'chk-5',
    code: 'AV-05',
    system: 'AVIONICS / TELEMETRY',
    label: 'Flight-Data Acquisition & Telemetry Architecture',
    telemetryRef: 'ARCHITECTURE READY',
    status: 'STANDBY',
    detail: 'Sensor integration blueprints, real-time telemetry dashboards, and black box logging frameworks defined.',
  },
  {
    id: 'chk-6',
    code: 'REC-06',
    system: 'CADET ENLISTMENT',
    label: 'Inaugural Student Cohort Recruitment Terminal',
    telemetryRef: 'APPLICATIONS OPEN',
    status: 'ARMED',
    detail: 'Cadet enlistment portal open to all engineering disciplines across HITAM.',
  },
];

/**
 * Faculty Facilitator & Founding Student Leadership Committee
 * Organizing the official launch of the HITAM Rocketry Club.
 */
export const CREW_ROSTER: CrewMember[] = [
  {
    id: 'crew-fac-motilal',
    name: 'Dr. Motilal Lakavat, PhD',
    callsign: 'FACILITATOR',
    role: 'Faculty Facilitator & Chief Mission Mentor',
    subsystem: 'HOD, Department of Mechanical Engineering, HITAM',
    classYear: 'Associate Professor & HOD',
    department: 'Dept of Mechanical Engineering, HITAM',
    phone: '+91 95503 72520',
    linkedin: 'https://www.linkedin.com/in/motilal-lakavat-phd-29772472?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
    since: '2026',
    status: 'FACULTY ADVISOR',
    avatarInitials: 'ML',
    photoUrl: '/team/faculty_motilal.png',
    badge: 'FACULTY FACILITATOR',
    bio: 'HOD and Associate Professor in Mechanical Engineering at HITAM with over two decades of academic and engineering expertise. As the official Faculty Facilitator of the HITAM Rocketry Club, Dr. Motilal provides institutional leadership, engineering safety governance, and academic sponsorship to build a multidisciplinary aerospace platform.',
    skills: [
      'Institutional Sponsorship',
      'Engineering Safety Governance',
      'Mechanical & Materials Science',
      'Aerospace Mentorship',
      'Advanced Manufacturing',
    ],
  },
  {
    id: 'crew-mokshith',
    name: 'M. Mokshith Reddy',
    callsign: 'LAUNCH-COORD',
    role: 'President & Launch Coordinator',
    subsystem: 'Founding Executive Committee // Mechanical & Airframe Lead',
    classYear: 'MECH ITP II',
    department: 'Mechanical Engineering (ITP)',
    email: '25e51m0302@hitam.org',
    phone: '8019817259',
    github: 'https://github.com/mokshithreddymavuri38-GIT',
    linkedin: 'https://www.linkedin.com/in/mokshith-reddy-mavuri-6251b02a9',
    since: '2026',
    status: 'CORE LEAD',
    avatarInitials: 'MR',
    photoUrl: '/team/mokshith.png',
    badge: 'PRESIDENT',
    bio: 'Mechanical Engineering student at HITAM leading the student initiative for the official launch of the HITAM Rocketry Club. Coordinating across branches to establish the one shared rocketry system, foundational airframe workshops, and safety documentation.',
    skills: [
      'Club Launch Coordination',
      'Airframe Structures & CAD',
      'Cross-Branch Collaboration',
      'Safety Checkpoint Protocols',
      'Mechanical Prototyping',
    ],
  },
  {
    id: 'crew-divyoshita',
    name: 'Divyoshita Dulam',
    callsign: 'VICE-PRES',
    role: 'Vice President',
    subsystem: 'Founding Executive Committee // Mechanical & Operations',
    classYear: 'MECH ITP II',
    department: 'Mechanical Engineering (ITP)',
    email: '25e51m0301@hitam.org',
    phone: '8333004995',
    github: 'https://github.com/DulamDivyoshita-08',
    linkedin: 'https://www.linkedin.com/in/divyoshita-dulam-612b153b4/',
    since: '2026',
    status: 'CORE LEAD',
    avatarInitials: 'DD',
    photoUrl: '/team/divyoshita.jpeg',
    badge: 'VICE PRESIDENT',
    bio: 'Mechanical Engineering student at HITAM passionate about technology, aerospace, and innovation. As Vice President of the HITAM Rocketry Club, she contributes to executive operations, hands-on engineering, collaborative problem-solving, and cross-branch platform growth.',
    skills: [
      'Executive Leadership',
      'Mechanical Engineering & CAD',
      'Operations & Coordination',
      'Hands-on Prototyping',
      'Collaborative Innovation',
    ],
  },
  {
    id: 'crew-athrva',
    name: 'Athrva Shantaram Pawar',
    callsign: 'TECH-LEAD',
    role: 'Technical Lead',
    subsystem: 'Founding Executive Committee // Systems Architecture',
    classYear: 'CSE ITP II',
    department: 'Computer Science & Engineering (ITP)',
    email: '25e51m0503@hitam.org',
    phone: '8019816259',
    github: 'https://github.com/athrvapawar14-arch',
    linkedin: 'https://www.linkedin.com/in/athrva-pawar-2a168519a/',
    since: '2026',
    status: 'CORE LEAD',
    avatarInitials: 'AP',
    photoUrl: '/team/athrva.jpeg',
    badge: 'TECH LEAD',
    bio: 'Computer Science Engineering student spearheading the technical architecture for flight-data telemetry, embedded systems integration, and open simulation tools for the club.',
    skills: [
      'Systems Architecture',
      'Embedded Avionics Software',
      'Telemetry Data Acquisition',
      'Simulation Modeling',
      'Interdisciplinary Integration',
    ],
  },
  {
    id: 'crew-pranitha',
    name: 'K. Laxmi Pranitha',
    callsign: 'SECRETARY',
    role: 'Secretary',
    subsystem: 'Founding Executive Committee // Operations & Documentation',
    classYear: 'CSE-ITP (2nd Year)',
    department: 'Computer Science & Engineering (ITP)',
    email: '25e51m0508@hitam.org',
    phone: '9346040357',
    github: 'https://github.com/LaxmiPranitha12',
    since: '2026',
    status: 'CORE LEAD',
    avatarInitials: 'LP',
    photoUrl: '/team/pranitha.jpg',
    badge: 'SECRETARY',
    bio: 'Computer Science Engineering student managing administrative logistics, recruitment operations, and technical documentation protocols for the upcoming club launch.',
    skills: [
      'Documentation & Compliance',
      'Cadet Recruitment Logistics',
      'Workshop Operations',
      'Communication Protocols',
      'Interdisciplinary Coordination',
    ],
  },
  {
    id: 'crew-shishir',
    name: 'Shishir Chandra Polisetty',
    callsign: 'TREASURER',
    role: 'Treasurer',
    subsystem: 'Founding Executive Committee // Resource & Procurement',
    classYear: 'MECH ITP II',
    department: 'Mechanical Engineering (ITP)',
    email: '25e51m0303@hitam.org',
    phone: '+91 6364020304',
    github: 'https://github.com/Shishir999z4',
    linkedin: 'https://www.linkedin.com/in/shishir-chandra987654321-d/',
    since: '2026',
    status: 'CORE LEAD',
    avatarInitials: 'SP',
    photoUrl: '/team/shishir.jpeg',
    badge: 'TREASURER',
    bio: 'Mechanical Engineering student overseeing budgeting, tool procurement, workshop resources, and financial planning for Year 1 foundational projects.',
    skills: [
      'Resource Procurement',
      'Budget Planning',
      'Lab Equipment Inventory',
      'Mechanical Fabrication',
      'Project Feasibility',
    ],
  },
  {
    id: 'crew-jose',
    name: 'Jose Raj Katikala',
    callsign: 'PR-LEAD',
    role: 'PR Lead',
    subsystem: 'Founding Executive Committee // Outreach & Media',
    classYear: 'CSE ITP II',
    department: 'Computer Science & Engineering (ITP)',
    email: '25e51m0506@hitam.org',
    phone: '8523811174',
    github: 'https://github.com/RoronoaJose',
    linkedin: 'https://www.linkedin.com/in/joserajkatikala',
    since: '2026',
    status: 'CORE LEAD',
    avatarInitials: 'JK',
    photoUrl: '/team/jose.png',
    badge: 'PR LEAD',
    bio: 'Computer Science Engineering student leading communications, digital media, and institutional outreach to connect HITAM students across all departments to the rocketry platform.',
    skills: [
      'Campus Outreach & Recruitment',
      'Digital Media & Communications',
      'Software Development',
      'Event Promotion',
      'Interdisciplinary Engagement',
    ],
  },
];

/**
 * Backward compatibility mappings for existing components
 * mapped cleanly to PPT content
 */
export const SUB_TEAMS: SubTeam[] = BRANCH_CONTRIBUTIONS.map((b) => ({
  id: b.id,
  code: b.code,
  name: b.branch,
  lead: `${b.code} Subsystem Lead`,
  focus: b.subsystemRole,
  currentResearch: b.deliverables.join(' · '),
  technologies: b.contributions,
  specs: b.deliverables.slice(0, 3).map((d, i) => ({
    label: `Deliverable 0${i + 1}`,
    value: d,
  })),
}));

export const CLUB_PILLARS: ClubPillar[] = THEORY_TO_PRACTICE.tenets.map((t) => ({
  id: t.id,
  code: t.code,
  title: t.title,
  summary: t.desc,
  whatWeDo: [t.desc],
  deliverables: 'Hands-on experiential learning and hardware proof.',
  badgeColor: t.color,
}));

/**
 * Phased Capability Targets (replacing fictitious past rocket builds)
 * mapped to Slide 5 & Slide 7
 */
export const ROCKET_BUILDS: RocketBuild[] = [
  {
    id: 'phase-1-model',
    designation: 'PHASE-01',
    name: 'Foundational Scale Demonstrator',
    class: 'Foundations & Small Prototypes',
    stage: 'Under Development',
    targetApogee: 'Workshops & Scale Models',
    motorType: 'Low-Impulse Educational / Aerodynamic Testbed',
    length: '0.65 m',
    diameter: '40 mm',
    dryMass: '320 g',
    propellant: 'Standard Educational Solid Motor',
    telemetryBand: 'Benchtop Sensor Logging',
    recovery: 'Single Parachute Ejection',
    description:
      'Phase 1 foundation project: CAD airframe models, CFD aerodynamic validation, and hands-on fabrication workshops for new student members.',
    highlights: [
      'Safety Checkpoint: Design Review and Risk Assessment',
      'Hands-on CAD modeling & open aerodynamic simulation',
      'Structural assembly and fin alignment training',
    ],
  },
  {
    id: 'phase-2-subsystems',
    designation: 'PHASE-02',
    name: 'Integrated Subsystem Testbed',
    class: 'Avionics Demonstrations & Bench Testing',
    stage: 'Under Development',
    targetApogee: 'Ground Bench & Static Test Stands',
    motorType: 'Instrumented Static Test Rig',
    length: '1.20 m',
    diameter: '66 mm',
    dryMass: '1.40 kg',
    propellant: 'Instrumented Static Test Bench',
    telemetryBand: '433 MHz LoRa + IMU Logging',
    recovery: 'Ejection Charge Continuity & Parachute Rig',
    description:
      'Phase 2 focus: Bench testing avionics sensor suites, microcontroller telemetry broadcasts, and instrumented static test firings.',
    highlights: [
      'Safety Checkpoint: System Check and Test Readiness',
      'Sensors, avionics, and telemetry demonstration',
      'Electrical power regulation and data logging',
    ],
  },
  {
    id: 'phase-3-model-rocket',
    designation: 'PHASE-03',
    name: 'Supervised Model Rocketry Vehicle',
    class: 'Integrated Model-Rocketry Platform',
    stage: 'Under Development',
    targetApogee: 'Supervised Launch (Where Legally Permitted)',
    motorType: 'Approved Model Rocketry Motor',
    length: '1.80 m',
    diameter: '76 mm',
    dryMass: '2.10 kg',
    propellant: 'Commercial Certified Solid Grain',
    telemetryBand: 'Integrated Ground Dashboard Telemetry',
    recovery: 'Dual Deployment System (Apogee & Main)',
    description:
      'Phase 3 integration: Model-rocketry projects with formal safety reviews and supervised launches where legally permitted.',
    highlights: [
      'Safety Checkpoint: Flight Review and Lessons Learned',
      'Multidisciplinary branch integration across the airframe',
      'Live flight-data software and ground dashboard telemetry',
    ],
  },
  {
    id: 'phase-longterm-target',
    designation: 'LONG-TERM',
    name: 'Advanced Research & Competition Vehicle',
    class: 'Advanced Collegiate Sounding Vehicle',
    stage: 'Under Development',
    targetApogee: 'National Aerospace Competitions',
    motorType: 'High-Power Certified Motor',
    length: '2.40 m',
    diameter: '102 mm',
    dryMass: '4.50 kg',
    propellant: 'Certified APCP Composite',
    telemetryBand: 'Multi-Band RF Telemetry & GPS',
    recovery: 'Dual Redundant Barometric Recovery',
    description:
      'Long-term ambition: Advanced research, intercollegiate competitions, and partnerships with aerospace industry organizations.',
    highlights: [
      'Prerequisite: Resources, approvals, supervision & funding',
      'Intercollegiate competitions and technical publications',
      'Advanced aerospace industry collaboration',
    ],
  },
];

/**
 * Roadmap Milestones (replacing fictitious past competition records)
 * mapped directly to Slide 7 & Slide 6
 */
export const MISSION_RECORDS: MissionRecord[] = [
  {
    id: 'rec-01',
    rank: '#01',
    missionName: 'Official Club Launch & Inaugural Induction',
    category: 'Year 1 · Establish',
    scoreOrAltitude: 'LAUNCH MILESTONE',
    date: 'YEAR 1',
    status: 'TARGET',
    metrics: 'Recruit founding cohort, train members, establish safety procedures',
  },
  {
    id: 'rec-02',
    rank: '#02',
    missionName: 'Phase 1 Foundations & Scale Prototypes',
    category: 'Capability Milestone',
    scoreOrAltitude: 'DESIGN REVIEW PASSED',
    date: 'PHASE 1',
    status: 'TARGET',
    metrics: 'Workshops, CAD models, aerodynamic simulations, and scale prototypes',
  },
  {
    id: 'rec-03',
    rank: '#03',
    missionName: 'Subsystems Avionics & Bench Testing',
    category: 'Phase 2 · Subsystems',
    scoreOrAltitude: 'TEST READINESS VERIFIED',
    date: 'PHASE 2',
    status: 'TARGET',
    metrics: 'Avionics demonstrations, sensor data collection, and bench validation',
  },
  {
    id: 'rec-04',
    rank: '#04',
    missionName: 'Supervised Model Rocketry Integration',
    category: 'Phase 3 · Integration',
    scoreOrAltitude: 'SUPERVISED FLIGHT',
    date: 'PHASE 3',
    status: 'TARGET',
    metrics: 'Formal safety reviews, integrated prototypes, supervised launches',
  },
  {
    id: 'rec-05',
    rank: '#05',
    missionName: 'Competitions & Aerospace Research',
    category: 'Year 3+ · Expand',
    scoreOrAltitude: 'NATIONAL PLATFORMS',
    date: 'YEAR 3+',
    status: 'TARGET',
    metrics: 'Collegiate competitions, research partnerships, and industry mentorship',
  },
];
