# Story 3.5 — Per-project dynamic OG image

**Status:** pending
**Epic:** 3 — Work
**Blocks:** —
**Blocked-by:** 1.4, 3.4
**Files (primary):** `src/app/work/[slug]/opengraph-image.tsx` (new), `public/fonts/JetBrainsMono-Regular.woff2` (new), `src/lib/og.ts` (new helpers)

## User statement
As Ken I want sharing a project link on LinkedIn/Twitter to render a unique branded image so that my work looks intentional in feed.

## Acceptance criteria
- [ ] `app/work/[slug]/opengraph-image.tsx` exports a default function returning `ImageResponse` (1200×630).
- [ ] Image renders: project title (large, JetBrains Mono), role · year (muted), tech-stack pills (small), `accentColor` block / stripe, "shiin.dev" wordmark bottom-right.
- [ ] Font bundled locally: `public/fonts/JetBrainsMono-Regular.woff2` (Variable subset acceptable). Loaded via `fs.readFile` in the route — **no remote fetch per request**.
- [ ] `metadata.openGraph.images` and `metadata.twitter.images` (in `[slug]/page.tsx`) point to this dynamic route.
- [ ] Manual smoke: `curl http://localhost:3000/work/excellent-platform/opengraph-image` returns a valid PNG.
- [ ] LinkedIn Post Inspector / Twitter Card Validator preview shows correct image once deployed (verify after Story 8.7).

## Definition of Done
Seven dynamic OG images render at build/runtime; opening any in a browser shows a project-branded card. Lighthouse SEO doesn't regress.

## Notes
- PO validation §3.2 F9: font bundling is locked here. Don't fall back to Vercel ephemeral fetch.
- Architecture §6.2.
- The root `/` continues to use `public/og.png` (a static site-level image — designed in Polish if needed; not blocking this story).
