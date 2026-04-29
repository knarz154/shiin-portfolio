# Story 3.1 — Migrate Work content to `content/projects.ts`

**Status:** pending
**Epic:** 3 — Work
**Blocks:** 3.3 (and transitively 3.4, 3.5, 3.6, 7.1, 8.5)
**Blocked-by:** 1.7
**Files (primary):** `src/components/sections/WorkSection.tsx`, `src/components/work/ProjectTile.tsx` (renamed from ProjectCard), `src/content/projects.ts`

## User statement
As Ken I want to add a new project by editing one TS file so that I never touch component code for content.

## Acceptance criteria
- [ ] `WorkSection.tsx` consumes from `src/content/projects.ts` instead of inline `PROJECTS` array.
- [ ] `ProjectCard` renamed to `ProjectTile` (file + import-site sweep). `data-testid="project-tile"` added on the root for Playwright (Story 8.1).
- [ ] All seven existing projects render identically.
- [ ] Slug values **locked** per PO validation §2.1:
  - `cct-tayabas`, `excellent-platform`, `tasdec`, `twims`, `timelens-vr`, `gso-rms`, `negosyo-nexus`
- [ ] Each project gains: `slug`, `role`, `year`, `accentColor` (default `#ffa63d` placeholder if unspecified). Non-ground-truth fields (real role title, real year) marked `"TODO_KEN"` if values aren't given yet.
- [ ] Visual regression baseline saved (Playwright snapshot in 8.1 will lock this; manual screenshot here).
- [ ] No remaining `unoptimized` flag in `<Image>` (verified by Story 1.9; this story re-verifies).

## Definition of Done
Visual diff zero against pre-migration baseline at 360, 768, 1440 widths. `npm run build` produces seven projects; sitemap (after Story 8.5) will eventually enumerate the same seven slugs.

## Notes
- PO validation §2.1: slug table is canonical.
- Story 1.9 already removed `unoptimized`; this story is content-migration only.
- `accentColor` is consumed by Story 3.5 (per-project OG image).
