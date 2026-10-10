# ADR-009 — Next.js: stay on 14.2.x, defer the major upgrade

**Status:** Accepted · 2026-10-10

## Context
`907d1e6` applied every non-breaking `npm audit fix`. What remains cannot be fixed without leaving Next 14: `14.2.35` is the newest published 14.x, and every open `next` advisory lists its first fixed version in the 15.5.x line (the latest at `15.5.24`). `npm audit` proposes `next@16.4.0`.

`npm audit` on 2026-10-10 reports **13 advisories: 1 critical, 10 high, 2 moderate** (up from 10 on 2026-10-04 — new advisories were published in between). The ones that need a semver-major bump:

- `next` → 16.x — critical. Includes two critical RCE advisories (Image Optimization API with AVIF files; Windows-hosted servers) plus high-severity DoS / SSRF / middleware-bypass advisories in Server Components, Server Actions, rewrites, WebSocket upgrades, and Pages Router i18n.
- `eslint-config-next` → 16.x — high (`glob`, `@next/eslint-plugin-next`). Dev-only.
- `tailwindcss` → 4.x — high (`braces`, `chokidar`, `micromatch`, `postcss-selector-parser`). Build-time only.

## Decision
Stay on **Next 14.2.x** for now. Do the 14 → 16 migration as its own tracked story (**Story 8.9**) in its own session — not folded into a dependency-patch commit or any Epic 1–7 story.

## Reasoning
- **Threat model.** The site is a static portfolio: all four pages prerender, there is no auth, no user accounts, no forms posting to our server, no database, and no untrusted server-side input. The advisory surface is overwhelmingly features this app does not use — Server Actions, middleware, rewrites, i18n, CSP nonces, WebSocket upgrades, custom servers.
- **Hosting.** Production runs on Vercel (ADR-001), which is Linux and serves image optimization from its own infrastructure rather than Next's built-in optimizer. That is what keeps the two critical RCE advisories (Windows-hosted servers; self-served Image Optimization API) out of the production path.
- **Cost of doing it now.** 14 → 16 crosses two majors (React 19, async request APIs, caching defaults, ESLint flat config) and Epic 1 has not started. Mixing a framework migration into foundation work would make every regression ambiguous.

## Consequences
- `npm audit` stays red until Story 8.9 lands. A red audit is expected and is not, by itself, a reason to block other stories.
- **This decision is conditional.** Re-open it immediately — do not wait for 8.9's slot — if any of these becomes true:
  - the site is self-hosted or run via `next start` anywhere public (invalidates the Vercel reasoning for both criticals);
  - Server Actions, route handlers accepting input, middleware, rewrites, or auth are added;
  - an advisory lands that is exploitable against a statically prerendered Vercel deployment.
- **Not assessed:** local development runs `next dev` on Windows. Whether the Windows-hosted RCE advisory applies to the dev server was not checked when this ADR was written; treat the dev server as not safe to expose beyond localhost until 8.9 lands.
- The Tailwind 4 and `eslint-config-next` 16 bumps are tooling-only and ride along with or after Story 8.9; they are not separately urgent.
- Story 8.9 must land before Story 8.7 (production deploy + custom domain) is considered done, so the public launch does not ship on an unpatched major.
