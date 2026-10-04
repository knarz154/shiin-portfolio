# Architecture — Shiin Portfolio

**Author:** Architect persona (Phase 4)
**Inputs:** `docs/brief.md`, `docs/prd.md`, `docs/front-end-spec.md`, ADR-001…008
**Date:** 2026-04-29

---

## 0. How to read this document

This document maps *what* the PRD requires and *how* the spec wants it to feel into a concrete delivery shape: stack, folders, routing, data flow, deploy, SEO, analytics, and tests. It does **not** restate decisions already locked in ADRs — it cites them. Anything new is logged as a fresh ADR (this phase adds ADR-007 + ADR-008).

---

## 1. Stack — final

| Layer | Tech | Version | ADR / source |
|---|---|---|---|
| Framework | Next.js (App Router) | 14.2.x | ADR-001 |
| Language | TypeScript | 5.4.x, `strict: true` | repo state |
| UI runtime | React | 18.3.x | repo state |
| Styling | Tailwind CSS + design tokens | 3.4.x | repo state, ADR-004, ADR-007 |
| Smooth scroll | Lenis | 1.1.x | ADR-003 |
| Animation | Framer Motion | 11.x | ADR-003 |
| Syntax highlighting | Shiki (server-side) | 1.x | ADR-003 |
| Hosting | Vercel (Hobby) | n/a | ADR-001 |
| Domain | `shiin.dev` (planned) | n/a | ADR-002 |
| Analytics | Vercel Analytics + Speed Insights | latest | ADR-008 |
| Testing — E2E + visual | Playwright | 1.4x.x | this doc §8 |
| Testing — a11y | `@axe-core/playwright` | latest | this doc §8 |
| Testing — perf | Lighthouse CI | `@lhci/cli` 0.13.x | this doc §8 |
| Lint / format | ESLint (next), Prettier | next 14, prettier 3 | PRD 1.2 |

### Removed (ADR-003)
- `gsap` — declared, never imported.
- `vanilla-tilt` — declared, never imported.

### Considered, rejected
- **Astro** — would mean a re-platform; we are not greenfield, App Router already does what we need.
- **MDX content layer (Contentlayer / `next-mdx-remote`)** — out of scope (no blog).
- **Plausible / Fathom** — see ADR-008 (cost vs. zero-config tradeoff favors Vercel Analytics).
- **Three.js / drei** — explicit out-of-scope per Brief §6 (counter-reference: bruno-simon.com).

---

## 2. Folder structure

The current layout is flat (`src/components/*.tsx` × 16). Adding 9 new components will tip that into chaos. We **group by feature**, keep one level deep, and avoid premature over-nesting.

