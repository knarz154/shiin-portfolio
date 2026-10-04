# Phase 0 — Workspace Audit

**Owner:** Ken Lawrence E. Narzabal (Shiin)
**Repo:** `C:\wincel\portfolio`
**Branch:** `main` · **Tracking:** `origin/main` (clean against remote)
**Date:** 2026-04-28

---

## 1. Repo state

```
git log --oneline -5
  f0f9fd3 implemented the class extensio
  21d31f8 intial commit before the class extension refactor
```

Two commits on `main`. **Uncommitted modifications (working tree):**
- `src/app/globals.css`
- `src/components/AboutSection.tsx`
- `src/components/IDECodeBlock.tsx`
- `src/components/IDEWindow.tsx`

**Untracked directories:**
- `.agents/` — BMAD skill bundles (Claude Code skills format)
- `.claude/` — Claude Code workspace configuration
- `_bmad/` — BMAD-METHOD v6 framework (core/bmm modules)
- `_bmad-output/` — empty planning/implementation buckets

> Decision flag: prompt referenced `.bmad-core/`, the actual install is `_bmad/` (v6 layout). The two are equivalent for our purposes; we will prefer the prompt-specified `docs/` artifact paths so output is portable.

## 2. Stack detected

| Layer | Tooling | Source |
|---|---|---|
| Framework | Next.js **14.2** (App Router) | `package.json` |
| Language | TypeScript 5.4, `strict: true` | `tsconfig.json` |
| UI | React 18.3 | `package.json` |
| Styling | Tailwind 3.4 + custom CSS | `tailwind.config.ts`, `src/app/globals.css` |
| Smooth scroll | **Lenis 1.1** | `src/components/SmoothScrollProvider.tsx` |
| Animation | **Framer Motion 11** + **GSAP 3.12** | `package.json` |
| Syntax HL | **Shiki 1.x** (server tokenization) | `src/components/IDECodeBlock.tsx` |
| Misc | `vanilla-tilt` 1.8 (declared, **unused** in source) | `package.json` |
| Linting | `eslint-config-next` (no custom config file present) | `package.json` |
| Package manager | npm (lockfile present) | `package-lock.json` |

**Scripts present:** `dev`, `build`, `start`, `lint`. No `test`, no `typecheck`, no `format`, no CI scripts.

## 3. Source layout

```
src/
  app/
    layout.tsx        — root layout, fonts, SmoothScrollProvider, LiquidCursor
    page.tsx          — single-page route, mounts every section
    globals.css       — design tokens (CSS vars), animations, component CSS
  hooks/
    useScrollSpy.ts
  components/
    AboutSection.tsx          AtmosphereBackground.tsx     ContactSection.tsx
    CopyButton.tsx            DynamicWorkLabSections.tsx   HeroSection.tsx
    IDECodeBlock.tsx          IDEWindow.tsx                LabSection.tsx
    LiquidCursor.tsx          Loader.tsx                   Navbar.tsx
    ProjectCard.tsx           ScrambleText.tsx             ScrollProgressBar.tsx
    SmoothScrollProvider.tsx  WorkSection.tsx
public/
  works/            — 21 PNG screenshots/logos (real project assets)
  web.config        — IIS config (legacy, see §6 risks)
docs/               — empty (target for BMAD artifacts)
```

## 4. YASIO §2 pattern compliance (current state)

| Pattern | Status | Where | Notes |
|---|---|---|---|
| Anchor nav: `#start #work #lab #about #contact` | ✅ done | `Navbar.tsx:6-12` | Active-section underline animates with `layoutId` |
| `Section />` tag styling on nav labels | ✅ done | `Navbar.tsx:96-97` | |
| `<Shiin/>` JSX-style brand mark | ✅ done | `Navbar.tsx:53-61` | |
| Pre-loader screen | ⚠️ rule violation | `Loader.tsx:24` | Uses literal **"L0AD1NG"** — §1 hard rule says *pick your own, not "L0AD1NG"*. Must rename. |
| Smooth/momentum scroll | ✅ done | `SmoothScrollProvider.tsx` | Lenis, anchor scroll hooked, navbar offset −72 |
| Custom cursor (pointer-only) | ⚠️ partial | `LiquidCursor.tsx` | Need to verify `(pointer: fine)` gating; touch gating not visible in head |
| Hero: identity + value, italic verb, scroll affordance | ✅ done | `HeroSection.tsx` | ScrambleText cycles 10 phrases; "Scroll" indicator + down-arrow present. *Italic verb* not present yet. |
| Work: numbered tiles, arrow `→`, screenshot, disclosure | ✅ mostly | `WorkSection.tsx`, `ProjectCard.tsx:170-176` | 7 projects, multi-column staggered layout, hover-flip detail overlay |
| Work: spinning element / circular text | ⚠️ missing | `ProjectCard.tsx:101-104` | Only a static `.spinner-border` ring behind image. No rotating-text disk. |
| Click reveals project detail (modal/route) | ⚠️ missing | `ProjectCard.tsx:70-72` | `handleClick` opens `link` in new tab. No internal detail surface. *Decision needed.* |
| Lab: heading + sub-categorized text-link list | ✅ done | `LabSection.tsx` | 4 categories, real content |
| About: class-block (syntax-highlighted) | ✅ done | `IDECodeBlock.tsx`, `IDEWindow.tsx` | Two tabs (`About.js`, `Credentials.ts`), Shiki tokenization, cert tooltips |
| About: parallel accessible markup | ⚠️ missing | `IDEWindow.tsx` | Renders as `<span>` soup. No `<dl>`/ARIA mirror. **Required by §2.** |
| Contact: "Find me on:" + socials + CTA + footer | ✅ done | `ContactSection.tsx` | Real email/phone/GitHub/LinkedIn |
| Microinteractions (hover scramble, magnetic, reveal) | ✅ partial | `ScrambleText.tsx`, `block-reveal` CSS | Block-reveal and scramble shipped; magnetic cursor not present |
| `prefers-reduced-motion` respect | ❌ missing | n/a | No media query in `globals.css`; Lenis/Framer/GSAP run unconditionally. **Required by §2 perf bar.** |

