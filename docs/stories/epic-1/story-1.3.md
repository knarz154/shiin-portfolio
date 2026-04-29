# Story 1.3 — Loader copy `INIT()` + forbidden-string sweep

**Status:** pending
**Epic:** 1 — Foundation
**Blocks:** 8.4
**Blocked-by:** 1.2
**Files (primary):** `src/components/Loader.tsx` (will move to `src/components/layout/Loader.tsx` in 1.7), `scripts/check-forbidden.mjs` (new), `package.json`

## User statement
As Ken I want the YASIO `L0AD1NG` violation removed and a CI-runnable sweep that prevents regression so that we never ship the forbidden string again.

## Acceptance criteria
- [ ] `Loader.tsx` text replaced from `L0AD1NG` to `INIT()` (ADR-006).
- [ ] Loader markup includes `aria-busy={!hidden}`, `aria-label="Initializing"`, and sets `aria-hidden="true"` when dismissed.
- [ ] New `scripts/check-forbidden.mjs` greps `src/` (recursive, exclude `node_modules`, `.next`, `out`) for the **full forbidden set**:

| Term | Match mode |
|---|---|
| `L0AD1NG` | case-sensitive, literal |
| `yasio` / `Yasio` / `YASIO` | case-insensitive, word-boundaried |
| `Baszczok` | case-insensitive |
| `NatGeo` | case-insensitive, word-boundaried |
| `Hotel z Rowerem` | case-sensitive (avoid `hotel` false-positives) |
| `i design and develop things` | case-insensitive substring |

- [ ] Script scope: `src/` **only** — never `docs/` (per Brief §5 single-allowed citation).
- [ ] Script exits 0 on clean tree; exits non-zero with offending term + file:line printed otherwise.
- [ ] `package.json` adds `"check:forbidden": "node scripts/check-forbidden.mjs"`.
- [ ] **Negative test**: temporarily insert each forbidden term once → script fails with the right term + path → revert.
- [ ] **Positive test**: clean source tree → exit 0.

## Definition of Done
`npm run check:forbidden` exits 0. Loader visually says `INIT()` on dev server. PR description references ADR-006 + Brief §1.

## Notes
- PO validation §2.2 + §3.2 F8: case-sensitivity rules are encoded above. SM/Dev confirms behavior on edge cases (e.g. "yasio" inside a longer word like "fantasiologue" must not flag — word-boundaried regex handles this).
- The script is wired into a CI workflow in Story 8.4. This story only wires the local `npm run` entry.
