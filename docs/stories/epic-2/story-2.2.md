# Story 2.2 — Hero italic verb + word list curation

**Status:** pending
**Epic:** 2 — Hero + Loader
**Blocks:** 2.3
**Blocked-by:** 1.5
**Files (primary):** `src/components/sections/HeroSection.tsx`, `src/components/primitives/ScrambleText.tsx`

## User statement
As a recruiter I want the value line to land in 3 seconds so that I know what Shiin builds before scrolling.

## Acceptance criteria
- [ ] Value line restructured to render two parts:
  - Italic verb: **`build`** (Phase 3 §8 Q2 answer, italicized via `<em>` or `font-style: italic`).
  - Scramble target: cycles `SCRAMBLE_WORDS`.
- [ ] Identity line stays "Hi, my name is **Shiin**" with `Shiin` in `--text-bright` / `--primary` highlight per spec §3.1.
- [ ] `SCRAMBLE_WORDS` reviewed; default-keep set: `things`, `mobile apps`, `websites`, `web apps`, `games`, `ui/ux`, `brands`, `academic papers`, `experiences`, `solutions`. **Mark for `TODO_KEN` only if Ken explicitly wants edits**; no fabricated additions.
- [ ] No content-driven layout shift when the longest word renders — fixed `min-w-[16ch]` (current behavior) preserved.
- [ ] Italic styling visible at all five breakpoints (spec §5).

## Definition of Done
Visual review on 360, 768, 1440 widths. Italic "build" reads as the spec describes — verb form, not adjective.

## Notes
- Spec §3.1.
- ScrambleText itself doesn't change here — only HeroSection consumes it differently.
