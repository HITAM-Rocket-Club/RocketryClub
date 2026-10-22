import * as THREE from 'three';

export interface RocketAssembly {
  rootGroup: THREE.Group;
  stages: Map<string, THREE.Group>;
  gridFinPivots: THREE.Group[];
  machDiamonds: THREE.Mesh[];
  engineThroats: THREE.Mesh[];
  flameParticles: THREE.Points;
  flamePositions: Float32Array;
  flameVelocities: Float32Array;
  flameCount: number;
}

// Helper to create stenciled canvas texture for technical markings
function createDecalTexture(text: string, subtext: string = ''): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#0a0d14';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Hazard border stripes
    ctx.fillStyle = '#ffe600';
    for (let x = 0; x < canvas.width; x += 48) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + 24, 0);
      ctx.lineTo(x, 24);
      ctx.closePath();
      ctx.fill();
    }

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 56px monospace';
    ctx.fillText(text, 36, 120);

    if (subtext) {
      ctx.fillStyle = '#00f0ff';
      ctx.font = '32px monospace';
      ctx.fillText(subtext, 36, 190);
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function buildFullMultiStageRocket(): RocketAssembly {
  const rootGroup = new THREE.Group();
  rootGroup.name = 'FullRocketStack';

  const stages = new Map<string, THREE.Group>();
  const gridFinPivots: THREE.Group[] = [];
  const machDiamonds: THREE.Mesh[] = [];
  const engineThroats: THREE.Mesh[] = [];

  // Master Scale Parameters — Bold, massive presence spanning full screen width
  const R = 1.45; // Master Hull Radius (Diameter = 2.9 units)

  // High-Visibility Aerospace Materials with Luminous Presence
  const whiteHullMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.18,
    metalness: 0.35,
    emissive: new THREE.Color(0x223344),
    emissiveIntensity: 0.3,
  });

  const darkTitaniumMat = new THREE.MeshStandardMaterial({
    color: 0x252e3b,
    roughness: 0.3,
    metalness: 0.85,
    emissive: new THREE.Color(0x111924),
    emissiveIntensity: 0.25,
  });

  const neonCyanMat = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
  });

  const neonYellowMat = new THREE.MeshBasicMaterial({
    color: 0xffe600,
  });

  const goldFoilMat = new THREE.MeshStandardMaterial({
    color: 0xe5b834,
    roughness: 0.2,
    metalness: 0.95,
    emissive: new THREE.Color(0x332600),
    emissiveIntensity: 0.35,
  });

  const glassMat = new THREE.MeshStandardMaterial({
    color: 0x00f0ff,
    roughness: 0.05,
    metalness: 0.2,
    transparent: true,
    opacity: 0.85,
    emissive: new THREE.Color(0x00f0ff),
    emissiveIntensity: 0.5,
  });

  const copperMat = new THREE.MeshStandardMaterial({
    color: 0xd46830,
    roughness: 0.3,
    metalness: 0.9,
  });

  const glowingEngineMat = new THREE.MeshBasicMaterial({
    color: 0xff6600,
  });

  // --------------------------------------------------------------------------
  // PART 0: NOSECONE & CREW CAPSULE (Y = +9.8) - Seamlessly connected
  // --------------------------------------------------------------------------
  const g0 = new THREE.Group();
  g0.name = 'stage_0_nosecone';
  g0.position.y = 9.8;

  // Aerodynamic Ogive Nosecone (RIGHT SIDE UP: Base radius R at bottom, tapering to 0 at top)
  const noseHeight = 3.2;
  const nosePoints: THREE.Vector2[] = [];
  for (let i = 0; i <= 30; i++) {
    const t = i / 30; // t = 0 (base) to t = 1 (apex)
    const y = t * noseHeight;
    // Tangent ogive curvature: R at bottom (t=0) tapering smoothly to 0 at tip (t=1)
    const r = R * Math.pow(1 - t, 0.75);
    nosePoints.push(new THREE.Vector2(r, y));
  }
  const noseGeo = new THREE.LatheGeometry(nosePoints, 36);
  const noseMesh = new THREE.Mesh(noseGeo, whiteHullMat);
  // Position nosecone base on top of capsule cylinder
  noseMesh.position.y = 1.0;
  g0.add(noseMesh);

  // Supersonic Pitot Sensor Needle Probe (Extends straight UP at apex, well within bounds)
  const probeGeo = new THREE.CylinderGeometry(0.04, 0.07, 0.9, 16);
  const probeMesh = new THREE.Mesh(probeGeo, darkTitaniumMat);
  probeMesh.position.y = 1.0 + noseHeight + 0.45;
  g0.add(probeMesh);

  // Glowing probe tip sensor bead
  const probeTipGeo = new THREE.SphereGeometry(0.07, 16, 16);
  const probeTip = new THREE.Mesh(probeTipGeo, neonCyanMat);
  probeTip.position.y = 1.0 + noseHeight + 0.9;
  g0.add(probeTip);

  // Crew Capsule Cylindrical Lower Body (Height 2.0: spans -1.0 to +1.0)
  const capBodyGeo = new THREE.CylinderGeometry(R, R, 2.0, 36);
  const capBodyMesh = new THREE.Mesh(capBodyGeo, whiteHullMat);
  capBodyMesh.position.y = 0.0;
  g0.add(capBodyMesh);

  // Large Optical Porthole Window with Glowing Interior Light
  const portholeRingGeo = new THREE.TorusGeometry(0.55, 0.08, 16, 36);
  const portholeRingMesh = new THREE.Mesh(portholeRingGeo, darkTitaniumMat);
  portholeRingMesh.position.set(0, 0.2, R + 0.02);
  g0.add(portholeRingMesh);

  const portholeGlassGeo = new THREE.CircleGeometry(0.5, 36);
  const portholeGlassMesh = new THREE.Mesh(portholeGlassGeo, glassMat);
  portholeGlassMesh.position.set(0, 0.2, R + 0.04);
  g0.add(portholeGlassMesh);

  // Interior Pilot Cabin Beam Light
  const cockpitLight = new THREE.PointLight(0x00f0ff, 2.5, 4.5);
  cockpitLight.position.set(0, 0.2, R - 0.3);
  g0.add(cockpitLight);

  // Glowing Neon Cyan Circumferential Seam Ring
  const seam0Geo = new THREE.TorusGeometry(R + 0.015, 0.03, 8, 36);
  const seam0Mesh = new THREE.Mesh(seam0Geo, neonCyanMat);
  seam0Mesh.rotation.x = Math.PI / 2;
  seam0Mesh.position.y = 1.0;
  g0.add(seam0Mesh);

  // 4 Forward RCS Reaction Control Thruster Blocks
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2;
    const rcsGroup = new THREE.Group();
    rcsGroup.position.set(Math.cos(angle) * (R + 0.04), 0.3, Math.sin(angle) * (R + 0.04));
    rcsGroup.rotation.y = -angle;

    const rcsBaseGeo = new THREE.BoxGeometry(0.2, 0.2, 0.16);
    const rcsBase = new THREE.Mesh(rcsBaseGeo, goldFoilMat);
    rcsGroup.add(rcsBase);

    // Dual Micro-nozzles
    for (let dy of [-0.05, 0.05]) {
      const rcsNozzleGeo = new THREE.ConeGeometry(0.06, 0.14, 12);
      const rcsNozzle = new THREE.Mesh(rcsNozzleGeo, darkTitaniumMat);
      rcsNozzle.rotation.x = Math.PI / 2;
      rcsNozzle.position.set(dy, 0, 0.12);
      rcsGroup.add(rcsNozzle);
    }
    g0.add(rcsGroup);
  }

  // Base Interstage Mating Collar Ring (Connects flush to Stage 1 at y = -1.0)
  const dockGeo = new THREE.TorusGeometry(R + 0.02, 0.05, 16, 36);
  const dockMesh = new THREE.Mesh(dockGeo, darkTitaniumMat);
  dockMesh.rotation.x = Math.PI / 2;
  dockMesh.position.y = -1.0;
  g0.add(dockMesh);

  stages.set('stage_0_nosecone', g0);
  rootGroup.add(g0);

  // --------------------------------------------------------------------------
  // PART 1: UPPER FAIRING & GANTRY UMBILICAL (Y = +7.4) - Connects to Stage 0
  // --------------------------------------------------------------------------
  const g1 = new THREE.Group();
  g1.name = 'stage_1_fairing';
  g1.position.y = 7.4;

  // Fairing Cylinder (Height 2.8: spans -1.4 to +1.4, top +1.4 touches Stage 0 base)
  const fairingGeo = new THREE.CylinderGeometry(R, R, 2.8, 36);
  const fairingMesh = new THREE.Mesh(fairingGeo, whiteHullMat);
  g1.add(fairingMesh);

  // Dual Vertical Pyrotechnic Split-Seam Channels
  for (let i = 0; i < 2; i++) {
    const angle = i * Math.PI;
    const seamGeo = new THREE.BoxGeometry(0.03, 2.82, 0.08);
    const seamMesh = new THREE.Mesh(seamGeo, neonCyanMat);
    seamMesh.position.set(Math.cos(angle) * (R + 0.01), 0, Math.sin(angle) * (R + 0.01));
    g1.add(seamMesh);
  }

  // Heavy Umbilical Service Arm QD (Quick Disconnect) Plate
  const umbPlateGeo = new THREE.BoxGeometry(0.4, 0.7, 0.2);
  const umbPlate = new THREE.Mesh(umbPlateGeo, darkTitaniumMat);
  umbPlate.position.set(R + 0.1, 0.2, 0);
  g1.add(umbPlate);

  // Dual Fluid/Data High-Pressure Couplers
  for (let dy of [-0.18, 0.18]) {
    const couplerGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.35, 16);
    const coupler = new THREE.Mesh(couplerGeo, copperMat);
    coupler.rotation.z = Math.PI / 2;
    coupler.position.set(R + 0.25, 0.2 + dy, 0);
    g1.add(coupler);
  }

  // Gantry Structural Clamping Ring
  const gantryRingGeo = new THREE.TorusGeometry(R + 0.08, 0.05, 16, 36);
  const gantryRing = new THREE.Mesh(gantryRingGeo, neonYellowMat);
  gantryRing.rotation.x = Math.PI / 2;
  gantryRing.position.y = 0.0;
  g1.add(gantryRing);

  // Joint Mating Ring at top and bottom
  const topMating1Geo = new THREE.TorusGeometry(R + 0.02, 0.04, 16, 36);
  const topMating1 = new THREE.Mesh(topMating1Geo, darkTitaniumMat);
  topMating1.rotation.x = Math.PI / 2;
  topMating1.position.y = 1.4;
  g1.add(topMating1);

  // Stenciled Decal: Upper Fairing
  const fairingDecalMat = new THREE.MeshBasicMaterial({
    map: createDecalTexture('FAIRING 01 // UMBILICAL', 'GROUND TELEMETRY LINK'),
    transparent: true,
  });
  const fairingDecal = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.4), fairingDecalMat);
  fairingDecal.position.set(0, 0.4, R + 0.02);
  g1.add(fairingDecal);

  stages.set('stage_1_fairing', g1);
  rootGroup.add(g1);

  // --------------------------------------------------------------------------
  // PART 2: AVIONICS BAY, IMU & HELIUM COPV (Y = +5.0) - Connects to Stage 1
  // --------------------------------------------------------------------------
  const g2 = new THREE.Group();
  g2.name = 'stage_2_avionics';
  g2.position.y = 5.0;

  // Avionics Shell Barrel with Exposed Instrument Bay (Height 2.0: spans -1.0 to +1.0)
  const avioRingGeo = new THREE.CylinderGeometry(R, R, 2.0, 36);
  const avioRingMesh = new THREE.Mesh(avioRingGeo, darkTitaniumMat);
  g2.add(avioRingMesh);

  // Top & Bottom Flush Mating Collars
  for (let dy of [-1.0, 1.0]) {
    const collarGeo = new THREE.TorusGeometry(R + 0.02, 0.04, 16, 36);
    const collar = new THREE.Mesh(collarGeo, neonCyanMat);
    collar.rotation.x = Math.PI / 2;
    collar.position.y = dy;
    g2.add(collar);
  }

  // Central Gold-Foil Flight Computer Heatsink Rack
  const rackGeo = new THREE.BoxGeometry(0.9, 1.6, 0.9);
  const rackMesh = new THREE.Mesh(rackGeo, goldFoilMat);
  g2.add(rackMesh);

  // 4 Large Carbon-Overwrapped Pressure Vessel (COPV) Helium Spheres
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2 + Math.PI / 4;
    const copvGeo = new THREE.SphereGeometry(0.38, 20, 20);
    const copvMat = new THREE.MeshStandardMaterial({
      color: 0x141820,
      roughness: 0.65,
      metalness: 0.5,
    });
    const copvMesh = new THREE.Mesh(copvGeo, copvMat);
    copvMesh.position.set(Math.cos(angle) * (R * 0.65), 0, Math.sin(angle) * (R * 0.65));

    // Equatorial Brass Reinforcement Band
    const bandGeo = new THREE.TorusGeometry(0.385, 0.035, 8, 24);
    const bandMesh = new THREE.Mesh(bandGeo, copperMat);
    bandMesh.rotation.x = Math.PI / 2;
    copvMesh.add(bandMesh);

    g2.add(copvMesh);
  }

  // Star Tracker Optical Hood & Microwave Antennas
  const trackerGeo = new THREE.ConeGeometry(0.14, 0.4, 16);
  const trackerMesh = new THREE.Mesh(trackerGeo, darkTitaniumMat);
  trackerMesh.rotation.z = -Math.PI / 3;
  trackerMesh.position.set(R + 0.1, 0.2, 0.3);
  g2.add(trackerMesh);

  // Diagnostic Status Neon Indicator Strip
  const ledGeo = new THREE.BoxGeometry(0.06, 0.8, 0.04);
  const ledMesh = new THREE.Mesh(ledGeo, neonCyanMat);
  ledMesh.position.set(R + 0.02, 0, -0.3);
  g2.add(ledMesh);

  stages.set('stage_2_avionics', g2);
  rootGroup.add(g2);

  // --------------------------------------------------------------------------
  // PART 3: INTERSTAGE TRUSS & TITANIUM GRID FINS (Y = +2.8) - Connects to Stage 2
  // --------------------------------------------------------------------------
  const g3 = new THREE.Group();
  g3.name = 'stage_3_interstage';
  g3.position.y = 2.8;

  // Upper & Lower Machined Collars (Spans -1.2 to +1.2, connects flush to Stage 2 and Stage 4)
  const topCollarGeo = new THREE.CylinderGeometry(R, R, 0.2, 36);
  const topCollar = new THREE.Mesh(topCollarGeo, darkTitaniumMat);
  topCollar.position.y = 1.1;
  g3.add(topCollar);

  const botCollarGeo = new THREE.CylinderGeometry(R, R, 0.2, 36);
  const botCollar = new THREE.Mesh(botCollarGeo, darkTitaniumMat);
  botCollar.position.y = -1.1;
  g3.add(botCollar);

  // Heavy Titanium Open-Lattice Truss Framework (20 criss-cross struts)
  const strutCount = 20;
  for (let i = 0; i < strutCount; i++) {
    const angle1 = (i * 2 * Math.PI) / strutCount;
    const angle2 = ((i + 1) * 2 * Math.PI) / strutCount;
    const r = R - 0.02;

    const x1 = Math.cos(angle1) * r;
    const z1 = Math.sin(angle1) * r;
    const x2 = Math.cos(angle2) * r;
    const z2 = Math.sin(angle2) * r;

    // Upward strut
    const start = new THREE.Vector3(x1, -1.0, z1);
    const end = new THREE.Vector3(x2, 1.0, z2);
    const dir = new THREE.Vector3().subVectors(end, start);
    const length = dir.length();

    const strutGeo = new THREE.CylinderGeometry(0.04, 0.04, length, 8);
    const strutMesh = new THREE.Mesh(strutGeo, darkTitaniumMat);
    strutMesh.position.copy(start).addScaledVector(dir, 0.5);
    strutMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
    g3.add(strutMesh);

    // Cross strut
    const start2 = new THREE.Vector3(x2, -1.0, z2);
    const end2 = new THREE.Vector3(x1, 1.0, z1);
    const dir2 = new THREE.Vector3().subVectors(end2, start2);
    const strutMesh2 = new THREE.Mesh(strutGeo, darkTitaniumMat);
    strutMesh2.position.copy(start2).addScaledVector(dir2, 0.5);
    strutMesh2.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir2.clone().normalize());
    g3.add(strutMesh2);
  }

  // 4 MASSIVE Deployable Titanium Grid Fins with Articulated Pivots
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2;
    const finPivot = new THREE.Group();
    finPivot.position.set(Math.cos(angle) * (R + 0.08), 0.0, Math.sin(angle) * (R + 0.08));
    finPivot.rotation.y = -angle;

    // Heavy Hinge Bracket
    const hingeGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.35, 16);
    const hingeMesh = new THREE.Mesh(hingeGeo, darkTitaniumMat);
    hingeMesh.rotation.z = Math.PI / 2;
    finPivot.add(hingeMesh);

    // Large Titanium Grid Fin Outer Frame (Waffle structure)
    const frameGeo = new THREE.BoxGeometry(1.2, 0.95, 0.08);
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x445566,
      metalness: 0.95,
      roughness: 0.25,
      wireframe: true, // Authentic waffle grid pattern
    });
    const frameMesh = new THREE.Mesh(frameGeo, frameMat);
    frameMesh.position.set(0, 0, 0.65);
    finPivot.add(frameMesh);

    // Solid Edge Perimeter Trim
    const edgeGeo = new THREE.BoxGeometry(1.24, 0.98, 0.04);
    const edgeMat = new THREE.MeshStandardMaterial({
      color: 0x1f242c,
      metalness: 0.9,
      roughness: 0.35,
    });
    const edgeMesh = new THREE.Mesh(edgeGeo, edgeMat);
    edgeMesh.position.set(0, 0, 0.65);
    finPivot.add(edgeMesh);

    // Glowing Neon Edge Line on Grid Fin
    const neonFinEdgeGeo = new THREE.BoxGeometry(1.25, 0.03, 0.06);
    const neonFinEdge = new THREE.Mesh(neonFinEdgeGeo, neonCyanMat);
    neonFinEdge.position.set(0, 0.49, 0.65);
    finPivot.add(neonFinEdge);

    gridFinPivots.push(finPivot);
    g3.add(finPivot);
  }

  // 4 Pneumatic Staging Pushers
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2 + Math.PI / 4;
    const pusherGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.2, 12);
    const pusher = new THREE.Mesh(pusherGeo, copperMat);
    pusher.position.set(Math.cos(angle) * (R * 0.75), 0.2, Math.sin(angle) * (R * 0.75));
    g3.add(pusher);
  }

  stages.set('stage_3_interstage', g3);
  rootGroup.add(g3);

  // --------------------------------------------------------------------------
  // PART 4: STAGE-2 UPPER PROPULSION & CRYOGENIC LOX TANK (Y = -0.2) - Connects to Stage 3
  // --------------------------------------------------------------------------
  const g4 = new THREE.Group();
  g4.name = 'stage_4_upper_lox';
  g4.position.y = -0.2;

  // Upper Stage Cryogenic Tank Cylinder (Height 3.6: spans -1.8 to +1.8, top +1.8 touches Stage 3 base)
  const loxTankGeo = new THREE.CylinderGeometry(R, R, 3.6, 36);
  const loxTankMesh = new THREE.Mesh(loxTankGeo, whiteHullMat);
  g4.add(loxTankMesh);

  // Visible Internal Anti-Slosh Baffle Rings (Luminescent cyan)
  for (let dy of [-1.0, 0, 1.0]) {
    const baffleGeo = new THREE.RingGeometry(0.4, R - 0.02, 32);
    const baffleMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
    });
    const baffle = new THREE.Mesh(baffleGeo, baffleMat);
    baffle.rotation.x = Math.PI / 2;
    baffle.position.y = dy;
    g4.add(baffle);
  }

  // Vacuum Expansion Rocket Engine Nozzle (Flared de Laval bell tucked inside)
  const vacPoints: THREE.Vector2[] = [];
  for (let i = 0; i <= 20; i++) {
    const t = i / 20;
    const r = 0.25 + Math.pow(t, 1.6) * 0.75;
    const y = -t * 1.5;
    vacPoints.push(new THREE.Vector2(r, y));
  }
  const vacBellGeo = new THREE.LatheGeometry(vacPoints, 32);
  const vacBellMat = new THREE.MeshStandardMaterial({
    color: 0x22262d,
    roughness: 0.35,
    metalness: 0.95,
  });
  const vacBell = new THREE.Mesh(vacBellGeo, vacBellMat);
  vacBell.position.y = -1.7;
  g4.add(vacBell);

  // External Insulated Cryogenic Feedline Pipe
  const cryoPipeGeo = new THREE.CylinderGeometry(0.08, 0.08, 3.6, 16);
  const cryoPipe = new THREE.Mesh(cryoPipeGeo, darkTitaniumMat);
  cryoPipe.position.set(R + 0.06, 0, 0);
  g4.add(cryoPipe);

  // Flush Staging Joint Ring
  const joint4Geo = new THREE.TorusGeometry(R + 0.02, 0.04, 16, 36);
  const joint4 = new THREE.Mesh(joint4Geo, darkTitaniumMat);
  joint4.rotation.x = Math.PI / 2;
  joint4.position.y = 1.8;
  g4.add(joint4);

  // Stenciled Decal: Cryogenic LOX Tank
  const loxDecalMat = new THREE.MeshBasicMaterial({
    map: createDecalTexture('STAGE 2 // LOX TANK', 'PRESSURIZED CRYOGENIC PROPELLANT'),
    transparent: true,
  });
  const loxDecal = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 0.45), loxDecalMat);
  loxDecal.position.set(0, 0.5, R + 0.02);
  g4.add(loxDecal);

  stages.set('stage_4_upper_lox', g4);
  rootGroup.add(g4);

  // --------------------------------------------------------------------------
  // PART 5: CORE BOOSTER FUSELAGE & CABLE RACEWAY (Y = -5.2) - Connects to Stage 4
  // --------------------------------------------------------------------------
  const g5 = new THREE.Group();
  g5.name = 'stage_5_booster_core';
  g5.position.y = -5.2;

  // Massive Core Booster Tank Barrel (Height 6.4: spans -3.2 to +3.2, top +3.2 touches Stage 4 base)
  const coreBarrelGeo = new THREE.CylinderGeometry(R, R, 6.4, 36);
  const coreBarrelMesh = new THREE.Mesh(coreBarrelGeo, whiteHullMat);
  g5.add(coreBarrelMesh);

  // Full-Length External Cable Raceway Conduit Box
  const racewayGeo = new THREE.BoxGeometry(0.18, 6.4, 0.16);
  const racewayMesh = new THREE.Mesh(racewayGeo, darkTitaniumMat);
  racewayMesh.position.set(0, 0, R + 0.08);
  g5.add(racewayMesh);

  // Longitudinal Milling Stringers (8 prominent vertical ribs)
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4;
    const ribGeo = new THREE.BoxGeometry(0.04, 6.38, 0.06);
    const ribMesh = new THREE.Mesh(ribGeo, darkTitaniumMat);
    ribMesh.position.set(Math.cos(angle) * (R + 0.02), 0, Math.sin(angle) * (R + 0.02));
    ribMesh.rotation.y = -angle;
    g5.add(ribMesh);
  }

  // Glowing Circumferential Ring Ribs
  for (let dy of [-2.2, -0.7, 0.7, 2.2]) {
    const stiffRingGeo = new THREE.TorusGeometry(R + 0.02, 0.035, 8, 36);
    const stiffRing = new THREE.Mesh(stiffRingGeo, neonCyanMat);
    stiffRing.rotation.x = Math.PI / 2;
    stiffRing.position.y = dy;
    g5.add(stiffRing);
  }

  // Giant Stenciled Club Decal
  const clubDecalMat = new THREE.MeshBasicMaterial({
    map: createDecalTexture('HRC / ASTRA', 'HITAM ROCKETRY CLUB // STAGE-1 CORE'),
    transparent: true,
  });
  const clubDecal = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 0.55), clubDecalMat);
  clubDecal.position.set(0, 1.2, R + 0.02);
  g5.add(clubDecal);

  // Opposite Decal
  const clubDecal2 = clubDecal.clone();
  clubDecal2.position.set(0, -1.2, -(R + 0.02));
  clubDecal2.rotation.y = Math.PI;
  g5.add(clubDecal2);

  stages.set('stage_5_booster_core', g5);
  rootGroup.add(g5);

  // --------------------------------------------------------------------------
  // PART 6: AERODYNAMIC FIN CANISTER & TVC GIMBAL (Y = -9.6) - Connects to Stage 5
  // --------------------------------------------------------------------------
  const g6 = new THREE.Group();
  g6.name = 'stage_6_fin_canister';
  g6.position.y = -9.6;

  // Aft Boat-Tail Skirt (Height 2.4: spans -1.2 to +1.2, top +1.2 touches Stage 5 base)
  const skirtGeo = new THREE.CylinderGeometry(R, R * 1.08, 2.4, 36);
  const skirtMesh = new THREE.Mesh(skirtGeo, darkTitaniumMat);
  g6.add(skirtMesh);

  // Mating Ring Collar at Top
  const joint6Geo = new THREE.TorusGeometry(R + 0.02, 0.04, 16, 36);
  const joint6 = new THREE.Mesh(joint6Geo, darkTitaniumMat);
  joint6.rotation.x = Math.PI / 2;
  joint6.position.y = 1.2;
  g6.add(joint6);

  // 4 GIANT Swept Delta Aerodynamic Fins (Span out to 3.8 units!)
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2;
    const finGroup = new THREE.Group();
    finGroup.rotation.y = angle;

    // Large swept delta fin shape
    const finShape = new THREE.Shape();
    finShape.moveTo(R * 0.95, -1.1);
    finShape.lineTo(3.6, -1.2);  // Tip trailing edge
    finShape.lineTo(3.2, 0.1);   // Tip leading edge
    finShape.lineTo(R * 0.95, 1.0); // Root leading edge
    finShape.closePath();

    const extrudeSettings = {
      depth: 0.08,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.03,
      bevelThickness: 0.03,
    };
    const finGeo = new THREE.ExtrudeGeometry(finShape, extrudeSettings);
    const finMat = new THREE.MeshStandardMaterial({
      color: 0x1a212b,
      roughness: 0.3,
      metalness: 0.85,
    });
    const finMesh = new THREE.Mesh(finGeo, finMat);
    finMesh.position.z = -0.04;
    finGroup.add(finMesh);

    // Glowing Neon Cyan Leading Edge Highlight
    const edgeHighlightGeo = new THREE.CylinderGeometry(0.03, 0.03, 2.5, 8);
    const edgeHighlight = new THREE.Mesh(edgeHighlightGeo, neonCyanMat);
    edgeHighlight.position.set(2.4, 0.55, 0);
    edgeHighlight.rotation.z = -0.64;
    finGroup.add(edgeHighlight);

    g6.add(finGroup);
  }

  // 4 Hydraulic TVC (Thrust Vector Control) Actuator Cylinders
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2 + Math.PI / 4;
    const pistonGroup = new THREE.Group();
    pistonGroup.position.set(Math.cos(angle) * (R * 0.75), -0.6, Math.sin(angle) * (R * 0.75));

    const cylGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.8, 12);
    const cylMesh = new THREE.Mesh(cylGeo, darkTitaniumMat);
    pistonGroup.add(cylMesh);

    const rodGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.6, 12);
    const rodMesh = new THREE.Mesh(rodGeo, copperMat);
    rodMesh.position.y = -0.4;
    pistonGroup.add(rodMesh);

    g6.add(pistonGroup);
  }

  stages.set('stage_6_fin_canister', g6);
  rootGroup.add(g6);

  // --------------------------------------------------------------------------
  // PART 7: MACHINED THRUST PUCK & TURBOPUMPS (Y = -11.4) - Connects to Stage 6
  // --------------------------------------------------------------------------
  const g7 = new THREE.Group();
  g7.name = 'stage_7_turbopump_puck';
  g7.position.y = -11.4;

  // Heavy Machined Octagonal Titanium Thrust Puck Plate (Height 1.2: spans -0.6 to +0.6)
  const puckGeo = new THREE.CylinderGeometry(R * 1.08, R * 1.04, 1.2, 8);
  const puckMat = new THREE.MeshStandardMaterial({
    color: 0x242a34,
    metalness: 0.9,
    roughness: 0.35,
  });
  const puckMesh = new THREE.Mesh(puckGeo, puckMat);
  g7.add(puckMesh);

  // Dual Large High-Pressure Turbopump Assemblies
  for (let side of [-1, 1]) {
    const pumpGroup = new THREE.Group();
    pumpGroup.position.set(side * 0.75, -0.2, 0);

    // Impeller casing
    const casingGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.45, 16);
    const casing = new THREE.Mesh(casingGeo, darkTitaniumMat);
    pumpGroup.add(casing);

    // Turbine scroll torus
    const scrollGeo = new THREE.TorusGeometry(0.28, 0.1, 12, 24);
    const scroll = new THREE.Mesh(scrollGeo, copperMat);
    scroll.rotation.x = Math.PI / 2;
    pumpGroup.add(scroll);

    // Preburner exhaust duct
    const ductGeo = new THREE.CylinderGeometry(0.08, 0.1, 0.7, 12);
    const duct = new THREE.Mesh(ductGeo, darkTitaniumMat);
    duct.position.set(0, -0.4, 0.2);
    duct.rotation.x = 0.4;
    pumpGroup.add(duct);

    g7.add(pumpGroup);
  }

  // Braided Propellant Feed Toruses
  const manifoldGeo = new THREE.TorusGeometry(R * 0.75, 0.08, 12, 32);
  const manifold = new THREE.Mesh(manifoldGeo, copperMat);
  manifold.rotation.x = Math.PI / 2;
  manifold.position.y = -0.4;
  g7.add(manifold);

  stages.set('stage_7_turbopump_puck', g7);
  rootGroup.add(g7);

  // --------------------------------------------------------------------------
  // PART 8: 5-ENGINE RAPTOR CLUSTER & SUPERSONIC PLASMA PLUME (Y = -12.0) - Connects to Stage 7
  // --------------------------------------------------------------------------
  const g8 = new THREE.Group();
  g8.name = 'stage_8_engine_cluster';
  g8.position.y = -12.0;

  // Gimbal Mount Top Interface Plate (Touches Stage 7 bottom at y = 0.0)
  const mountPlateGeo = new THREE.CylinderGeometry(R * 1.04, R * 1.04, 0.15, 32);
  const mountPlate = new THREE.Mesh(mountPlateGeo, darkTitaniumMat);
  mountPlate.position.y = -0.075;
  g8.add(mountPlate);

  // Large De Laval Rocket Engine Bell (Radius 0.42, Height 2.2)
  const bellPoints: THREE.Vector2[] = [];
  for (let i = 0; i <= 24; i++) {
    const t = i / 24;
    let r = 0;
    if (t < 0.18) {
      r = 0.32 - t * 0.8;
    } else {
      const et = (t - 0.18) / 0.82;
      r = 0.16 + Math.pow(et, 1.4) * 0.48;
    }
    const y = -t * 2.2;
    bellPoints.push(new THREE.Vector2(r, y));
  }
  const engineBellGeo = new THREE.LatheGeometry(bellPoints, 32);
  const engineBellMat = new THREE.MeshStandardMaterial({
    color: 0x14181f,
    metalness: 0.95,
    roughness: 0.25,
  });

  // 5 Engine Cluster (1 Center + 4 Perimeter in cross formation)
  const enginePositions: [number, number][] = [
    [0, 0],
    [0.72, 0],
    [-0.72, 0],
    [0, 0.72],
    [0, -0.72],
  ];

  for (const [ex, ez] of enginePositions) {
    const engineGroup = new THREE.Group();
    engineGroup.position.set(ex, -0.1, ez);

    // Bell Nozzle
    const bellMesh = new THREE.Mesh(engineBellGeo, engineBellMat);
    engineGroup.add(bellMesh);

    // Stiffener lip at bell exit
    const lipGeo = new THREE.TorusGeometry(0.64, 0.04, 8, 32);
    const lipMesh = new THREE.Mesh(lipGeo, darkTitaniumMat);
    lipMesh.rotation.x = Math.PI / 2;
    lipMesh.position.y = -2.2;
    engineGroup.add(lipMesh);

    // Incandescent Glowing Combustion Throat
    const throatGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const throatMesh = new THREE.Mesh(throatGeo, glowingEngineMat);
    throatMesh.position.y = -0.4;
    engineThroats.push(throatMesh);
    engineGroup.add(throatMesh);

    // High-Intensity Point Light per Engine
    const throatLight = new THREE.PointLight(0xff6600, 3.5, 6.0);
    throatLight.position.y = -0.6;
    engineGroup.add(throatLight);

    g8.add(engineGroup);
  }

  // 5 Supersonic Shock Diamonds (Mach Diamonds in exhaust stream)
  for (let i = 0; i < 5; i++) {
    const mdGeo = new THREE.OctahedronGeometry(0.35 - i * 0.04, 0);
    const mdMat = new THREE.MeshBasicMaterial({
      color: i % 2 === 0 ? 0x00f0ff : 0xff6600,
      transparent: true,
      opacity: 0.9,
    });
    const md = new THREE.Mesh(mdGeo, mdMat);
    md.scale.set(1, 2.5, 1);
    md.position.set(0, -2.5 - i * 0.9, 0);
    machDiamonds.push(md);
    g8.add(md);
  }

  // Outer Supersonic Plasma Exhaust Cone
  const plumeConeGeo = new THREE.ConeGeometry(1.6, 6.0, 32, 1, true);
  const plumeConeMat = new THREE.MeshBasicMaterial({
    color: 0xff3300,
    transparent: true,
    opacity: 0.35,
    side: THREE.DoubleSide,
  });
  const plumeCone = new THREE.Mesh(plumeConeGeo, plumeConeMat);
  plumeCone.rotation.x = Math.PI;
  plumeCone.position.set(0, -5.3, 0);
  g8.add(plumeCone);

  // Dynamic 3D Particle Fire Plume (450 roaring embers and flame particles)
  const flameCount = 450;
  const flameGeo = new THREE.BufferGeometry();
  const flamePositions = new Float32Array(flameCount * 3);
  const flameVelocities = new Float32Array(flameCount * 3);
  const flameColors = new Float32Array(flameCount * 3);

  for (let i = 0; i < flameCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r = Math.random() * 0.9;
    flamePositions[i * 3] = Math.cos(angle) * r;
    flamePositions[i * 3 + 1] = -0.5 - Math.random() * 8.5;
    flamePositions[i * 3 + 2] = Math.sin(angle) * r;

    flameVelocities[i * 3] = (Math.random() - 0.5) * 0.06;
    flameVelocities[i * 3 + 1] = -0.25 - Math.random() * 0.35;
    flameVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.06;

    const t = Math.random();
    if (t > 0.6) {
      flameColors[i * 3] = 1.0;
      flameColors[i * 3 + 1] = 0.95;
      flameColors[i * 3 + 2] = 0.2; // Intense Yellow
    } else if (t > 0.25) {
      flameColors[i * 3] = 1.0;
      flameColors[i * 3 + 1] = 0.35;
      flameColors[i * 3 + 2] = 0.0; // Roaring Orange
    } else {
      flameColors[i * 3] = 0.0;
      flameColors[i * 3 + 1] = 0.94;
      flameColors[i * 3 + 2] = 1.0; // Cyan shock plasma
    }
  }

  flameGeo.setAttribute('position', new THREE.BufferAttribute(flamePositions, 3));
  flameGeo.setAttribute('color', new THREE.BufferAttribute(flameColors, 3));

  const flameMat = new THREE.PointsMaterial({
    size: 0.42,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
  });

  const flameParticles = new THREE.Points(flameGeo, flameMat);
  g8.add(flameParticles);

  stages.set('stage_8_engine_cluster', g8);
  rootGroup.add(g8);

  return {
    rootGroup,
    stages,
    gridFinPivots,
    machDiamonds,
    engineThroats,
    flameParticles,
    flamePositions,
    flameVelocities,
    flameCount,
  };
}
