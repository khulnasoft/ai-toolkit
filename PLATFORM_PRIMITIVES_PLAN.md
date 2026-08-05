# Implementation Plan: Separate Platform Primitives from Applications

**Status:** Draft for review
**Date:** August 2026
**Scope:** Make the SDK monorepo own platform primitives (contracts, providers, adapters, MCP, workflows, memory/RAG primitives, registries, developer tooling) while applications (docs, www, playground, future enterprise console) and `examples/` become consumers — never dependencies.

---

## 1. Goals & Principles

1. **One direction of dependency.** Apps and examples import from `packages/*`. No package may depend on an app; no app depends on another app. Enforced by tooling, not convention.
2. **Primitives are runtime-neutral.** Contracts and capability metadata are browser-safe; Node-only code lives behind adapters.
3. **Apps are thin consumers.** `apps/docs`, `apps/www`, `apps/playground` consume published/workspace packages only.
4. **Examples are content, not platform.** Runnable, categorized, with machine-readable metadata (`example.json`).
5. **Public names are a compatibility boundary.** Physical migration must not change published package names (already accepted in `ADR/004`).

## 2. Current State (verified against repo)

| Area               | Current state                                                                                                                                                                                          |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Workspace globs    | `pnpm-workspace.yaml` includes `packages/{core,providers,adapters,mcp,special,validation,infrastructure}/*`, **legacy `packages/*`**, `tools/*`, `examples/*`. **`apps/*` is NOT a workspace member.** |
| Domain migration   | `packages/core/runtime`, `packages/validation/capabilities` migrated; `packages/mcp` has direct `package.json`. ~48 legacy flat packages remain under `packages/*`.                                    |
| Runtime contracts  | `packages/core/runtime` exports `RuntimeTarget`, `RuntimeCapabilities`, `RuntimeCapabilityName`, `assertRuntimeCapability`, `createRuntimeContext` (browser-safe). ADR-004 accepted.                   |
| Capability catalog | `packages/validation/capabilities` owns model-category descriptors + in-memory catalog primitive (`ModelCapability`, `ModelCatalog`).                                                                  |
| Apps               | `apps/docs` is a content-only stub (`@ai-toolkit/docs`, no build). `apps/www` is a Next.js app consuming `ai` + `@ai-toolkit/react`.                                                                   |
| Playground         | Lives at `examples/playground` (`@example/playground`, Next.js) — mislocated per target structure; not an isolated app.                                                                                |
| Examples           | 21 flat directories under `examples/` (incl. `ai-functions`, `playground`, framework examples). No `example.json` metadata anywhere.                                                                   |
| Validator          | `tools/scripts/validate-structure.mjs`: domain dirs, packages-root guard, duplicate names, exports/source entries, Node-builtin bans for core/validation, root configs, CODEOWNERS coverage.           |
| Health             | `tools/scripts/health-check.mjs` exists.                                                                                                                                                               |
| Governance         | `CODEOWNERS` exists with domain rules; ADRs at `ADR/{template,004-009...}.md`; no `apps/` rules yet, no stability labels, no export-condition metadata.                                                |

## 3. Target Structure

```
apps/
  docs/        # canonical docs: API references (generated), recipes, provider/model catalog pages
  www/         # marketing, ecosystem, templates, gateway/enterprise positioning
  playground/  # chat, model comparison, prompt editor, structured outputs, tool testing,
               # multimodal, streaming telemetry, token/cost views, shareable sessions
  console/     # future enterprise console (stub only)
examples/
  <category>/<name>/   # runnable, machine-readable example.json, NOT platform code
packages/
  core/ providers/ adapters/ mcp/ special/ validation/ infrastructure/
tools/
  scripts/ eslint-config/ tsconfig/ ...
```

App rules:

- `apps/*` are private, not published, excluded from changesets/release.
- `apps/docs` consumes generated API references produced from package exports; it does not reimplement SDK logic.
- `apps/playground` consumes provider + capability-catalog packages; provider API differences surface only through the capability catalog, never hard-coded per-app.
- `examples/playground` is removed or moved into `apps/playground`.

---

## 4. Phases

### Phase A — Baseline & Inventory ✅

- [x] **A1. Inventory manifest.** `tools/scripts/inventory.mjs` (`pnpm inventory`) walks every workspace package and emits `build/inventory.json`:
  - package name, dir, domain (or `legacy`), workspace glob matched
  - dependency + devDependency + optionalDependency edges (workspace vs external vs Node builtin)
  - `exports` map entries and `conditions` (import/require/node/browser/default), `source` entry
  - runtime assumptions (imports of Node builtins, `globalThis.fetch` use, edge-safe heuristics)
  - public API surface (exports map leaf entries)
