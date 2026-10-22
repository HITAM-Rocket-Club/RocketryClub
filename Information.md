# HRC / Astra — Rocketry Club Website: Concept Doc

## Project Basics

| Field | Details |
|---|---|
| **Club Name** | HRC (HITAM Rocketry Club) — alternative name "Astra" being considered. Not finalized yet. |
| **Logo** | Not finalized. Use the group/club icon placeholder for now, or a temporary icon of choice. |
| **Launch Date** | Site launch targeted for **Oct 3rd, ~2:00 PM** (tentative) |
| **Faculty** | Motilal Sir — placeholder with photo + name for now, more details to be added later |
| **Team Leaders / Core Members** | Same as above — placeholder photo + name per person until more info is available |

## Club Description

A student-led club for exploring the field of aerospace engineering and participating in various aerospace-based competitions. Primary focus is on researching different areas of rocketry through individual sub-teams, alongside general club activities.

---

## Design Style: Brutalist / Technical-Doc

Raw, spec-sheet-like aesthetic — exposed grid lines, monospace typography, minimal color (mostly black/white with one accent), unstyled-looking buttons, generous whitespace. Reads like actual rocket schematics/engineering documentation rather than a polished marketing site.

**Reference styles considered (for context):**
1. NASA/SpaceX "Mission Control" — dark navy/black, white + safety-orange accents, monospace data readouts
2. Retro NASA / Apollo-era poster style — warm muted tones, flat illustration
3. **Brutalist/technical-doc (chosen)** — raw, blueprint-like, engineering-authentic
4. Dark glassmorphism / space HUD — frosted glass, glowing accents
5. Blueprint/schematic style — technical drawing linework, good as accent within Projects section

---

## Core Concept: "Inside the Rocket → Launch → Ascent" Scroll Narrative

The site is structured as one continuous scroll-driven story, using the user's scroll position to move the rocket from **inside the capsule → onto the launch pad → ignition → ascent through space**, with real site content mapped onto each stage.

### Scene-by-Scene Breakdown

1. **Cockpit/Interior View** (Hero)
   - User starts "inside" the rocket, looking out through a porthole/window
   - Minimal line-art porthole frame + small HUD readout (Altitude: 0m, Status: PRE-LAUNCH, Fuel: 100%) in monospace

2. **Pulling Back / Hatch Opening**
   - View widens/pulls back to reveal the launch pad
   - Club name/tagline revealed like stenciled text on the rocket hull (technical, small-print styling)

3. **Pre-Launch Checklist**
   - Literal checklist UI — monospace list items that check themselves off as the user scrolls
   - e.g. ✓ FUEL LOADED · ✓ TELEMETRY LINK · ✓ RECOVERY SYSTEM ARMED
   - Good opportunity to sneak in real technical facts about actual builds

4. **Ignition / Launch**
   - Screen shake, flame/smoke burst (simple SVG/CSS shapes to stay on-style)
   - Countdown ticking down as this section enters view

5. **Ascent Through Layers** (background + content shifts by "altitude")
   - Low altitude (troposphere) → **About / Mission** section
   - Higher atmosphere → **Projects / Builds** section (schematic-style cards per rocket)
   - Edge of space → **Achievements** section
   - Orbit / space → **Team** section
   - Background gradient shifts per layer: ground haze → blue sky → thinning atmosphere → black space + stars

### Team Section — "Orbit Deck" Concept

Once the rocket reaches space, it "docks" with a station — team is presented as a crew roster rather than a standard team grid.

**Recommended approach:** flat technical roster table — `NAME / ROLE / SUBSYSTEM / SINCE` — matches the spec-sheet aesthetic and avoids needing individual portraits/illustrations for everyone. (Other options considered: mission-patch badge grid, illustrated crew cards — more design-heavy, less brutalist-authentic.)

**Current placeholder plan:** faculty (Motilal Sir) and team leaders/core members shown with just photo + name until full bios/roles are finalized.

