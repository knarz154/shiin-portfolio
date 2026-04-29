# Story 3.3 — Tile click → internal `/work/[slug]` route

**Status:** pending
**Epic:** 3 — Work
**Blocks:** 3.4
**Blocked-by:** 3.1
**Files (primary):** `src/components/work/ProjectTile.tsx`

## User statement
As a visitor I want clicking a tile to deep-link me to a real page so that I can read more, share the URL, and find context.

## Acceptance criteria
- [ ] Tile root is wrapped in `next/link` `<Link href={"/work/" + project.slug}>`. The card-level `onClick` `window.open(...)` removed.
- [ ] Card remains a single accessible link (no nested interactive elements that would break a11y). The privacy badge stays as visual decoration only.
- [ ] Hover overlay text adapts: "View case study →" for full-disclosure, "Screenshots only" stays for private.
- [ ] Keyboard: `Enter` / `Space` activates link (default `<a>` behavior — verify focus ring visible).
- [ ] No `window.open` calls remain in `ProjectTile.tsx` (grep verified).
- [ ] All seven tiles route correctly to `/work/<slug>` (404 expected until 3.4 lands; verify URL transition only here).

## Definition of Done
Clicking any tile changes the URL to `/work/<slug>`. Keyboard activation works. No external-link-only behavior remains.

## Notes
- The "live URL" CTA moves to the project detail page (Story 3.4), not the tile.
- ADR-005.
