# Story 2.1 — Loader visual polish + reduced-motion variant

**Status:** pending
**Epic:** 2 — Hero + Loader
**Blocks:** —
**Blocked-by:** 1.3, 1.5
**Files (primary):** `src/components/layout/Loader.tsx`, `src/app/globals.css`

## User statement
As a visitor I want the loader to be brief and dignified across motion preferences so that the first impression doesn't feel sluggish or overwhelming.

## Acceptance criteria
- [ ] Loader bar fills via `transform: scaleX()` (GPU-friendly; no layout-triggering `width` animation).
- [ ] Loader dismisses ≤ 1.6s if `document.readyState === 'complete'` on mount; max 2.5s otherwise.
- [ ] Reduced-motion variant: no progress animation; static `INIT()` text + 200ms fade-out only (handled by Story 1.5 global rule + explicit check).
- [ ] No CLS attributable to loader on FCP — loader is `position: fixed`, occupies viewport via `inset: 0`.
- [ ] When dismissed, loader sets `aria-hidden="true"` and removes itself from focus order.
- [ ] Optional `aria-live="polite"` "Ready" announcement: **default off**; flip on only if NVDA testing in 8.2 shows it improves orientation. Don't ship a noisy announce by default.

## Definition of Done
Lighthouse Perf trace shows loader teardown contributes 0 to CLS. Reduced-motion test (OS toggle) shows static `INIT()` then fade.

## Notes
- Spec §3.1 + §7 reduced-motion table.