### Navigation Consideration

Since this is a linear, scene-driven scroll experience, include a persistent minimal HUD-style nav/sidebar so users can jump directly to sections without replaying the full launch sequence:

```
00_LAUNCH
01_MISSION
02_BUILDS
03_CREW
04_JOIN
```

---

## 3D Asteroids (Space Layer Detail)

Ambient/decorative element for the space/ascent portion of the scroll.

- **Style:** low-poly / wireframe (flat-shaded facets or pure outline meshes) — reads as a technical CAD/schematic model rather than photorealistic 3D, keeping it on-brand with the brutalist style
- **Palette:** matches the rest of the site (white/grey wireframe on black, single accent color for highlights) — not full-color/lit
- **Placement:** space/ascent layers only, not launch pad or interior scenes (logically doesn't fit)
- **Motion:** tumbling/drifting diagonally across the background rather than falling straight down (straight-down motion can read as bugs/errors rather than intentional space debris)
- **Depth:** parallax — slower/further-back asteroids vs. faster/closer ones for real depth
- **Optional:** treat as annotated data points — small label/tag on hover (designation, size, distance) rather than pure decoration, tying them into the manifest/spec-sheet content style used elsewhere
- **Performance note:** keep count small and geometry simple since this sits alongside an already animation-heavy page (rocket ascent, layer transitions)

---

## Retro Arcade Space-Shooter Influence

Retro arcade aesthetics (Asteroids, Galaga, Space Invaders) pair naturally with brutalism — both favor monochrome/limited palettes, hard edges, and minimal UI chrome.

**High-value, low-effort additions (layer directly onto existing plans):**
1. **Vector-outline asteroids** — render the 3D asteroids as vector polygon outlines (like the original Asteroids arcade cabinet's vector display) instead of shaded 3D shapes
2. **Pixel-font HUD overlays** — arcade scoreboard-style blocky/monospace type for altitude, fuel, status readouts; classic green/amber CRT-terminal look for ticking numbers
3. **Scanline/CRT overlay** — subtle horizontal scanlines + slight flicker/glow across the site, cheap via CSS, strong retro-monitor effect

**Bigger "wow" additions (if bandwidth allows):**
4. **Mini-game easter egg** — small playable Asteroids/Space-Invaders-style game tucked into a 404 page, a section transition, or the Join/Recruitment section ("dock your ship to apply")
5. **Arcade-style Achievements section** — frame competition results/records as a "HIGH SCORES" / "MISSION RECORDS" table, ranked by altitude or placement
6. **Custom cursor** — targeting-reticle cursor with a small "pew"-style click animation on interactive elements
7. **Sound design (optional)** — soft 8-bit blip on hover/click only (no looping music) for a light audio identity nod

**Recommended priority:** Items 1–3 first (near-free, layer onto existing plans with minimal clash risk). Items 4 and 6 as stretch goals if time/scope allows.

---

## Open Items / TBD

- [ ] Final club name (HRC vs. Astra)
- [ ] Logo design
- [ ] Confirm exact launch date/time (currently Oct 3, ~2 PM — tentative)
- [x] Faculty advisor bio/details (Dr. Motilal Lakavat, PhD — Associate Professor, Mechanical Engineering, HITAM; phone: +91 95503 72520, LinkedIn profile connected, high-res portrait integrated)
- [x] Team leaders / core members — M. Mokshith Reddy (Club President & Mission Commander), Athrva Shantaram Pawar (Technical Lead), K. Laxmi Pranitha (Secretary), Shishir Chandra Polisetty (Treasurer), Jose Raj Katikala (PR Lead) — all portraits cropped and normalized, bios, emails, phone numbers, and GitHub/LinkedIn profiles integrated
- [ ] Real technical data for checklist/HUD readouts (fuel, telemetry, recovery system specs, etc.)
- [ ] Actual project/build details for Projects section (rocket names, classes, altitudes, motors)
- [ ] Achievements/competition results for Achievements section
