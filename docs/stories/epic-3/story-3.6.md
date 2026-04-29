# Story 3.6 — ProjectTile reduced-motion variant

**Status:** pending
**Epic:** 3 — Work
**Blocks:** —
**Blocked-by:** 1.5, 3.1
**Files (primary):** `src/components/work/ProjectTile.tsx`

## User statement
As a motion-sensitive visitor I want tile reveals and tilts to disable so that I'm not nauseated by the grid.

## Acceptance criteria
- [ ] `ProjectTile` reads `useReducedMotion()` and disables: 3D tilt (rotateX/Y), scale-on-hover, glow tracking, hover-flip slide animation.
- [ ] Hover overlay still **fades** in/out (200ms opacity-only) so info is reachable; **no transform** under reduced-motion.
- [ ] Stagger reveal disables: tiles render at full opacity immediately on mount (no `y` translation, no per-card delay).
- [ ] Rotating disk (Story 3.2) freezes — already covered by global CSS rule from 1.5; verify here.
- [ ] Manual OS-level reduced-motion test: scroll through Work section produces a static, navigable grid.

## Definition of Done
OS toggle on → grid is static, all info reachable on hover via fade-only. OS toggle off → full motion behavior resumes.

## Notes
- Spec §7 reduced-motion table.
