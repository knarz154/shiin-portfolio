# ADR-002 — Domain: plan for custom .dev

**Status:** Accepted (provisional name) · 2026-04-28

## Context
Custom domain affects SEO canonical URLs, JSON-LD `Person.url`, OG `url`, sitemap base, and robots `Host`. These are baked into Phase 4 architecture. Deferring the choice would force rework. Ken will purchase the domain via Cloudflare Registrar or Porkbun before launch.

## Decision
Architect as if the production origin is **`https://shiin.dev`**. If `shiin.dev` is unavailable at purchase time, fall back to `kennarzabal.com` or `narzabal.dev`. Pre-launch deploys live on `*.vercel.app`; production canonicals point to the final domain.

## Consequences
- All hard-coded origin references go through a single `siteConfig.url` constant (set in architecture phase) so swap-out is one-line.
- `metadata.metadataBase` in `app/layout.tsx` will read from `process.env.NEXT_PUBLIC_SITE_URL` with `https://shiin.dev` as default.
- Per-project OG images and sitemap entries embed `siteConfig.url`; no hard-coded literal URLs in components.
- Domain ownership is a launch-blocker; flag in PRD Epic 8.
