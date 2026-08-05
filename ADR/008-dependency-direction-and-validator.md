# ADR-008: Dependency-Direction Rules and Validator Responsibilities

**Status:** Proposed  
**Date:** 2026-08-05  
**Stakeholders:** SDK core, infra, all maintainers

---

## Context

The architecture depends on one-directional dependencies (packages → packages; apps → packages; examples → packages). Currently nothing prevents a package from importing an app or an example, and the structure validator covers only a subset of manifest concerns.

## Decision

- Dependency direction is enforced by the structure validator (Phase C upgrade):
  - Forbidden: `packages/*` → `apps/*`, `packages/*` → `examples/*`, `apps/*` → `apps/*`.
  - Allowed: `apps/*`/`examples/*` → `packages/*`; packages may depend on other packages subject to domain layering (`core` ← `providers` ← `adapters`).
- The validator becomes the single enforcement point for: workspace inclusion, duplicate names, export conditions, dependency direction, generated-metadata consistency (`inventory.json`, `example.json`), and Node-builtin bans in runtime-neutral packages.
- Validator violations fail CI; errors vs warnings follow the Phase C/E escalation policy.

## Rationale

Centralizes governance in one tool with a clear error model, making the migration waves safe and reviewable.

## Alternatives Considered

- Enforce in lint only: rejected — dependency graphs need manifest-level checks that lint rules cannot express.

## Consequences

### Positive

- One source of truth for boundaries; CI gate before any package move.

### Negative / Trade-offs

- Validator must be maintained as the source of governance (dedicated tests required).

## Implementation

- **Timeline**: Phase C
- **Owner**: SDK core + infra
- **Effort**: Medium
- **Risk**: Medium

## References

- PLATFORM_PRIMITIVES_PLAN.md sections C5/C6
