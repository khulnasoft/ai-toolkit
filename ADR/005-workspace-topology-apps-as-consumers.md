# ADR-005: Workspace Topology — Apps as Non-Published Consumers

**Status:** Proposed  
**Date:** 2026-08-05  
**Stakeholders:** SDK core, docs, marketing, developer experience

---

## Context

The platform-primitives migration separates SDK primitives (`packages/*`) from applications. Today `apps/docs` and `apps/www` are **not** workspace members (no `apps/*` glob in `pnpm-workspace.yaml`), and the playground lives under `examples/playground` as `@example/playground`. Applications must consume packages, never the reverse.

## Decision

- Add `apps/*` to the pnpm workspace as private, non-published consumers.
- Every app (`docs`, `www`, `playground`, future `console`) depends only on `@ai-toolkit/*` packages (and external deps), never on another app or on `examples/*`.
- Apps are excluded from changesets and the release pipeline.
- The playground is promoted from `examples/playground` to `apps/playground` and renamed `@ai-toolkit/playground`.
- Dependency direction is CI-enforced: no `packages/*` → `apps/*` or `examples/*` edge, and no `apps/*` → `apps/*` edge.

## Rationale

Keeps the SDK free of app coupling, enables app CI independently of release, and matches the recommended product-workspace structure.

## Alternatives Considered

- Keep apps outside the workspace: rejected — `workspace:*` deps and turbo tasks would not resolve uniformly.
- Publish apps: rejected — apps are not public artifacts.

## Consequences

### Positive

- One dependency direction; apps can be rebuilt/released independently.

### Negative / Trade-offs

- Workspace grows; `pnpm install` and turbo graph include apps (addressed by tagging tasks in Phase E).

## Implementation

- **Timeline**: Phase D
- **Owner**: SDK core
- **Effort**: Medium
- **Risk**: Low

## References

- Related: ADR-004 (published names unchanged), PLATFORM_PRIMITIVES_PLAN.md Phase D
