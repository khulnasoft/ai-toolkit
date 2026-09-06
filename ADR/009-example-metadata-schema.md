# ADR-009: Example Metadata Schema and Categorization

**Status:** Implemented with modifications (see Implementation notes below)  
**Date:** 2026-08-05  
**Stakeholders:** SDK core, developer experience, docs

---

## Implementation notes (added September 2026)

Implemented with the following deltas from the Decision above:

- Categories use ordered directory prefixes: `01-foundations`,
  `02-framework-integration`, `03-integrations`, `04-tools` (replacing the
  proposed `foundations`, `advanced-patterns`, `production-apps` set).
- A central `examples/registry.json` index exists alongside the per-example
  `example.json` files (consumed by `apps/www/lib/templates.ts`).
- `examples/04-tools/playground` was kept as an example instead of being
  promoted to `apps/playground`.

---

## Context

`examples/` currently holds 21 flat, uncategorized runnable projects (including the misplaced `playground`). There is no machine-readable metadata, so docs and search cannot catalog them.

## Decision

- Examples are content, not platform code: they are runnable, categorized, and consumed by apps (docs, www), never depended upon by `packages/*`.
- Every example declares `example.json`:
  ```json
  {
    "name": "string",
    "category": "foundations | framework-integration | integrations | advanced-patterns | production-apps",
    "framework": "string",
    "difficulty": "beginner | intermediate | advanced",
    "providers": ["string"],
    "features": ["string"],
    "docs": "relative/path.md"
  }
  ```
- `examples/playground` is promoted to `apps/playground`; it is an app, not an example.
- A generator (`tools/scripts/generate.mjs` extension) scaffolds new examples with valid metadata; the validator requires valid `example.json` for new examples and a catalog is generated for `apps/docs`.

## Rationale

Enables catalog generation, search, and docs linking without hand-maintained lists; enforces examples-as-content.

## Alternatives Considered

- Keep examples un-metadata'd: rejected — no discovery or catalog generation.

## Consequences

### Positive

- Machine-readable discovery; playground decoupled from examples.

### Negative / Trade-offs

- Upfront metadata effort for existing 20 examples (bulk backfill step in Phase D).

## Implementation

- **Timeline**: Phase D
- **Owner**: SDK core + developer experience
- **Effort**: Medium
- **Risk**: Low

## References

- PLATFORM_PRIMITIVES_PLAN.md section D4
