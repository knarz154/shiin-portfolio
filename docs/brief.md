# Project Brief — Shiin Portfolio

**Author:** Analyst persona (Phase 1)
**For:** Ken Lawrence E. Narzabal (Shiin)
**Date:** 2026-04-28
**Inputs:** `docs/00-workspace-audit.md`, build prompt §1–§7, ADR-001…006

---

## 1. Background & owner profile

Ken Lawrence E. Narzabal — handle **Shiin** — is a 4th-year BS Computer Science student at **Colegio de la Ciudad de Tayabas (CCT)**, graduating this academic year. He is based in Tayabas City, Quezon, Philippines, and is active in CCT's research society (iSITE) and Dean's-list-tier coursework. His shipped portfolio surface includes seven real software/branding projects spanning React, PHP/MySQL, React Native + Capacitor, and Vite-based TypeScript, plus award-bearing entrepreneurship/VR work (TimeLens VR — 4× Best Startup awards). Existing socials and contact channels are real and live (`kenlawrencenarz@gmail.com`, `github.com/knarz154`, `instagram.com/k.narz`, `0964-990-7780`).

The repository is **already 70% built** (Next.js 14 App Router, TS strict, Tailwind, Lenis, Framer Motion, Shiki) with all five YASIO-pattern sections rendering real content. This brief therefore plans a **finish + harden** track, not a rebuild.

## 2. Goals

### Primary (must achieve for project to be considered worth shipping)
- **G1 — Recruitable surface.** Produce a portfolio that a recruiter or hiring manager can land on, understand Ken's level in under 60 seconds, and reach out from. Job-hunt grade, not student-project grade.
- **G2 — Identity expression.** Make "Shiin" feel like a developer with taste — not a CV in disguise. The YASIO-pattern code-tag aesthetic carries this.
- **G3 — Standards parity.** Hit the §2 quality bar (Lighthouse Perf ≥ 90, A11y ≥ 95, Best Practices ≥ 95, SEO ≥ 95; LCP ≤ 2.5s; CLS ≤ 0.05; INP ≤ 200ms; ≤ 200 KB gz initial JS) — non-negotiable, gates Epic 8.

### Secondary (high-value but not launch-blocking)
- **G4 — Per-project deep links.** `/work/[slug]` pages with dynamic OG images so a single shared link on LinkedIn/Twitter looks intentional. (See ADR-005.)
- **G5 — Updateability.** Adding a new project or lab item is a one-file edit in a typed `content/` layer; no component surgery needed. (See architecture phase.)
- **G6 — A11y dignity.** Class-block has a parallel `<dl>`/ARIA structure so screen-reader users get prose, not a wall of `<span>`s. **Non-negotiable, gates Phase 3 spec approval.**

## 3. Target audience

| Audience | Why they land | What they need in <60s | Where |
|---|---|---|---|
| **PH tech recruiters / hiring managers** | LinkedIn click-through, referral, job-app link | Stack signals, project list, contact CTA | Manila/Makati/BGC tech corridor + Cebu remote-first shops |
| **International remote recruiters** | LinkedIn/upwork/contra | Same as above + English clarity, timezone (UTC+8) | Stripe-Atlas style remote-first companies |
| **Fellow devs (peer evaluation, referrals)** | Social/discord/CCT alumni | Code quality signal — does the *site itself* feel well-built | DEV.to, Twitter, CCT alumni network |
| **Entrepreneurship / VR/EdTech evaluators** | TimeLens VR, EXCELLENT, NegosyoNexus follow-up | Award context, demo links | Pitch decks, conference handouts |
| **Future Ken** | Self-reference for resume/PR work | Up-to-date project record, easy to extend | n/a |

## 4. Success metrics

Concrete, measurable, time-bounded. Reviewed at **T+30 days** post-launch.

