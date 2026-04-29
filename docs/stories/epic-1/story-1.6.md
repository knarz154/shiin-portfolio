# Story 1.6 — Custom cursor `(pointer:fine)` gating

**Status:** pending
**Epic:** 1 — Foundation
**Blocks:** 7.5
**Blocked-by:** 1.5
**Files (primary):** `src/components/LiquidCursor.tsx` (will move to `src/components/layout/LiquidCursor.tsx` in 1.7)

## User statement
As a touch-device user I want the custom cursor never to render so that scroll/tap aren't interfered with.

## Acceptance criteria
- [ ] `LiquidCursor` mounts only when `matchMedia('(pointer: fine)').matches` is true. Subscribes to `change` for hot-plug devices (e.g. iPad Magic Keyboard).
- [ ] Reduced-motion (per Story 1.5): cursor is **hidden entirely** (per Phase 3 Q3 answer). Module returns `null` early.
- [ ] On hover of `<a>`, `<button>`, `[role="button"]`, `[role="link"]`, `[data-cursor]`, ring scales smoothly to `1.6`.
- [ ] Cursor not painted during initial loader screen (z-index 60 < loader 90 — verified per spec §1.9).
- [ ] iPad / iPhone simulator: cursor never renders. Desktop with mouse: cursor renders normally.
- [ ] Migrate to `next/dynamic` with `{ ssr: false }` to defer the cursor JS off the SSR HTML stream (perf lever, NFR-P5).

## Definition of Done
DevTools "touch device" emulation hides the cursor entirely. Desktop unchanged. Bundle analyzer (Story 1.2) shows `LiquidCursor` in a separate chunk after this story.

## Notes
- Phase 3 §8 Q3 answer: hidden entirely on touch / reduced-motion (not "static dot only").
- Spec §7 reduced-motion table row "Custom cursor ring".
