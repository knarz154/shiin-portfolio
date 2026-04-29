# ADR-006 — Loader copy: `INIT()`

**Status:** Accepted · 2026-04-28

## Context
`Loader.tsx:24` ships the literal string `"L0AD1NG"`. The build prompt's §1 hard-rule list explicitly forbids that exact wording — "pick your own, not L0AD1NG". This is a §1 violation, not a polish issue.

## Decision
Replace with **`INIT()`**. Reads as a function call, matches the surrounding code-tag aesthetic (`<Shiin/>`, `Section />`, `class Shiin`). Fix lands in **Epic 1: Foundation**, not as a polish side-quest.

## Consequences
- Loader font/animation unchanged; only the textual content changes.
- Final acceptance check (§5 of build prompt): `grep` for `L0AD1NG`, `Yasio`, `Baszczok`, `yasio` produces zero hits in `src/`.
- Ensures we don't ship the forbidden string on any future build before the loader story runs.
