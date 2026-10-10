# Story 8.9 — Next.js 14 → 16 migration

**Status:** pending (stub — ACs to be elaborated before dev)
**Epic:** 8 — Quality gates
**Blocks:** 8.7
**Blocked-by:** —
**Files (primary):** `package.json`, `package-lock.json`, `next.config.mjs`, `src/app/**`, ESLint config

## User statement
As Ken I want the site on a supported Next.js major so that the critical and high advisories with no fix on the 14 line are closed before public launch.

## Acceptance criteria
- [ ] `next`, `react`, `react-dom`, `eslint-config-next` upgraded to the current 16.x-compatible versions.
- [ ] `npm audit` reports zero critical and zero high advisories against `next` and `eslint-config-next`.
- [ ] Breaking changes between 14 and 16 reviewed against this codebase and each one either applied or recorded as not applicable.
- [ ] `npm run lint` and `npm run build` pass; all pages still prerender.
- [ ] `npm run dev`: `/` renders with no console errors, no hydration warnings, and all `/works` assets at 200.
- [ ] Decide whether Tailwind 3 → 4 rides along or gets its own story; record the choice here.
- [ ] ADR-009 status updated to `Superseded` with a pointer to the landing commit.

## Definition of Done
Build, lint, and dev all green on 16.x; visual check of `/` shows no regressions; ADR-009 superseded.

## Notes
- Added 2026-10-10 by ADR-009. Not in the original PRD Epic 8 list (8.1–8.8); PRD not yet amended.
- Run in its own session — do not combine with other stories.
- Sequencing is open: earlier is cheaper (less code to migrate), but it must land before 8.7.
