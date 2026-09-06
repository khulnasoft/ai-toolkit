# ADR-007: Stability Labels and Package Ownership Metadata

**Status:** Proposed  
**Date:** 2026-08-05  
**Stakeholders:** SDK core, provider maintainers, docs

---

## Context

Consumers and docs need a trustworthy signal of how much a package's API may change, and who owns it. Packages currently carry no structured stability or ownership metadata, and `CODEOWNERS` provides only directory-level ownership.

## Decision

- Every package declares a `stability` field in `package.json`: `stable` | `beta` | `alpha` | `internal`.
- Every package declares an `owners` field (array of owning teams/usernames).
- Labels are surfaced in generated API references and validated by `validate-structure` (warning during migration, error at the end).
- `CODEOWNERS` remains the source of truth for review routing; `owners` metadata feeds docs and tooling.

## Rationale

Standardized, machine-readable signals enable docs generation, change-control, and a zero-unowned-packages guarantee.

## Alternatives Considered

- Stability derived from semver major only: rejected — not fine-grained enough for `internal` packages.

## Consequences

### Positive

- Docs and tooling can sort by stability; owners are explicit.

### Negative / Trade-offs

- Ownership metadata can drift from CODEOWNERS (mitigated by validator consistency check in Phase C/E).

## Implementation

- **Timeline**: Phase C
- **Owner**: SDK core
- **Effort**: Small
- **Risk**: Low

## References

- PLATFORM_PRIMITIVES_PLAN.md section C4