```
portfolio/
├── docs/                         ← all BMAD artifacts (canonical)
│   ├── 00-workspace-audit.md
│   ├── brief.md
│   ├── prd.md
│   ├── front-end-spec.md
│   ├── architecture.md           ← this file
│   ├── decisions/
│   │   ├── 001-deployment-vercel.md
│   │   ├── …
│   │   └── 008-analytics-vercel.md
│   ├── stories/                  ← Phase 5 (PO) populates
│   │   └── epic-{N}/story-{N.M}.md
│   └── qa/
│       └── baselines/            ← Playwright visual snapshots reference set
│
├── src/
│   ├── app/                      ← App Router routes + global metadata
│   │   ├── layout.tsx            ← root: providers, fonts, analytics, metadata
│   │   ├── page.tsx              ← single-page `/`: hero + work + lab + about + contact
│   │   ├── not-found.tsx         ← global 404 (Story 7.2)
│   │   ├── globals.css           ← design tokens + base styles (Tailwind)
│   │   ├── icon.tsx              ← dynamic favicon (Story 7.3)
│   │   ├── apple-icon.tsx        ← iOS touch icon
│   │   ├── manifest.ts           ← web app manifest
│   │   ├── sitemap.ts            ← Story 8.5
│   │   ├── robots.ts             ← Story 8.5
│   │   └── work/
│   │       └── [slug]/
│   │           ├── page.tsx              ← Story 3.4
│   │           ├── opengraph-image.tsx   ← Story 3.5 (next/og)
│   │           └── not-found.tsx         ← per-project 404
│   │
│   ├── components/
│   │   ├── layout/               ← page chrome
│   │   │   ├── BrandTag.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Loader.tsx
│   │   │   ├── SmoothScrollProvider.tsx
│   │   │   ├── LiquidCursor.tsx
│   │   │   ├── ScrollProgressBar.tsx
│   │   │   ├── AtmosphereBackground.tsx
│   │   │   └── SectionWatermark.tsx
│   │   │
│   │   ├── sections/             ← top-level home page sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ScrollHint.tsx
│   │   │   ├── WorkSection.tsx
│   │   │   ├── LabSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   └── ContactSection.tsx
│   │   │
│   │   ├── work/                 ← Work / project-detail pieces
│   │   │   ├── ProjectGrid.tsx
│   │   │   ├── ProjectTile.tsx          ← renamed from ProjectCard
│   │   │   ├── RotatingDisk.tsx
│   │   │   └── ProjectDetailLayout.tsx
│   │   │
│   │   ├── about/                ← class-block + a11y mirror
│   │   │   ├── ClassBlock.tsx           ← server: tokenize + render IDEWindow
│   │   │   ├── IDEWindow.tsx            ← client: tabs + tooltips
│   │   │   ├── IDECodeBlock.tsx         ← (kept as Shiki adapter)
│   │   │   └── ClassBlockA11y.tsx       ← parallel <dl> mirror (gating, Story 5.2)
│   │   │
│   │   ├── contact/
│   │   │   ├── SocialList.tsx
│   │   │   └── GetInTouchButton.tsx
│   │   │
│   │   └── primitives/           ← reusable, no domain concern
│   │       ├── ScrambleText.tsx
│   │       └── CopyButton.tsx
│   │
│   ├── content/                  ← typed data layer, single source of truth
│   │   ├── projects.ts
│   │   ├── lab.ts
│   │   ├── about.ts
│   │   ├── socials.ts
│   │   └── types.ts              ← Project, LabCategory, Profile, Social
│   │
│   ├── hooks/
│   │   ├── useReducedMotion.ts   ← Story 1.5
│   │   └── useScrollSpy.ts       ← existing
│   │
│   └── lib/
│       ├── siteConfig.ts         ← Story 1.4 (single source of origin URLs)
│       ├── analytics.ts          ← thin track() wrapper (Story 8.6)
│       └── og.ts                 ← shared helpers for OG image rendering
│
├── public/
│   ├── works/                    ← project screenshots (existing)
│   ├── fonts/                    ← only if we move off Google Fonts (currently no)
│   └── favicon.ico               ← static fallback alongside app/icon.tsx
│
├── scripts/
│   └── check-forbidden.mjs       ← Story 1.3
│
├── tests/
│   ├── e2e/
│   │   ├── home.spec.ts
│   │   ├── project-detail.spec.ts
│   │   └── a11y.spec.ts
│   └── __screenshots__/          ← Playwright visual baselines
│
├── .github/
│   └── workflows/
│       ├── ci.yml                ← lint + typecheck + check-forbidden + Playwright
│       └── lighthouse.yml        ← LHCI on Vercel preview URL
│
├── .env.example                  ← documents NEXT_PUBLIC_SITE_URL
├── playwright.config.ts
├── lighthouserc.json
├── .prettierrc
├── README.md                     ← Story 8.8
└── (Next.js / TS configs unchanged)
```

### Migration scope (existing → new layout)

Every existing `src/components/*.tsx` moves into one of `layout/`, `sections/`, `work/`, `about/`, `contact/`, or `primitives/`. **Single mechanical refactor in Story 1.1 / 1.7** — no behavior change. Imports update via search/replace.

Why now: doing the moves in a foundation story keeps each later story's diff focused. Doing them later means every Phase 6 PR touches a different "is it `components/` or `components/work/`?" question.

---

## 3. Routing model

### 3.1 Pages

