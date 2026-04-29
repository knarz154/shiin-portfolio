# Story 4.2 — Lab reduced-motion + reveal tuning

**Status:** pending
**Epic:** 4 — Lab
**Blocks:** —
**Blocked-by:** 1.5, 4.1
**Files (primary):** `src/components/sections/LabSection.tsx`

## User statement
As a motion-sensitive visitor I want Lab items to appear without slide-up animation so that scanning is comfortable.

## Acceptance criteria
- [ ] Reduced-motion: items render at full opacity, no `y` translation; stagger disabled (or `staggerChildren: 0`).
- [ ] Hover state on `.lab-link`: color change to `--accent` and 12px padding-left grow are preserved (visual affordance, not motion-heavy).
- [ ] Hover transition duration shortened under reduced-motion to instant (covered by global CSS rule from 1.5; verify).
- [ ] Watermark `LAB` parallax disables under reduced-motion (covered globally).

## Definition of Done
OS toggle test: Lab section static yet still affordant on hover.

## Notes
- Spec §3.4 + §7.
