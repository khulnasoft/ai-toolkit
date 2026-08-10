---
'ai': patch
---

Examples reorganization (Wave 5 of MIGRATION_PLAN.md):

- Reorganize all 21 examples from a flat `examples/<name>` layout into 4
  categorized subdirectories: `01-foundations`, `02-framework-integration`,
  `03-integrations`, `04-tools`.
- Add an `example.json` metadata file to every example and a
  `examples/registry.json` discovery index.
- Update `pnpm-workspace.yaml` glob (`examples/*` → `examples/*/*`) and the root
  `tsconfig.json` example project references to the new paths.
- Correct every example `tsconfig.json` project-reference path depth
  (`../../packages` → `../../../packages`) and fix pre-existing stale references
  (`gateway`, `provider-utils`, and `provider`) that pointed at packages moved
  during Phase 1.
- Fix the stale `packages/rsc/tests/e2e/next-server` workspace entry in
  `pnpm-workspace.yaml` → `packages/adapters/rsc/tests/e2e/next-server`.
- Regenerate package `tsconfig.json` project references via
  `pnpm update-references`, which repaired 36 stale cross-package references
  left over from Phase 1 (e.g. `packages/providers/azure` and
  `packages/providers/google-vertex` referenced providers at the old flat
  `../../openai` / `../../google` paths that no longer resolve).

No public API changes — examples are private `@example/*` packages.
