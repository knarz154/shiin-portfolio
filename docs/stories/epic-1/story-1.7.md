# Story 1.7 — Typed content layer skeleton + folder regroup

**Status:** pending
**Epic:** 1 — Foundation
**Blocks:** 3.1, 4.1, 5.1, 6.1
**Blocked-by:** 1.2
**Files (primary):** `src/content/types.ts` (new), `src/content/projects.ts` (new), `src/content/lab.ts` (new), `src/content/about.ts` (new), `src/content/socials.ts` (new); plus the **mechanical move** of every existing `src/components/*.tsx` into one of `src/components/{layout,sections,work,about,contact,primitives}/`

## User statement
As Ken I want projects, lab items, about, and socials to live in typed TS modules **and** components grouped by feature so that content edits never touch component code and component locations are predictable.

## Acceptance criteria
- [ ] Create `src/content/types.ts` with the types from Architecture §4.2: `Project`, `LabItem`, `LabCategory`, `Education`, `ExperienceEntry`, `Certification`, `Profile`, `Social`, `SocialKind`, `Disclosure`.
- [ ] Create `src/content/projects.ts` populated from current `WorkSection.tsx`. Each project gets a slug per PO validation §2.1 table.
- [ ] Create `src/content/lab.ts` populated from current `LabSection.tsx`.
- [ ] Create `src/content/about.ts` with typed `Profile` data. Fields without ground-truth values (full education years, dated experience entries, dated certs) marked with `"TODO_KEN"` literal placeholder strings — not made-up values.
- [ ] Create `src/content/socials.ts` populated from current `ContactSection.tsx`.
- [ ] **Folder regroup** (mechanical move only — no behavior change):
  - `Navbar`, `Loader`, `LiquidCursor`, `ScrollProgressBar`, `AtmosphereBackground`, `SmoothScrollProvider` → `src/components/layout/`
  - `HeroSection`, `WorkSection`, `LabSection`, `AboutSection`, `ContactSection` → `src/components/sections/`
  - `ProjectCard` → `src/components/work/` (rename to `ProjectTile` happens in 3.1)
  - `IDEWindow`, `IDECodeBlock` → `src/components/about/`
  - `ScrambleText`, `CopyButton` → `src/components/primitives/`
  - `DynamicWorkLabSections` → keep in `src/components/sections/`
- [ ] All imports updated; `npm run typecheck` passes; `npm run build` succeeds.
- [ ] Visual regression baseline saved to `docs/qa/baselines/` (manual screenshot of `/` at 1440 width — full Playwright snapshots come in Story 8.1).
- [ ] Components still render identical output (manual diff vs the saved baseline).

## Definition of Done
Visual diff zero against pre-migration baseline. All components reachable in the new folder structure. No `import` statement points to a moved-but-not-updated path.

## Notes
- PO validation §2.1: slug list locked.
- This is the heaviest mechanical-refactor story in the project. Keep the diff focused: **moves + import-path updates only**, no logic edits. If you spot a cleanup opportunity, file a follow-up; don't co-mingle.
- Components still use *inline* data temporarily — the consumption-from-content swap happens in Stories 3.1 / 4.1 / 5.1 / 6.1 separately. This story creates the content modules but doesn't yet wire them.
