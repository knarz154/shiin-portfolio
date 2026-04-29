# Story 1.9 — Drop `next/image` `unoptimized` flag

**Status:** pending
**Epic:** 1 — Foundation
**Blocks:** —
**Blocked-by:** 1.2
**Files (primary):** `src/components/work/ProjectTile.tsx` (was `ProjectCard.tsx`)

## User statement
As Ken I want project images served through `next/image`'s optimizer so that Lighthouse perf measurements (Story 8.3) reflect the production-worthy delivery path, not a flat-PNG poison signal.

## Acceptance criteria
- [ ] Remove `unoptimized` prop from the `<Image>` in the project tile component.
- [ ] Verify all 21 images in `public/works/` optimize without error during `next build` (no transform failures; no oversized-source warnings beyond expected).
- [ ] Manually compare LCP candidate on `/` (first tile) before/after — visual fidelity preserved (no compression artifacts on logo PNGs like `TASDECLOGO.png`, `TimeLensVRLogo.png`, `twimsPngLogo.png`).
- [ ] Network tab on the deployed preview shows `/_next/image?...` URLs with `image/webp` or `image/avif` `Content-Type` and a non-empty `Cache-Control`.
- [ ] No `unoptimized` survives anywhere in source — `rg "unoptimized"` returns zero hits in `src/`.

## Definition of Done
`next build` completes without image-pipeline errors. Visual diff zero on tile thumbnails. Image responses on preview show optimized format and caching headers.

## Notes
- Ken's Phase 4 adjustment §1: do this in Phase 5 prep / Epic 1, not in Story 3.1, so LH preview runs are clean throughout Phase 6.
- Architecture §4.6: noted today's `unoptimized: true` is leftover from when external image domains were a concern; all our images are local, so the flag is unnecessary.
- One-line code change; the bulk of the story is **verification** that all 21 images optimize cleanly. SM should test with `npm run build` and inspect the Vercel preview after the PR's preview deploy.