| Path | File | Render mode | Notes |
|---|---|---|---|
| `/` | `app/page.tsx` | Static (SSG) | Single-page; hosts all five sections via anchor IDs |
| `/work/[slug]` | `app/work/[slug]/page.tsx` | Static (SSG) | `generateStaticParams()` enumerates `content/projects.ts` slugs |
| `/work/[slug]` (unknown slug) | `app/work/[slug]/not-found.tsx` | Static | 404 with `Back to Work` |
| Anything else | `app/not-found.tsx` | Static | 404 with brand mark |

**No middleware.** **No ISR / revalidation.** Content is in code; rebuilds run on push to `main`.

**No dynamic API routes** in v1 (no contact form backend, no auth — Brief §6).

### 3.2 Single-page anchors

`/` mounts five sections with stable IDs: `#start`, `#work`, `#lab`, `#about`, `#contact`. Lenis intercepts `a[href^="#"]` clicks and uses `lenis.scrollTo(target, { offset: -72 })` (already wired in `SmoothScrollProvider.tsx`). When reduced-motion is on, falls back to native `scrollIntoView({ behavior: 'auto' })`.

### 3.3 Server vs. client components

| Component class | Mode | Rationale |
|---|---|---|
| `app/layout.tsx`, `app/page.tsx`, `app/work/[slug]/page.tsx` | Server | Metadata, JSON-LD, content imports |
| `components/about/ClassBlock.tsx` | **Server** | Shiki tokenization is server-only, zero runtime cost |
| `components/about/IDEWindow.tsx` (tab UI) | Client | Interactive tabs, tooltips |
| All other `components/*` with animation / state | Client | Framer Motion, hooks |
| `components/primitives/ScrambleText.tsx` | Client | Owns its own animation loop |
| `lib/siteConfig.ts`, `content/*.ts` | Module (no `"use client"`) | Imported by both, zero-cost |

The `app/work/[slug]/page.tsx` page itself is a server component that imports `ProjectDetailLayout` (client) for any motion-bearing sub-elements. Most of the detail page can stay server-rendered.

### 3.4 Page transitions

`/` ↔ `/work/[slug]` transition uses Framer's `AnimatePresence` keyed off `usePathname()`, mounted in a thin `<RouteTransition>` wrapper inside `app/layout.tsx`. 250ms fade + 8px y-offset; 150ms fade-only under reduced motion. (Implemented in Story 7.1; spec'd in `front-end-spec.md` §3.3.)

---

## 4. Content model

### 4.1 Single source of truth: `src/content/`

All projects, lab items, about/credentials data, and socials live as **typed TypeScript modules**. No CMS, no Markdown, no fetching.

### 4.2 Types (`src/content/types.ts`)

```ts
export type Disclosure = "full" | "screenshots";

export interface Project {
  /** Stable URL slug (kebab-case). */
  slug: string;
  title: string;
  /** One-line tile blurb. */
  blurb: string;
  /** Long-form description for /work/[slug]. Markdown allowed via simple inline render or string. */
  longDescription?: string;
  role: string;                 // "Lead Developer", "Founder / VR Lead", etc.
  year: string;                 // "2024–2026" or "2023"
  techStack: string[];          // ["React", "PHP", "MySQL", ...]
  coverImage: string;           // /works/...
  screenshots?: string[];       // additional /works/...
  liveUrl?: string;             // present iff disclosure === "full"
  externalUrl?: string;         // optional — e.g. Facebook page for TimeLensVR
  disclosure: Disclosure;
  orientation: "h" | "v";
  /** Optional accent for OG image background; falls back to --primary. */
  accentColor?: string;
}

export interface LabItem {
  label: string;
  href: string;
  kind?: "paper" | "design" | "award" | "experiment";
}

export interface LabCategory {
  name: string;
  items: LabItem[];
}

export interface Education {
  school: string;
  degree: string;
  years: string;
  honors?: string[];
}

export interface ExperienceEntry {
  title: string;
  org: string;
  period: string;
  highlights?: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  verifyUrl: string;
}

export interface Profile {
  name: string;
  handle: string;
  location: string;
  email: string;
  phone?: string;
  bio: string;                  // single-paragraph human summary
  education: Education;
  experience: ExperienceEntry[];
  skills: { group: string; items: string[] }[];
  certifications: Certification[];
}

export type SocialKind = "email" | "phone" | "github" | "linkedin" | "x" | "other";

export interface Social {
  kind: SocialKind;
  label: string;
  href: string;
}
```

