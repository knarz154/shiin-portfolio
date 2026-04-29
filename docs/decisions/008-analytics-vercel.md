# ADR-008 — Analytics: Vercel Analytics + Speed Insights

**Status:** Accepted · 2026-04-29

## Context
PRD FR-AN1 requires privacy-respecting analytics in production. Brief §6 limits us to no third-party cookies and DNT respect. Candidates: **Plausible** (~$9/mo, self-hosted free option), **Vercel Analytics** (free Hobby tier — included with deploy target), **Simple Analytics**, **Fathom**. We deploy on Vercel (ADR-001).

## Decision
Use **Vercel Analytics** for traffic/event tracking + **Vercel Speed Insights** for Core Web Vitals.

- Library: `@vercel/analytics/react` and `@vercel/speed-insights/next`.
- Mounted in `app/layout.tsx`, gated to `process.env.NODE_ENV === 'production'`.
- Custom events: `outbound_click` fired on every social/mailto link via the `track()` helper. Properties: `kind`, `href`.
- No cookies; no PII collected; aggregated on Vercel's infra.

## Consequences
- **Cost:** $0. Hobby tier covers 2,500 events/mo — comfortable headroom for portfolio traffic.
- **DX:** zero-config wiring — `<Analytics />` and `<SpeedInsights />` components auto-detect deploy target.
- **Privacy:** no third-party domains; everything served from `*.vercel.app`. DNT honored. No consent banner required under EU/UK rules per Vercel's published privacy stance.
- **Vendor lock-in:** mild. Swapping to Plausible later means removing two component mounts and re-adding a `<script>` tag — under an hour.
- **Reporting:** Web Vitals + page views accessible in the Vercel dashboard. No custom dashboards/exports v1; if Ken wants per-project click-through funnels later, revisit.
- **SEO/perf impact:** ≤ 5 KB gz client overhead per page; both libraries lazy-load after `interactive`.
