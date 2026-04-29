# Story 2.3 — Hero reduced-motion variant

**Status:** pending
**Epic:** 2 — Hero + Loader
**Blocks:** —
**Blocked-by:** 1.5, 2.2
**Files (primary):** `src/components/sections/HeroSection.tsx`, `src/components/primitives/ScrambleText.tsx`

## User statement
As a motion-sensitive visitor I want the hero to render statically so that I see the same content without parallax or scramble.

## Acceptance criteria
- [ ] Reduced-motion: `ScrambleText` does not run its cycle — renders the **first** word from `SCRAMBLE_WORDS` (i.e. `things`) statically.
- [ ] Reduced-motion: HELLO watermark holds at zero offset (no `useTransform` translation).
- [ ] Reduced-motion: block-reveal headlines fade in over 200ms (no slide / no sweeping bar).
- [ ] Reduced-motion: scroll-indicator dot does not bounce; renders at neutral position.
- [ ] Manual OS-level reduced-motion test: hero is fully readable, no movement, no surprise.

## Definition of Done
OS toggle on → hero static and dignified. OS toggle off → all animations resume normally.

## Notes
- Spec §7 reduced-motion table.