### 4.3 `lib/siteConfig.ts`

```ts
export const siteConfig = {
  name: "Shiin",
  fullName: "Ken Lawrence E. Narzabal",
  handle: "Shiin",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://shiin.dev",
  description:
    "Ken Lawrence Narzabal — Full-stack developer & designer based in Tayabas City, Quezon. React, Next.js, TypeScript, PHP/MySQL.",
  ogImage: "/og.png",
  locale: "en_PH",
  twitter: undefined,           // TODO_KEN
  // GitHub + LinkedIn are sourced from content/socials.ts to avoid duplication
} as const;
```

`metadata.metadataBase = new URL(siteConfig.url)` is set in `app/layout.tsx`. Every component that needs an absolute URL imports `siteConfig.url`. No string literal for the origin in any other file.

### 4.4 Data flow at build time

```
content/*.ts ─┬─► sections render tile/list/heading content
              ├─► /work/[slug] page renders detail layout
              ├─► generateStaticParams() returns slug array → Vercel pre-renders 7 routes
              ├─► sitemap.ts enumerates "/" + /work/[slug] urls
              ├─► opengraph-image.tsx receives slug → ImageResponse
              ├─► JSON-LD CreativeWork generated from project record
              └─► siteConfig.url → metadataBase, canonical urls

prefers-reduced-motion ───► useReducedMotion() ───► every motion component
```

### 4.5 Adding a new project (one-file edit)

```ts
// src/content/projects.ts
{
  slug: "newco-dashboard",
  title: "NewCo Dashboard",
  blurb: "Internal analytics tool — React + tRPC + Postgres.",
  longDescription: "…",
  role: "Full-stack developer",
  year: "2026",
  techStack: ["React", "tRPC", "Postgres"],
  coverImage: "/works/newco-cover.png",
  screenshots: ["/works/newco-1.png", "/works/newco-2.png"],
  liveUrl: "https://newco.example",
  disclosure: "full",
  orientation: "h",
  accentColor: "#ffa63d",
}
```

`next build` regenerates the route, OG image, sitemap entry, and JSON-LD automatically. README §"Add a project" (Story 8.8) documents this verbatim.

### 4.6 Image strategy