| Metric | Target | Source |
|---|---|---|
| First recruiter callback / outreach traceable to portfolio | ≥ 1 within 30 days post-launch | Inbox + LinkedIn DMs (Ken self-reports) |
| Median time-on-site | ≥ 60s | Vercel Analytics (or Plausible — TBD in Phase 4) |
| Bounce rate from `/` | ≤ 65% | Same |
| Mailto / CTA click-through rate | ≥ 5% of unique visitors | Same (mailto link tracked via outbound event) |
| Mobile Lighthouse Perf | ≥ 90 | Lighthouse CI in PRs |
| Mobile Lighthouse A11y | ≥ 95 | Same |
| Initial JS payload (gzipped, route `/`) | ≤ 200 KB | `next build` analyzer |
| Keyboard-only walkthrough | 100% reachable | Manual test, recorded in QA story |
| `prefers-reduced-motion: reduce` walkthrough | Static, dignified, no broken state | Manual test |
| Forbidden-string sweep | 0 hits for `yasio`, `Yasio`, `Baszczok`, `L0AD1NG` in `src/` | `grep` in Definition of Done |

## 5. Competitive scan

### Primary reference — yasio.dev (pattern donor)
The build prompt §2 is essentially a structured pattern extraction from this site. We replicate **structure, interaction, and feel** — never copy, project list, copyright assets, or strings. Specifically off-limits: the "i design and develop things" tagline, the Jan Baszczok class body, the project names (NatGeo, Hotel z Rowerem, etc.), and the exact Lab link list. Quality bar: that site sets the ceiling for the "this person has taste" signal we want to match.

### Secondary references (developer portfolios in the same genre, cited for divergence and convergence)
1. **brittanychiang.com (V4)** — single-page, anchor-nav, monospace accents, dark base. *Convergence:* nav pattern, single-page anchor structure. *Divergence:* she favors text-density and a longer "About" prose block; we keep About as the class-block code aesthetic — that's the YASIO move and Shiin's differentiator.
2. **leerob.io** — Next.js-built, content-heavy, dynamic OG images per blog/project page. *Convergence:* the per-project route + OG-image strategy this brief commits to (ADR-005). *Divergence:* he leans editorial (writes a blog); we explicitly defer blog (out of scope).
3. **bruno-simon.com** — extreme-end animation portfolio (3D Three.js drivable car). *Cited as a counter-reference:* a permissible direction we are explicitly **not** taking. We commit to ambient motion + microinteractions, not WebGL maximalism. This bounds scope in Risks §7.

