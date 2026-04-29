# Story 1.1 — Working-tree hygiene & repo bootstrap

**Status:** pending
**Epic:** 1 — Foundation
**Blocks:** 1.2 (and transitively all subsequent stories)
**Blocked-by:** —
**Files (primary):** `.gitignore`, `README.md`, `public/web.config` (delete), `out/` (delete), uncommitted: `src/app/globals.css`, `src/components/AboutSection.tsx`, `src/components/IDECodeBlock.tsx`, `src/components/IDEWindow.tsx`; planning artifacts to track: `docs/`, `_bmad/` (minus per-user `*.user.toml`), `.claude/skills/` (minus `*.local.json`)

## User statement
As Ken (developer) I want to start Phase 6 from a clean working tree with conventional-commits in place so that every later story produces an atomic, reviewable diff.

## Acceptance criteria
- [x] **🟡 Ken-input first**: decide commit / stash / discard for each of the four uncommitted files (`globals.css`, `AboutSection.tsx`, `IDECodeBlock.tsx`, `IDEWindow.tsx`). SM blocks here until Ken answers. — *Resolved at Phase 6 entry: shared-token globals.css change committed as `a51c12b style(tokens): timeline behind content, bullets on top`; about-scoped trio committed as `9415870 style(about): glass IDE window + tokenized <About /> label`. Working tree clean of source modifications.*
- [ ] Stale `out/` directory removed from repo (confirm not referenced by `next.config.mjs`).
- [ ] `public/web.config` removed (IIS legacy; ADR-001 chose Vercel).
- [ ] `.gitignore` includes: `node_modules/`, `.next/`, `out/`, `_bmad-output/`, `*.log`, `.env*` (verify; add missing). **Also gitignore per-user state**: `_bmad/config.user.toml`, `_bmad/custom/config.user.toml`, `.claude/settings.local.json` (general patterns: `*.user.toml` scoped to `_bmad/`, `*.local.json` scoped to `.claude/`).
- [ ] `README.md` scaffolded with stub headings (Install, Dev, Build, Deploy, Add a project, Add a Lab item, ADR index). Body filled in Story 8.8.
- [ ] **Track BMAD planning artifacts**: `docs/` (Phases 0-5 deliverables), `_bmad/` (installer-managed framework, minus per-user `*.user.toml`), `.claude/skills/` (BMAD agent skills, minus `*.local.json`). *Added 2026-04-29: Phase 5 produced these dirs after Story 1.1 was first written; tracking decision belongs here, not Story 1.2.*
- [ ] **Two conventional-commits land** (amended 2026-04-29 — original AC said one):
    1. `chore: repo hygiene + readme scaffold` — covers `out/` + `web.config` deletion, `.gitignore` update, `README.md` scaffold.
    2. `docs: track BMAD planning artifacts` — covers tracking `docs/`, `_bmad/`, `.claude/skills/`.
    **Rationale for the split:** the planning-artifacts commit touches 50+ files spanning a different concern (tracking pre-existing planning output) than the hygiene commit (deletions + new infra files). One commit conflating both is not atomic and would resist `git revert` of either concern independently. Per `feedback_amend_dont_violate_ac` memory: amend, don't silently violate.

## Definition of Done
`git status` shows a clean tree (or only Ken-approved staged/stashed work). `npm run dev` boots without console errors.

## Notes
- PO validation §3.2 F5/F6: confirm `web.config` and `out/` are unreferenced before removing.
- Conventional Commits format reminder: `<type>(<scope>): <subject>` — types in use here: `chore`, `feat`, `fix`, `refactor`, `test`, `docs`, `style`, `perf`, `ci`.
- README is **scaffold only** at this story; full content lands in Story 8.8.