## 5. Content reality check

Real, ground-truth content already in source (do **not** ask Ken for these):

- **Identity:** Ken Lawrence E. Narzabal / Shiin — Tayabas City, Quezon
- **Email:** `kenlawrencenarz@gmail.com` · **Phone:** `0964-990-7780`
- **GitHub:** `https://github.com/knarz154` · **Instagram:** `https://www.instagram.com/k.narz/`
- **Projects (7 with screenshots in `public/works/`):** CCT Tayabas, EXCELLENT Platform, TASDEC, TWIMS, TimeLens VR, GSO-RMS, NegosyoNexus
- **Awards/cred signals:** 4× Best Startup (TimeLens VR), VizWiz 2nd Place, Dean's Lister AY 2022–2026, iSITE Member
- **Cert issuers referenced:** Cisco Networking Academy, freeCodeCamp, Google
- **Stack signals:** React, PHP, MySQL, TypeScript, React Native, Capacitor, Vite

Content **not** present (will need from Ken later, *not* in the 6 questions):
- Photo/avatar, OG image
- Internships / formal employment / org-leadership roles
- Bio voice direction beyond what's hardcoded
- Per-project longer writeups (only short blurbs exist; needed if we add detail views)
- Verifiable cert URLs/dates (current tooltips point to issuer landing pages, not credentials)

## 6. Gaps & blockers

### Hard rule violations to fix early
- `Loader.tsx:24` — literal `"L0AD1NG"` is the exact string §1 forbids. Replace.
- About class-block has no a11y parallel — §2 requires hidden `<dl>` / ARIA exposure.

### Missing infrastructure
- **Tests:** none. No Playwright, axe-core, Vitest, Jest. §3 quality bar requires Playwright smoke + axe + Lighthouse CI.
- **CI:** no `.github/workflows/`.
- **Deploy target:** undecided (no `vercel.json`, no Netlify/Cloudflare config; `public/web.config` is a leftover IIS file from the prior static export — **legacy risk**, recommend removal once host is chosen).
- **SEO:** `metadata` block is in `layout.tsx`, but no `sitemap.ts`, `robots.ts`, dynamic OG image, JSON-LD Person, or favicon set.
- **Analytics:** none.
- **404 page:** none.
- **README.md:** none.
- **Content layer:** projects, lab items, about copy are inline in `*.tsx` files. Architecture phase will move them under typed `content/`.

### Cleanup / debt
- Two of three component files Ken is mid-refactor on are uncommitted (`AboutSection.tsx`, `IDECodeBlock.tsx`, `IDEWindow.tsx`, plus `globals.css`). Will resolve in Phase 1 once Ken says whether to commit/discard.
- `vanilla-tilt` declared in deps but **never imported** — current 3D tilt is custom Framer code. Either drop the dep or migrate ProjectCard to `vanilla-tilt`.
- `out/` directory exists from a prior static export — stale; delete if we're going SSR/Vercel.
- Initial commit message has typo (`"intial"`); not worth fixing now, just noting.

### Performance/A11y unknowns (will measure in QA gates)
- Initial JS bundle size: not yet measured against §2's ≤200KB gz target.
- LCP/CLS/INP: unmeasured.
- Keyboard walkthrough: untested.
- Screen-reader walkthrough: blocked by class-block a11y gap above.

## 7. Summary

The codebase is roughly **70% of the way** to YASIO pattern parity using Ken's real content. The remaining work splits cleanly into (a) two §1 hard-rule fixes (loader wording, class-block a11y), (b) three §2 pattern gaps (rotating element on tiles, project-detail surface, reduced-motion gating), and (c) the missing surrounding infra (tests, CI, SEO completeness, deploy, README). All seven planned phases will produce real, runnable changes — there is no need for a from-scratch rebuild. We will refactor in place from Phase 6 onward.

