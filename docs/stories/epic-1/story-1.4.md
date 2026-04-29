# Story 1.4 — `siteConfig` constant + `metadataBase`

**Status:** pending
**Epic:** 1 — Foundation
**Blocks:** 3.5, 8.5
**Blocked-by:** 1.2
**Files (primary):** `src/lib/siteConfig.ts` (new), `src/app/layout.tsx`, `.env.example` (new)

## User statement
As Ken I want all origin URLs and global metadata to flow through a single source of truth so that swapping the domain is a one-line change.

## Acceptance criteria
- [ ] Create `src/lib/siteConfig.ts` exporting an `as const` object: `{ name, fullName, handle, url, description, ogImage, locale, twitter? }`.
- [ ] `url` reads `process.env.NEXT_PUBLIC_SITE_URL` with default `"https://shiin.dev"` (ADR-002).
- [ ] `app/layout.tsx` sets `metadata.metadataBase = new URL(siteConfig.url)`.
- [ ] All hard-coded `https://...` origins inside `metadata` blocks replaced with `siteConfig.url` references.
- [ ] `.env.example` documents `NEXT_PUBLIC_SITE_URL` with the production default.
- [ ] No `https://shiin.dev` literal exists outside `siteConfig.ts` and `.env.example` (verified via grep).

## Definition of Done
`npm run build` succeeds; `next build` log shows the configured `metadataBase`. Grep for `https://shiin.dev` returns hits only from the two allowed files.

## Notes
- ADR-002 fallback names: `kennarzabal.com`, `narzabal.dev`. Swap is one line in `siteConfig.ts` if needed at deploy time.
- Story 8.7 sets the prod `NEXT_PUBLIC_SITE_URL` env var in Vercel project settings.
