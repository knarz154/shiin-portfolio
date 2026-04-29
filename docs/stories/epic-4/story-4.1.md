# Story 4.1 — Migrate Lab to `content/lab.ts`

**Status:** pending
**Epic:** 4 — Lab
**Blocks:** 4.2
**Blocked-by:** 1.7
**Files (primary):** `src/components/sections/LabSection.tsx`, `src/content/lab.ts`

## User statement
As Ken I want to add a Lab item with one file edit so that the surface stays current as I publish work.

## Acceptance criteria
- [ ] `LabSection.tsx` consumes from `src/content/lab.ts` instead of the inline `LAB_CATEGORIES` array.
- [ ] All four current categories (Thesis Papers, Design & Branding, Awards & Competitions, Explorations) and their items render identically.
- [ ] Each item gains an optional `kind: "paper" | "design" | "award" | "experiment"` field driving an inline emoji/icon chip:
  - `paper` → 📄
  - `design` → ✦
  - `award` → 🏆
  - `experiment` → ⚡
  - missing → no chip (current behavior)
- [ ] Heading paragraph stays in **Ken's voice** — "Thesis papers, design work, competition wins, tech explorations and more." (unchanged unless Ken edits).
- [ ] Visual diff zero on Lab section across breakpoints.

## Definition of Done
`/#lab` renders identically to pre-migration. New Lab item can be added with a one-line edit to `content/lab.ts` and it appears with the correct icon chip on next reload.

## Notes
- Spec §3.4.
- Brief §1: Lab heading must be in Ken's voice, not yasio.dev's wording.
