# ADR-006: Export-Condition Conventions

**Status:** Proposed  
**Date:** 2026-08-05  
**Stakeholders:** SDK core, provider maintainers, infra

---

## Context

Packages must declare which runtimes their entry points target so bundlers (`node`, `browser`, `worker`) resolve the correct build. Today export maps are inconsistent (e.g. `@ai-toolkit/runtime` exposes only `types`/`import`/`require`; many legacy packages expose only `main`/`module`/`types`). Runtime-neutral packages must never resolve to Node-only entry points.

## Decision

Every public package's `exports` map must:

- Declare top-level `import` and `require` conditions (plus `types`).
- Declare `browser` (and `worker`/`edge` where supported) conditions resolved as aliases of the runtime-neutral build, or omit them intentionally when the package is Node-only.
- Include a `default` condition.
- Runtime-neutral packages (`core`, `validation`) must not reference Node-only entry points under any condition.
- `@ai-toolkit/runtime`'s `exports` is the canonical example: `types`/`import`/`require` (+ future `node`/`browser` sub-entries).

## Rationale

Standard, predictable resolution across all consumers and aligns with the runtime-capability boundary in ADR-004.

## Alternatives Considered

- Single default condition only: rejected — cannot express runtime-specific builds.
- Embedded build-time resolution via `main`/`module`: rejected — legacy, not `node`/`browser` aware.

## Consequences

### Positive

- Bundlers resolve correct builds; lint can reject Node-only imports in neutral packages.

### Negative / Trade-offs

- Requires editing every `exports` map; migration wave (Phase E) updates each package.

## Implementation

- **Timeline**: Phase C (rules) + Phase E (package updates)
- **Owner**: SDK core
- **Effort**: Medium
- **Risk**: Medium (wide blast radius)

## References

- Related: ADR-004 (runtime contracts), PLATFORM_PRIMITIVES_PLAN.md sections C2/C5