- [x] **A2. Baseline report.** `tools/scripts/baseline.mjs` (`pnpm baseline`) runs and captures: inventory, `pnpm health-check`, `pnpm validate-structure`, `pnpm types:check`, focused builds (`runtime` + `capabilities`), package tests — into `build/baseline-<date>/` with per-check logs + `report.json` + `SUMMARY.md`.

**Baseline findings:**

- 77 workspace packages: 51 under `packages/` (48 legacy + migrated `runtime`/`capabilities`/`mcp`), 21 examples, 5 tools.
- `providers/`, `adapters/`, `special/`, `infrastructure/` have **zero** migrated packages; 48 still to move.
- No package imports/depends on Node builtins; 72/77 lack a `source` entry.
- `apps/*` not in workspace; `examples/playground` mislocated; no `example.json` metadata.
- `types:check`/`test` failures are **environmental** (8 GB, no swap → OOM-killed turbo fan-out); focused builds pass.

**Gate (done):** inventory + baseline report committed; CI job for inventory freshness is a follow-up.

### Phase B — Decision Records & Architecture Matrix ✅

- [x] **B1. Canonical domain mapping.** Verified against every package's `package.json` and recorded in `architecture/domain-mapping.md`. `langchain`/`llamaindex` classified as framework **adapters** (depend on `ai`); `codemod`/`devtools`/`gateway`/`khulnasoft` in `special`; `test-server` in `infrastructure`.
- [x] **B2. Public-name decision.** Reaffirmed ADR-004: published names unchanged during physical migration.
- [x] **B3. New ADRs.**
  - `ADR/005-workspace-topology-apps-as-consumers.md` — apps as non-published consumers; `apps/*` added after package groups are verified.
  - `ADR/006-export-condition-conventions.md` — `node`/`browser`/`worker`/`default`; runtime-neutral packages avoid Node conditions.
  - `ADR/007-stability-labels-and-ownership.md` — `stability` + `owners` metadata; validator-enforced.
  - `ADR/008-dependency-direction-and-validator.md` — one-directional deps enforced by the validator.
  - `ADR/009-example-metadata-schema.md` — `example.json` schema and categorization.
- [x] **B4. Architecture matrix.** `architecture/runtime-support.md` + `architecture/model-capabilities.md`: **current** vs **planned** per runtime target and model capability; coarse "current" cells are reconciliation checklists to be confirmed against provider exports in Phase E2 before being treated as claims.

**Gate (done):** ADRs created and matrix written. Publishing the matrix into the `apps/docs` content tree is deferred to Phase D3 (which moves `architecture/` content into the docs app).

### Phase C — Boundary & Governance Foundation

- [ ] **C1. Shared runtime-capability package.** Finalize `packages/core/runtime` (already browser-safe) as the internal contract module. Move/re-export shared capability types used by providers into it where the dependency direction is `core ← providers ← adapters` only.
- [ ] **C2. Export-condition conventions.**
  - Codify in `AGENTS.md` + `tools/eslint-config`:
    - `exports` must declare `import`/`require`, and `node`/`browser` (or `worker`) conditions where the package is conditionally runtime-aware, plus `default`.
    - Runtime-neutral packages (`core`, `validation`) must NOT declare Node-only `imports` conditions.
  - Extend the structure validator: missing/invalid condition keys → error.
- [ ] **C3. Lint rules against Node imports.** Add ESLint/Biome rule set (in `tools/eslint-config`) that rejects `node:*` and Node-global references in runtime-neutral packages (extend the existing `NODE_BUILTINS` check from deps to source imports).
- [ ] **C4. Governance metadata.**
  - Real root `CODEOWNERS` covering `apps/*`, `examples/*`, `tools/*`, each domain; existing rules extended, not replaced.
  - Package ownership metadata + `stability` label in each `package.json`.
  - Validator checks: every package has a non-empty `owners`/`stability` field (warn in Phase C, error in Phase E).
- [ ] **C5. Validator upgrade** (`tools/scripts/validate-structure.mjs`):
  - package manifest checks (name, version, source, exports map + condition coverage)
  - workspace inclusion check (package dir matched by a glob in `pnpm-workspace.yaml`)
  - duplicate package names
  - forbidden dependency directions (`packages/*` → `apps/*` or `examples/*`; `apps/*` → `apps/*`)
  - export-condition consistency
  - generated-metadata consistency (`inventory.json` freshness, `example.json` schema)
- [ ] **C6. Run gating.** Add `pnpm validate-structure` + new lint rules to CI on all PRs. Fix all surfaced violations before Phase D moves code.