- All images in `public/` (existing convention).
- `next/image` everywhere with explicit `sizes`. `unoptimized: true` is set today on the Image component in `ProjectCard.tsx:114` — review in Story 3.1: enable optimization unless we have an animated/external reason not to. (`unoptimized` was likely needed because `next.config.mjs` doesn't whitelist external image domains, but our images are all local — we can drop the flag.)
- No remote image hotlinks.

---

## 5. Build & deploy

### 5.1 Pipeline

```
┌────────────────────────────────────────────────────────┐
│                    GitHub: main branch                 │
└────────────────────────────────────────────────────────┘
              │ push
              ▼
┌────────────────────────────────────────────────────────┐
│  GitHub Actions: ci.yml                                │
│  ├─ npm ci                                             │
│  ├─ npm run lint                                       │
│  ├─ npm run typecheck                                  │
│  ├─ npm run check:forbidden                            │
│  ├─ npm run build (smoke)                              │
│  └─ npx playwright test (e2e + a11y)                   │
└────────────────────────────────────────────────────────┘
              │ green
              ▼
┌────────────────────────────────────────────────────────┐
│  Vercel: production deploy                             │
│  ├─ next build (static + per-project routes)           │
│  ├─ deploy to apex (shiin.dev)                         │
│  └─ assign preview URL also                            │
└────────────────────────────────────────────────────────┘
              │ deploy succeeds, URL emitted
              ▼
┌────────────────────────────────────────────────────────┐
│  GitHub Actions: lighthouse.yml                        │
│  └─ lhci autorun against deploy URL                    │
│      asserts Perf≥90 / A11y≥95 / BP≥95 / SEO≥95        │
└────────────────────────────────────────────────────────┘
```

Per-PR (non-`main`):
- `ci.yml` runs the same checks (lint / typecheck / forbidden / build / Playwright).
- Vercel issues a **preview deploy** automatically.
- `lighthouse.yml` runs against the preview URL.
- Both gates must pass before merge.

### 5.2 Environment variables

| Var | Where | Default | Notes |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Vercel project settings (Production + Preview) | `https://shiin.dev` (prod), preview URL (preview) | Documented in `.env.example` |
| `NEXT_PUBLIC_VERCEL_ENV` | Auto-set by Vercel | — | Used to gate analytics to production |

No secrets v1. No third-party API keys.

### 5.3 Domain wiring (Story 8.7)

- Apex `shiin.dev` → Vercel project (A record `76.76.21.21` or CNAME flat per Vercel's instructions).
- `www.shiin.dev` → 308 redirect to apex.
- HTTPS via Vercel-managed cert (zero-config).
- `NEXT_PUBLIC_SITE_URL` set to `https://shiin.dev` once domain is live; preview deploys auto-resolve to their preview URL.

If the domain is still pending at Story 8.7 time: ship to `*.vercel.app`, wire domain in a subsequent micro-PR (no architecture change).

---

## 6. SEO plan

### 6.1 Metadata

Set globally in `app/layout.tsx` and per-page on `/` and `/work/[slug]` via `generateMetadata`.

- `metadataBase`: `siteConfig.url` (absolute).
- `title.template`: `"%s — Shiin"`. `title.default`: `"<Shiin/> — Full-stack developer & designer"`.
- `description`: `siteConfig.description` (root); per-project on `/work/[slug]`.
- `openGraph`: `type: "website"` (root), `type: "article"` (project pages), `images` references the dynamic OG route.
- `twitter`: `card: "summary_large_image"`, `creator` once Ken provides handle (TODO_KEN).
- `alternates.canonical`: absolute URL.

### 6.2 Dynamic OG images

`app/work/[slug]/opengraph-image.tsx` exports a default `ImageResponse` (1200×630 PNG). Renders project title, role, year, tech-stack pills, accent color block, and a "shiin.dev" wordmark. Uses `JetBrains Mono` bundled locally (one font weight) — no remote fetch on render.

Root `/` uses a static `public/og.png` (designed once in Phase 6, swappable).

### 6.3 Sitemap (`app/sitemap.ts`)

```ts
import { siteConfig } from "@/lib/siteConfig";
import { projects } from "@/content/projects";

export default function sitemap() {
  const lastModified = new Date();
  return [
    { url: siteConfig.url, lastModified, changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({
      url: `${siteConfig.url}/work/${p.slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
```

### 6.4 Robots (`app/robots.ts`)

```ts
import { siteConfig } from "@/lib/siteConfig";

export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
```

### 6.5 JSON-LD

#### Root `/` — `Person`

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Ken Lawrence E. Narzabal",
  "alternateName": "Shiin",
  "url": "https://shiin.dev",
  "image": "https://shiin.dev/og.png",
  "jobTitle": "Full-stack developer & designer",
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "Colegio de la Ciudad de Tayabas"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Tayabas City",
    "addressRegion": "Quezon",
    "addressCountry": "PH"
  },
  "sameAs": [
    "https://github.com/knarz154",
    "https://www.instagram.com/k.narz/"
  ]
}
```

Embedded in root layout via `<script type="application/ld+json">`. Built from `siteConfig` + `content/about.ts` + `content/socials.ts`.

#### Per-project `/work/[slug]` — `CreativeWork`

```json
{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "EXCELLENT Platform",
  "url": "https://shiin.dev/work/excellent",
  "description": "...",
  "datePublished": "2025",
  "creator": { "@type": "Person", "name": "Ken Lawrence E. Narzabal" },
  "keywords": ["React", "Vite", "TypeScript", "thesis"],
  "image": "https://shiin.dev/work/excellent/opengraph-image"
}
```

### 6.6 Favicons & manifest

- `app/icon.tsx` — dynamic 32×32 generated via `next/og` from a Shiin glyph.
- `app/apple-icon.tsx` — 180×180 same.
- `app/manifest.ts` — `name`, `short_name`, `theme_color: "#5918df"`, `background_color: "#0e0c16"`, icons.
- `public/favicon.ico` — static fallback.

---

## 7. Analytics

### 7.1 Provider — Vercel Analytics + Speed Insights (ADR-008)

`app/layout.tsx`:

```tsx
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        {process.env.NODE_ENV === "production" && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  );
}
```

### 7.2 Custom events — `lib/analytics.ts`

```ts
import { track } from "@vercel/analytics";

export function trackOutbound(kind: string, href: string) {
  if (process.env.NODE_ENV !== "production") return;
  track("outbound_click", { kind, href });
}
```

Used by:
- `SocialList` — `trackOutbound(social.kind, social.href)` on click.
- `GetInTouchButton` — `trackOutbound("mailto", href)` on click.
- Project tile internal navigation — **not** tracked (Vercel Analytics already captures pageviews on `/work/[slug]`).
- `liveUrl` button on `/work/[slug]` — `trackOutbound("project_live", href)`.

### 7.3 Privacy posture

- No cookies set by Analytics or Speed Insights (Vercel's published behavior).
- DNT honored client-side by skipping `track()` if `navigator.doNotTrack === "1"` (added to `lib/analytics.ts` as a guard).
- No PII recorded — all custom events carry only `kind` and `href`.

---

## 8. Testing strategy

### 8.1 Layered checks

| Layer | Tool | Scope | Runs |
|---|---|---|---|
| Type | `tsc --noEmit` | All code | local + CI |
| Lint | `next lint` (eslint-config-next) | All code | local + CI |
| Format | `prettier --check` | All code | local + CI |
| IP rule | `node scripts/check-forbidden.mjs` | `src/` only | local + CI |
| E2E smoke | Playwright | `/`, `/work/[slug]` | local + CI |
| Visual regression | Playwright snapshots | `/`, one `/work/[slug]` | CI on Linux only (snapshots are platform-specific) |
| A11y | `@axe-core/playwright` | `/`, `/work/[slug]` | CI |
| Performance | LHCI | Vercel preview URL | CI on PR after preview deploy |
| Manual a11y | NVDA + VoiceOver | About region (FR-A3) | per-Epic-5 story manually |

### 8.2 Playwright config (sketch)

```ts
// playwright.config.ts
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: devices["Desktop Chrome"] },
    { name: "iphone",   use: devices["iPhone 14"] },
  ],
  webServer: process.env.CI
    ? undefined
    : { command: "npm run dev", port: 3000, reuseExistingServer: true },
});
```

### 8.3 Smoke spec (sketch)

```ts
// tests/e2e/home.spec.ts
test("home renders all five sections", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Shiin/i })).toBeVisible();
  for (const id of ["start", "work", "lab", "about", "contact"]) {
    await expect(page.locator(`#${id}`)).toBeVisible();
  }
});

test("clicking a tile routes to /work/[slug]", async ({ page }) => {
  await page.goto("/");
  await page.locator('[data-testid="project-tile"]').first().click();
  await expect(page).toHaveURL(/\/work\/[a-z-]+/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
```

### 8.4 A11y spec (sketch)

```ts
// tests/e2e/a11y.spec.ts
test("home /  passes axe with no serious/critical violations", async ({ page }) => {
  await page.goto("/");
  const r = await new AxeBuilder({ page }).analyze();
  const blocking = r.violations.filter(v => ["serious","critical"].includes(v.impact ?? ""));
  expect(blocking).toEqual([]);
});

test("about region exposes parallel mirror to AT", async ({ page }) => {
  await page.goto("/#about");
  // The `<dl>` mirror is sr-only — Playwright's accessibility tree still sees it
  const tree = await page.accessibility.snapshot({ root: page.locator("#about").elementHandle() });
  expect(JSON.stringify(tree)).toContain("Tayabas City");
});
```

### 8.5 Lighthouse CI config (`lighthouserc.json`)

```json
{
  "ci": {
    "collect": {
      "url": ["${{ steps.preview.outputs.url }}", "${{ steps.preview.outputs.url }}/work/excellent"],
      "numberOfRuns": 3,
      "settings": { "preset": "mobile" }
    },
    "assert": {
      "assertions": {
        "categories:performance":   ["error", { "minScore": 0.90 }],
        "categories:accessibility": ["error", { "minScore": 0.95 }],
        "categories:best-practices":["error", { "minScore": 0.95 }],
        "categories:seo":           ["error", { "minScore": 0.95 }]
      }
    },
    "upload": { "target": "temporary-public-storage" }
  }
}
```

### 8.6 Visual regression

Snapshots are committed under `tests/__screenshots__/`. Generated on Linux (Playwright's default in `ubuntu-latest` runners) so they match CI. **Local devs do not commit fresh snapshots from their own OS** — README documents this. Use `npm run test:update` (added in Story 8.1) to regenerate intentionally.

---

## 9. Performance budget — how we hit NFR-P5

Initial route `/` JS budget: **≤ 200 KB gzipped**. Today's payload is unmeasured. Levers we have:

| Lever | Win | Story |
|---|---|---|
| Drop `gsap` (~70 KB unmin if it ever became imported) | Already absent at runtime | 1.2 |
| Drop `vanilla-tilt` | Same | 1.2 |
| Lazy-load `LiquidCursor` only on `(pointer:fine)` | Skip cursor JS on touch | 1.6 |
| `ScrambleText` & `LiquidCursor` mount via `next/dynamic` with `ssr: false` | Defer non-critical JS | 1.6 / 2.2 |
| Shiki runs server-side, never ships its theme | Already correct | n/a |
| Framer Motion tree-shakes unused exports | Validated by `next build` analyzer | Story 8.1 verifies |
| Image `priority` only on hero/first-tile | Skip unnecessary LCP racers | 3.1 |
| Self-hosted fonts deferred — Google Fonts <link> stays | Avoid layout shift via `font-display: swap` already set | n/a |
| Lenis lazy-init under reduced motion | Already specced | 1.5 |

If after Story 8.1 the budget is exceeded, we'll size-analyze with `@next/bundle-analyzer` and split further. Not pre-optimizing.

---

## 10. Decisions log (this phase)

- **ADR-007** — Accent palette: Option A (warm amber + hot pink). Locked Ken's Phase 3 pick into `--accent` / `--accent-hot` tokens.
- **ADR-008** — Analytics: Vercel Analytics + Speed Insights. Free tier on existing deploy; no third-party cookies.

---

## 11. Risks deferred to Phase 5 (PO validation)

- **Existing image `unoptimized: true` in `ProjectCard.tsx`** — needs Story 3.1 to determine whether to drop the flag (see §4.6).
- **Self-hosted font migration** — current Google Fonts `<link>` is fine for now, but if NFR-P5 fails after Story 8.1, we may move JetBrains Mono + Roboto Condensed into `public/fonts/` with `next/font/local`.
- **Bundle analyzer not wired by default** — should we add `@next/bundle-analyzer` as a dev convenience? (Lean toward yes; add in Story 1.2 as a nice-to-have script.)

PO will surface gaps and propose fixes in Phase 5.

---

## 12. Definition of "architecture done"

- [x] Stack locked (§1) — versions + ADR cites.
- [x] Folder structure laid out with feature grouping (§2).
- [x] Routing model documented; SSG, no middleware, no API routes (§3).
- [x] Content types defined; `siteConfig` + data flow specified (§4).
- [x] Build/deploy pipeline diagrammed; env vars documented (§5).
- [x] SEO surfaces specified — metadata, OG, sitemap, robots, JSON-LD (§6).
- [x] Analytics decision made; events spec'd (§7).
- [x] Testing strategy with concrete configs/sketches at each layer (§8).
- [x] Performance budget plan tied to specific stories (§9).
- [x] Two new ADRs filed (007, 008).

---

**Next phase (Phase 5 — PO):** Adopt the Product Owner persona; run a master validation checklist across `brief.md`, `prd.md`, `front-end-spec.md`, `architecture.md` for internal consistency; shard the PRD epics into `docs/stories/epic-N/story-N.M.md` files; surface gaps and propose fixes. **Wait for Ken's "go" before starting.**