### Aggregator sources reviewed
- [GitHub: emmabostian/developer-portfolios](https://github.com/emmabostian/developer-portfolios)
- [Best Developer Portfolio Websites — webportfolios.dev](https://www.webportfolios.dev/blog/best-developer-portfolio-websites)
- [Web Designer & Developer Portfolios — sitebuilderreport.com](https://www.sitebuilderreport.com/inspiration/web-developer-designer-portfolios)

## 6. Scope

### In scope (this project will deliver)
1. The five YASIO-pattern sections on `/`: Start, Work, Lab, About, Contact — all hitting §2's interaction spec.
2. Per-project routes at `/work/[slug]` with dynamic OG images (ADR-005).
3. Loader rename to `INIT()` — landed in **Epic 1: Foundation**, not deferred to polish (ADR-006).
4. Parallel `<dl>`/ARIA accessibility track for the class-block — Phase 3 must produce a concrete plan; non-negotiable.
5. `prefers-reduced-motion` honored everywhere (Lenis disabled, Framer animations short-circuited, scramble/reveal effects fall back to static reveal).
6. Typed `content/` layer for projects + lab items; adding a new entry is a one-file edit.
7. SEO: `sitemap.ts`, `robots.ts`, JSON-LD `Person` (root) and `CreativeWork` (per project), favicon set, dynamic OG.
8. Privacy-respecting analytics (Vercel Analytics or Plausible — choice locked in Phase 4).
9. Quality gates: Playwright smoke, axe-core a11y, Lighthouse CI in PRs.
10. README documenting run / build / deploy / add-a-project workflow.
11. Vercel deploy on `*.vercel.app` first, custom `.dev` domain after purchase (ADR-002).

### Out of scope (explicit, locked)
- **Blog / writing surface** — no MDX content engine, no `/blog/*` routes. If wanted later, separate project.
- **Auth / user accounts / login** — none.
- **CMS** — content lives in code. No Sanity/Contentful/Strapi.
- **Light-mode toggle** — dark-only ships. Reconsider in v2 (ADR-004).
- **i18n / multi-language** — English-only. (Filipino/Tagalog secondary surface deferred.)
- **WebGL / Three.js / heavy 3D** — explicit no-go (see bruno-simon counter-reference §5).
- **Contact form backend / email service** — `mailto:` only. No Formspree/Resend integration v1.
- **E-commerce, downloadable assets, paid content** — out.
- **Service-worker / offline / PWA install** — out.

## 7. Risks

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| R1 | **Scope creep into custom WebGL / animation showcase** — Bruno-Simon-pattern temptation | Med | High (kills timeline) | Explicit out-of-scope §6; PRD acceptance criteria reject any story requiring Three.js |
| R2 | **Class-block a11y parallel never lands** — easy to defer, hard to retrofit | High | High (fails A11y ≥ 95 gate) | Phase 3 spec approval *gated* on a concrete plan; QA story explicitly tests with NVDA/VoiceOver |
| R3 | **`prefers-reduced-motion` overlooked** — currently unhandled across Lenis + Framer + scramble + cursor | High | Med (a11y violation + nausea risk) | Foundation story (Epic 1) ships a global `useReducedMotion()` hook + Lenis bypass; QA tests with OS toggle |
| R4 | **Forbidden YASIO strings leak in** — already shipped once (`L0AD1NG` in `Loader.tsx:24`) | Med (proven) | High (IP/legal posture) | ADR-006 + grep in Definition of Done; Epic 1 includes the loader fix as a story, not a polish task |
| R5 | **Content gaps for `/work/[slug]` long-form copy** — Ken's projects only have 1-line blurbs today | High | Med (detail pages look thin) | Phase 6 stories use `TODO_KEN` placeholders; Content Sourcing Protocol §4 of build prompt governs |
| R6 | **Initial JS exceeds 200 KB gz** — Framer Motion + Lenis + Shiki + cursor logic is non-trivial | Med | Med (perf gate fail) | Lenis lazy-init on `(pointer:fine)`; Shiki is server-only (already correct); cursor + scramble code-split; measure in CI |
| R7 | **Domain unavailable at purchase** — `shiin.dev` may already be taken | Low-Med | Low (renamed in one place per ADR-002) | All origin references go through `siteConfig.url`; fallback names locked |
| R8 | **Vercel free-tier limits hit during traffic spike** (e.g. HN front-page) | Very low | Low | Acceptable; upgrade or fall back to Cloudflare cache if needed |
| R9 | **Uncommitted refactor in working tree** (4 modified files at audit time) gets entangled with Phase 6 work | Med | Low | Phase 1 deliverable: ask Ken whether to commit/discard before Epic 1 starts |
| R10 | **Dropped deps cause runtime break** — removing GSAP/vanilla-tilt | Very low | Low | grep confirms zero imports; Epic 1 story includes typecheck + build verification |

## 8. Locked decisions carried in (from Phase 0 Q&A and ADRs)

- ADR-001: Deploy → **Vercel**
- ADR-002: Domain → plan as **`shiin.dev`** (TBD purchase, fallback names locked)
- ADR-003: Animation stack → **drop GSAP + vanilla-tilt**, keep Framer Motion + Lenis + Shiki
- ADR-004: Palette → keep `#5918df` / `#0e0c16` baseline; Phase 3 refines accent + neutrals + state styles
- ADR-005: Project detail → **dedicated `/work/[slug]` routes** with dynamic OG
- ADR-006: Loader copy → **`INIT()`**, fixed in Epic 1 not polish

## 9. Definition of "brief done"

- [x] Owner profile grounded in real data, no fabrication beyond build-prompt §1 fields.
- [x] Three-tier audience model with channel hypotheses.
- [x] Ten measurable success metrics with sources.
- [x] Primary + 3 secondary competitive references cited.
- [x] In/out-of-scope explicitly enumerated.
- [x] Top-10 risk register with mitigations.
- [x] All six Phase 0 ADRs reflected as locked context.

---

**Next phase (Phase 2 — PM):** Adopt the PM persona; produce `docs/prd.md` with FRs, NFRs, and Epics 1–8 as ordered, atomic stories, with Epic 1 absorbing the loader fix and Epic 1 also seating the global `useReducedMotion` plumbing. Epic 8's Definition of Done includes the forbidden-string grep. **Wait for Ken's "go" before starting.**
