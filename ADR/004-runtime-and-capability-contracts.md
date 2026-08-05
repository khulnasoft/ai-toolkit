# ADR-004: Runtime-neutral contracts and capability metadata

## Status

Accepted

## Context

The toolkit supports multiple JavaScript runtimes and an expanding set of model categories. Core packages must not depend on Node-only APIs, while providers need a typed way to advertise model capabilities without forcing every model into a lowest-common-denominator interface.

## Decision

- `@ai-toolkit/runtime` owns runtime-neutral capability interfaces and typed runtime errors.
- `@ai-toolkit/capabilities` owns model-category descriptors and an in-memory catalog primitive.
- Published package names remain unchanged during physical domain migration.
- Runtime-specific implementations and storage-backed catalogs remain optional adapters.
- Unsupported capabilities fail explicitly; they are never silently downgraded.

## Consequences

New core and provider code can depend on browser-safe contracts. Existing packages migrate incrementally, with package exports and public names treated as compatibility boundaries. The catalog is intentionally small and composable so hosted registries, docs generation, and playgrounds can consume it later.
