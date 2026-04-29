# ADR-001 — Deployment target: Vercel

**Status:** Accepted · 2026-04-28

## Context
Portfolio is Next.js 14 App Router. Hosting candidates: Vercel, Netlify, Cloudflare Pages, GitHub Pages, IIS (legacy `public/web.config` artifact suggests prior IIS use). We need first-class App Router support, dynamic OG image generation, server components, and ISR with zero infra overhead.

## Decision
Deploy to **Vercel** (free Hobby tier).

## Consequences
- All App Router features (RSC, dynamic OG via `next/og`, ISR, edge middleware) work without configuration.
- `output: 'export'` is **not** used — unlocks SSR/SSG hybrid for `/work/[slug]` (see ADR-005).
- `public/web.config` becomes dead weight; remove during Epic 1.
- `out/` directory from prior static export is stale; delete during Epic 1.
- Preview deployments per branch come for free — useful for QA gates in Phase 6.
