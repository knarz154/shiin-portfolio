# ADR-005 — Project detail: dedicated routes `/work/[slug]`

**Status:** Accepted · 2026-04-28

## Context
YASIO §2 specifies that clicking a tile reveals project detail (modal, side panel, or dedicated route). Current behavior in `ProjectCard.tsx:70-72` opens an external live URL via `window.open(link, '_blank')`. Ken has 7 real projects with screenshots, descriptions, and tech stacks — enough substance to deserve indexable, deep-linkable pages.

## Decision
Generate **statically-rendered detail pages at `/work/[slug]`** for each project. Tile click → internal navigation. The "live URL" remains accessible as a primary CTA inside the detail page.

## Consequences
- **Routing:** App Router `app/work/[slug]/page.tsx` with `generateStaticParams()` from the typed projects content layer (see ADR pending in Phase 4).
- **OG images:** one dynamic `next/og` route per project — huge for LinkedIn/Twitter sharing of recruiter-relevant work.
- **SEO:** each project becomes its own indexable page with project-specific metadata, JSON-LD `CreativeWork`, and unique canonical URL.
- **Sitemap:** `app/sitemap.ts` enumerates `/` + `/work/[slug]` for every project.
- **A11y:** focus management on tile-click → route transition (focus the page heading, announce route change).
- **Content gap:** current project blurbs are 1-line. Detail pages need longer write-ups (problem, role, stack, outcome). Will be tagged as `TODO_KEN` placeholders in Phase 6 stories until Ken provides text.
- **Privacy:** `disclosure: "screenshots"` projects (GSO-RMS, NegosyoNexus) get detail pages too, but no live link — only screenshots and write-up.
