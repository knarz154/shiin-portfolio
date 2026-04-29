# Story 1.2 — Dep cleanup & scripts

**Status:** pending
**Epic:** 1 — Foundation
**Blocks:** 1.3, 1.4, 1.5, 1.7, 1.8, 1.9
**Blocked-by:** 1.1
**Files (primary):** `package.json`, `package-lock.json`, `.prettierrc`, `next.config.mjs`

## User statement
As Ken I want unused dependencies removed and missing scripts added so that the toolchain matches what we actually use and we can measure bundle size when needed.

## Acceptance criteria
- [ ] Remove `gsap` and `vanilla-tilt` from `dependencies` (ADR-003).
- [ ] Confirm via grep that no source file imports either (`rg "from ['\"]gsap"` and `rg "from ['\"]vanilla-tilt"` return zero hits).
- [ ] Add scripts: `typecheck` (`tsc --noEmit`), `format` (`prettier --write .`), `format:check` (`prettier --check .`), `test` (placeholder echo, real wiring in Epic 8), `analyze` (`ANALYZE=true next build`).
- [ ] Add devDeps: `prettier`, `prettier-plugin-tailwindcss`, `@next/bundle-analyzer`.
- [ ] Commit `.prettierrc` (single quotes, 100 col, semis, trailingComma `all`, plugin loaded).
- [ ] `next.config.mjs` wraps export in `withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" })`. **Preserve `reactStrictMode: true`.**
- [ ] `npm install` produces a clean lockfile diff.
- [ ] `npm run typecheck` passes.
- [ ] `npm run analyze` runs without error and emits the analyzer report (`.next/analyze/*.html`).
- [ ] `npm run format:check` passes (after one initial `npm run format` pass committed separately if needed).

## Definition of Done
All three local CI-equivalent commands pass green: `npm run lint`, `npm run typecheck`, `npm run build`. Bundle-analyzer report opened once and bundle composition recorded as a baseline for NFR-P5 tracking.

## Notes
- PO validation §3.2 F4: be careful to preserve `reactStrictMode: true` when refactoring `next.config.mjs`.
- Bundle analyzer is a *one-off verification* in this story, not a CI gate. Story 8.3 (LHCI) is the binding gate for NFR-P5.
- ADR-003 cites both removed deps; PR description should reference it.