**Gate:** validator + lint green repo-wide; governance metadata populated.

### Phase D — Workspace & App Separation

- [ ] **D1. Add `apps/*` to workspace** (`pnpm-workspace.yaml` → `- 'apps/*'`), keeping legacy glob during migration. Tag apps `"private": true` and exclude from changesets/release pipeline (`ci:release` filters).
- [ ] **D2. Promote playground.** Move `examples/playground` → `apps/playground`; rename to `@ai-toolkit/playground`; keep consuming only `@ai-toolkit/*` packages. Wire `pnpm dev`/`pnpm build` targets.
- [ ] **D3. Make docs a real app.** `apps/docs`: add Next.js build (mirror `apps/www` scaffolding), move `content/` under `apps/docs/content`, bring `architecture/` matrix + mapping into the docs app, add generated-API-reference ingestion from package `exports` (via inventory).
- [ ] **D4. Examples metadata.** Add `example.json` to each example dir (name, category, framework, difficulty, providers, features, docs link). Extend validator to require schema for new examples; add `example-catalog` generator for `apps/docs` and `apps/www` consumption.
- [ ] **D5. Update CODEOWNERS** for new `apps/*` paths; validator's CODEOWNERS coverage check includes `apps/`, `examples/`.

**Gate:** apps build in CI; `pnpm test` still green; no app→app or package→app edges.

### Phase E — Package Migration Waves & Finalization

- [ ] **E1. Wave 1 — core/validation:** `ai`, `provider`, `provider-utils` → `packages/core/`; `valibot` → `packages/validation/`. Update imports via codemod (`tools/scripts/generate.mjs`/codemod) + `pnpm update-references`.
- [ ] **E2. Wave 2 — providers:** migrate ~31 provider packages to `packages/providers/<name>/` in batches (5–8 per PR), each verified with validator + focused tests. Reconcile `architecture/model-capabilities.md` "current" cells against each provider's exports as they land.
- [ ] **E3. Wave 3 — adapters/special/infrastructure:** `react`, `rsc`, `angular`, `svelte`, `vue`, `langchain`, `llamaindex` → `packages/adapters/`; `gateway`, `khulnasoft`, `codemod`, `devtools` → `packages/special/`; `test-server` → `packages/infrastructure/`.
- [ ] **E4. Workspace finalization.** Remove legacy `- 'packages/*'` glob only after the final package wave; run `pnpm install --force` and verify no package is orphaned.
- [ ] **E5. Turbo update.** Only after groups are verified: add domain-scoped tasks (`build:core`, `build:providers`, `build:adapters`) and per-group `dependsOn`, replacing the current implicit globs. Keep `build:examples` separate from package builds.
- [ ] **E6. Release pipeline.** Confirm changesets cover only published `packages/**`; apps and examples excluded.

**Gate:** `packages/*` glob removed; `pnpm health-check`, `pnpm validate-structure`, `pnpm types:check`, `pnpm build`, `pnpm test` all green; zero legacy packages.

---

## 5. Validation Commands (run after every phase)

```bash
pnpm health-check
pnpm validate-structure
pnpm inventory
pnpm types:check
pnpm build --filter=@ai-toolkit/runtime --filter=@ai-toolkit/capabilities
pnpm test --filter=@ai-toolkit/runtime
pnpm lint:check
```

## 6. Risks & Mitigations

| Risk                                              | Mitigation                                                                          |
| ------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Public name changes break consumers               | ADR-004: names unchanged; migration is physical only; codemod + `update-references` |
| `apps/*` workspace addition destabilizes installs | Add in Phase D after groups verified; legacy glob retained until E4                 |
| Validator/lint blockers block migration velocity  | Land C5/C6 fully green before moving code; validator is the speed-up, not a brake   |
| Node-only imports creep into core                 | C3 lint + C5 builtin bans (extends current dep-level check to source level)         |
| Example/playground duplication                    | Single home in `apps/playground`; examples stay categorized content                 |
| Baseline `types:check`/`test` OOM locally         | Cap turbo concurrency for local baseline; run full checks on CI hardware            |

## 7. Success Criteria (Definition of Done)

- No `packages/*` imports from `apps/*` or `examples/*`; no app→app edges (CI-enforced).
- `apps/docs`, `apps/www`, `apps/playground` build in CI as workspace members and consume only `@ai-toolkit/*`.
- Every example has valid `example.json`; catalog generated for docs.
- Runtime-support and model-capability matrices mark current vs planned, not unsupported.
- Validator covers manifests, workspace inclusion, duplicate names, export conditions, dependency direction, generated-metadata consistency.
- Legacy `packages/*` workspace glob removed; all packages in a domain group.
