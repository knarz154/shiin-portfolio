# Story 3.4 — `/work/[slug]/page.tsx` with `generateStaticParams`

**Status:** pending
**Epic:** 3 — Work
**Blocks:** 3.5, 7.1, 8.1, 8.5
**Blocked-by:** 3.3
**Files (primary):** `src/app/work/[slug]/page.tsx` (new), `src/app/work/[slug]/not-found.tsx` (new), `src/components/work/ProjectDetailLayout.tsx` (new)

## User statement
As a recruiter I want a real page per project so that I can read about it without bouncing to an external site.

## Acceptance criteria
- [ ] `app/work/[slug]/page.tsx` server component:
  - `generateStaticParams()` reads `content/projects.ts` slugs.
  - `generateMetadata({ params })` returns per-project `title` / `description` / `openGraph` / `twitter` / canonical, all built from `siteConfig` + project record.
  - Renders `<ProjectDetailLayout project={project} />`.
- [ ] `<ProjectDetailLayout>` (client where needed for animation) includes:
  - **Header**: title (`text-display`), role · year (`text-muted`), tech-stack pills, primary CTA (`View live →` linking `liveUrl`, suppressed for `screenshots`-only with disclosure pill instead).
  - **Body**: `longDescription` (markdown / plaintext — render as `<p>`/`<ul>` blocks; full markdown engine deferred). `TODO_KEN` placeholder visible if the field is empty.
  - **Gallery**: each `screenshots[]` entry rendered via `next/image`, lazy-loaded, `sizes="(max-width: 768px) 100vw, 50vw"`.
  - **Footer**: `← Back to all work` link to `/#work`. Optionally a `Next project →` to the next slug in array order.
- [ ] `not-found.tsx` for unknown slugs: code-tag "404 / project-not-found", brand mark, link back to `/#work`.
- [ ] JSON-LD `CreativeWork` injected via `<script type="application/ld+json">` (per architecture §6.5).
- [ ] All seven URLs resolve in `npm run dev` and `npm run build`.
- [ ] Focus management: on route change, focus moves to the page `<h1>` (`tabIndex={-1}` + ref + `useEffect`).

## Definition of Done
`next build` produces seven static `/work/*` routes. Each renders correctly with focus on `<h1>`. `not-found.tsx` returns status 404 for `/work/whatever`.

## Notes
- Architecture §3.1, §3.3, §6.5.
- Long-form `longDescription` will be `TODO_KEN` for most projects until Ken supplies write-ups; placeholders must be visually obvious (see Brief §4 Content Sourcing Protocol).
- Sticky `← Work` back link per spec §3.3 — `position: sticky; top: 80px;` on `lg+` only.
