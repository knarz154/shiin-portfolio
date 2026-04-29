# Story 3.2 — Rotating circular-text element on tile

**Status:** pending
**Epic:** 3 — Work
**Blocks:** —
**Blocked-by:** 1.5, 3.1
**Files (primary):** `src/components/work/RotatingDisk.tsx` (new), `src/components/work/ProjectTile.tsx`, `src/app/globals.css`

## User statement
As a visitor I want the tiles to feel alive so that the Work section has the YASIO "spinning element" charm.

## Acceptance criteria
- [ ] New `<RotatingDisk>` SVG component renders circular text along an `<textPath>`. Default text: `VIEW · PROJECT · ` (Ken-overrideable per project via prop).
- [ ] Disk slowly rotates: 10s linear infinite (CSS `@keyframes spin` reused).
- [ ] Reduced-motion (Story 1.5 global rule): rotation disabled — disk stays static.
- [ ] Disk is `aria-hidden="true"` (decorative).
- [ ] Disk z-order: behind the screenshot (z-0 internal) but above tile bg.
- [ ] Disk does **not** intercept clicks (`pointer-events: none`).
- [ ] Visible on all seven tiles in default tile size; readable but not dominant.
- [ ] No layout shift introduced; disk is `position: absolute`.

## Definition of Done
All seven tiles show the rotating disk on desktop. OS reduced-motion toggle freezes the rotation. Click target unchanged.

## Notes
- This replaces the static `.spinner-border` placeholder currently in `ProjectCard.tsx:101-104`. That selector / element is removed.
- Spec §3.2 + §4 animation map row "Tile rotating disk".
