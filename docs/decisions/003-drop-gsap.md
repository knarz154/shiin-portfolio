# ADR-003 — Animation stack: drop GSAP, keep Framer Motion + Lenis + Shiki

**Status:** Accepted · 2026-04-28

## Context
`package.json` declares `gsap@^3.12.5` but no source file imports it (verified by grep across `src/`). Framer Motion 11 already handles every animation present (block-reveal, scramble, tile reveals, hover tilt, layout transitions). Lenis owns smooth scroll. Shiki owns syntax highlighting. GSAP would be a third animation library competing for the same surface area, with no current consumer.

## Decision
- **Remove** `gsap` from `dependencies` during Epic 1.
- **Remove** `vanilla-tilt` from `dependencies` during Epic 1 — also declared, also unused (ProjectCard's tilt is custom Framer code).
- **Keep** `framer-motion`, `lenis`, `shiki`.

## Consequences
- ~70 KB minified saved off the dependency surface (and zero runtime cost since neither was loaded).
- One animation idiom across the codebase (Framer's `motion.*` + springs/transforms) → easier code review and consistent reduced-motion gating (see Epic 7 plan).
- If a future animation requires GSAP-specific features (timeline scrubbing, ScrollTrigger pinning), revisit this ADR rather than carry an unused dep.
