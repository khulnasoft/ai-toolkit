# Implementation Plan: Separate Platform Primitives from Applications

**Status:** In progress — Phases A, B substantially complete; C/D/E largely complete except final wave (see §8 review 2026-09-06)
**Date:** August 2026 (reviewed/updated September 2026)
**Scope:** Make the SDK monorepo own platform primitives (contracts, providers, adapters, MCP, workflows, memory/RAG primitives, registries, developer tooling) while applications (`apps/docs`, `apps/www`) and `examples/` become consumers — never dependencies.

---

## 1. Goals & Principles

1. **One direction of dependency.** Apps and examples import from `packages/*`. No package may depend on an app; no app depends on another app. Enforced by tooling, not convention.
2. **Primitives are runtime-neutral.** Contracts and capability metadata are browser-safe; Node-only code lives behind adapters.
3. **Apps are thin consumers.** `apps/docs`, `apps/www` consume published/workspace packages only. (The playground intentionally stays a categorized example, not an app — D2.)
4. **Examples are content, not platform.** Runnable, categorized, with machine-readable metadata (`example.json`).
5. **Public names are a compatibility boundary.** Physical migration must not change published package names (already accepted in `ADR/004`).

## 2. Current State (verified against repo — updated 2026-09-06)

| Area               | Current state                                                                                                                                                                                                                                                                                                           |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Workspace globs    | `pnpm-workspace.yaml` includes `packages/{core,providers,adapters,ui,mcp,special,validation,infrastructure}/*`, **legacy `packages/*`**, `tools/*`, `examples/*/*`, **`apps/*`**, plus RSC e2e fixture. `apps/*` membership (planned in D1) is **done**.                                                                |
| Domain migration   | 56 packages discovered, 54 in domains, **only 2 legacy flat packages remain: `packages/langchain`, `packages/llamaindex`** (both → `adapters` per `architecture/domain-mapping.md`). All core/validation/providers/adapters-waves except those two are migrated.                                                        |
| Runtime contracts  | `packages/core/runtime` exports `RuntimeTarget`, `RuntimeCapabilities`, `RuntimeCapabilityName`, `assertRuntimeCapability`, `createRuntimeContext` (browser-safe). ADR-004 accepted. No package imports/depends on Node builtins (validator source-scan green).                                                         |
| Capability catalog | `packages/validation/capabilities` owns model-category descriptors + in-memory catalog primitive (`ModelCapability`, `ModelCatalog`).                                                                                                                                                                                   |
| Apps               | `apps/docs` is a **real Next.js app** (D3 done) with restructured `apps/docs/content/` (unprefixed dirs). `apps/www` is a Next.js app consuming workspace packages. `apps/studio` exists (outside this plan). No `apps/playground` by decision (D2: playground stays an example).                                       |
| Playground         | Lives at `examples/04-tools/playground` with valid `example.json`, indexed in `examples/registry.json` — its canonical home by D2 decision.                                                                                                                                                                             |
| Examples           | Categorized `examples/01-foundations`, `02-framework-integration`, `03-integrations`, `04-tools` + `registry.json`; every example dir carries valid `example.json` (D4 done — validator example checks green).                                                                                                          |
| Validator          | `tools/scripts/validate-structure.mjs` covers: domain dirs, packages-root guard, duplicate names, exports/source entries + condition coverage (warn), Node-builtin bans for core/validation **deps + source imports**, root configs, CODEOWNERS coverage, `example.json` + `registry.json`, docs-mirror check.          |
| Health             | `tools/scripts/health-check.mjs`, `inventory.mjs`, `baseline.mjs`, `migrate-package.mjs` all exist. Root scripts wire `health-check`, `inventory`, `baseline`, `validate-structure`, `build:core/providers/adapters`. Turbo has domain tasks `build:core/providers/adapters`, `test:core/providers/adapters` (E5 done). |
| Governance         | `CODEOWNERS` covers `apps/*`, `examples/*` (per-category), `tools/*`, each domain (C4/D5 done). ADRs `004`–`009` exist. `AGENTS.md` codifies ADR-006 export conditions, ADR-004/008 runtime-neutral Node rule, ADR-007 stability/owners. Every package carries `stability` + `owners` (no missing-metadata warnings).   |
| CI                 | `.github/workflows/ci.yml` runs build-examples, prettier, eslint, types, bundle-size, tests, plus `structure` (validate-structure), `health` (health-check), `inventory` (inventory freshness) jobs. Root `.eslintrc.js` enforces the Node-import ban in `core`/`validation` via the eslint job.                        |

## 3. Target Structure

```
apps/
  docs/        # canonical docs: API references (generated), recipes, provider/model catalog pages
  www/         # marketing, ecosystem, templates, gateway/enterprise positioning
examples/
  <category>/<name>/   # runnable, machine-readable example.json, NOT platform code
  # (04-tools/playground is the canonical playground example — D2)
packages/
  core/ providers/ adapters/ mcp/ special/ validation/ infrastructure/
tools/
  scripts/ eslint-config/ tsconfig/ ...
```

App rules:

- `apps/*` are private, not published, excluded from changesets/release.
- `apps/docs` consumes generated API references produced from package exports; it does not reimplement SDK logic.

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

**Gate (done):** inventory + baseline report committed; inventory-freshness CI job landed 2026-09-06 (`inventory` job, `inventory:check` script).

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

### Phase C — Boundary & Governance Foundation (complete; see C2 exceptions)

- [x] **C1. Shared runtime-capability package.** `packages/core/runtime` finalized as browser-safe contract module; validator source-scan confirms zero Node-builtin imports in `core`/`validation`.
- [x] **C2. Export-condition conventions.** Codified in `AGENTS.md` (ADR-006 section); validator enforces `types`/`import`/`default` on `.` plus `exports`-map presence as **errors** (escalated 2026-09-06). Sweep done: `default` (→ CJS `require` target, matching `@ai-toolkit/runtime`) added to 43 packages; `import`+`default` added to `@ai-toolkit/svelte`; `./package.json` exports added to bin-only `@ai-toolkit/codemod`; stale `repository.directory` fixed for svelte. Standing exceptions (accepted 2026-09-06): `require` waived for ESM-only-by-design packages (`rsc`, `google-vertex`, `devtools`, `svelte` — no correct CJS target; adding CJS builds is a build change), `source` still warning-level (only private `@ai-toolkit/ai-docs` lacks one).
- [x] **C3. Lint rules against Node imports.** Done 2026-09-06: root `.eslintrc.js` `overrides` rejects `node:*` (patterns) + bare builtins (paths, computed from `module.builtinModules`) in `packages/core/**` + `packages/validation/**` shipped source; tests/scripts/fixtures/configs excluded mirroring validator `TEST_PATH`. Lives in root config — not `tools/eslint-config` — because override globs resolve relative to the declaring file; documented in `AGENTS.md`. Globals intentionally unrestricted (shipped source legitimately uses `globalThis.process` capability detection). Verified: probe file fails with ADR-004 message; zero new violations across core/validation (before/after eslint counts identical; remaining lint noise — dist/tsbuildinfo parsing, `unicorn/error-message` rule gap — is pre-existing).
- [x] **C4. Governance metadata.** `CODEOWNERS` covers `apps/*`, `examples/*`, `tools/*`, each domain; every `package.json` carries `stability` + `owners` (validator emits zero missing-metadata warnings).
- [x] **C5. Validator upgrade** (`tools/scripts/validate-structure.mjs`): DONE — manifest checks, workspace inclusion, duplicate names, forbidden `packages/*` → `apps/*`/`examples/*` directions, export-condition consistency (warn), `inventory.json`/`example.json`/`registry.json` consistency, docs-mirror check, CODEOWNERS coverage, runtime-neutral source scan.
- [x] **C6. Run gating (structure).** Done 2026-09-06: `ci.yml` has a `structure` job running `pnpm validate-structure` (exit 0, warnings only). The C3 rule rides the existing eslint CI job via per-package `lint` scripts.

**Gate (updated):** validator green repo-wide (exit 0); Phase C closed.

### Phase D — Workspace & App Separation (done)

- [x] **D1. Add `apps/*` to workspace** — done (`pnpm-workspace.yaml` has `- 'apps/*'`). Apps are `"private": true`; changesets skips private packages and `cleanup-examples-changesets.mjs` guards examples (E6).
- [x] **D2. Playground home — decided 2026-09-06: keep as example.** `examples/04-tools/playground` stays categorized content (valid `example.json`, indexed in `registry.json`); the `apps/playground` target is dropped. (`apps/studio` exists outside this plan and is unaffected.)
- [x] **D3. Make docs a real app.** Done — `apps/docs` is a Next.js app; docs-mirror resolved via coverage + normalized-freshness check (§8 item 1).
- [x] **D4. Examples metadata.** Done — categorized `01-foundations`…`04-tools`, per-example `example.json`, `examples/registry.json` index; validator enforces schema + index consistency (green).
- [x] **D5. Update CODEOWNERS** — done for `apps/*`, `examples/*` (per-category), `tools/*`; validator CODEOWNERS coverage check includes domains.

**Gate (updated):** Phase D closed (D2 decided keep-as-example); apps build in CI; no app→app or package→app edges (validator direction check green).

### Phase E — Package Migration Waves & Finalization (done)

- [x] **E1. Wave 1 — core/validation:** done (`packages/core/ai`, `core/provider-utils`, `validation/provider`, `validation/valibot` in place).
- [x] **E2. Wave 2 — providers:** done (32 provider dirs under `packages/providers/`).
- [x] **E3. Wave 3 — adapters/special/infrastructure:** complete 2026-09-06 (`react`, `rsc`, `angular`, `svelte`, `vue`, **`langchain`, `llamaindex`** → `adapters/`; `gateway`, `khulnasoft`, `codemod`, `devtools` → `special/`; `test-server` → `infrastructure/`; `ui/`, `mcp/` placed). Fixed `migrate-package.mjs` `DOMAIN_MAP` bug (`langchain`/`llamaindex` were mapped to `validation`; canonical home is `adapters` per `architecture/domain-mapping.md` + `AGENTS.md`). Zero legacy packages remain. Operational note: `git mv` carries `node_modules/` along with stale relative `.pnpm` symlinks — after each move, delete the moved package's `node_modules/` and re-run `pnpm install` (lockfile importer paths update accordingly), then rebuild + validator before proceeding.
- [x] **E4. Workspace finalization.** Done 2026-09-06: legacy `- 'packages/*'` glob removed from `pnpm-workspace.yaml`. Removal exposed that `packages/mcp` (a domain dir that is itself a package, matched only via `packages/mcp/*` + legacy glob) was orphaned — added exact-path `- 'packages/mcp'` glob. Reinstalled, validator confirms 56/56 packages matched, 0 legacy, 0 orphaned.
- [x] **E5. Turbo update.** Done — `turbo.json` has `build:core`, `build:providers`, `build:adapters` (+ `test:core/providers/adapters`) with `dependsOn`; root scripts expose them. `build:examples` stays separate.
- [x] **E6. Release pipeline.** Verified + fixed 2026-09-06: apps (`docs`, `www`, `studio`) and examples (`@example/*`) are `"private": true`, so changesets skips them; `.github/scripts/cleanup-examples-changesets.mjs` (run by `ci:version`/`clean-examples`) was **broken for the categorized layout** (iterated `examples/` top level → ENOENT crash) with a stale e2e path (`packages/rsc/...`) — fixed to walk `examples/<category>/<name>/` and target `packages/adapters/rsc/tests/e2e/next-server`; dry-run verified as clean no-op. Decided 2026-09-06: `@ai-toolkit/test-server` marked `"private": true` (and contradictory `publishConfig.access: public` removed) to match its `internal` stability label; workspace dependents unaffected.

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

| Risk                                              | Mitigation                                                                                            |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Public name changes break consumers               | ADR-004: names unchanged; migration is physical only; codemod + `update-references`                   |
| `apps/*` workspace addition destabilizes installs | Add in Phase D after groups verified; legacy glob retained until E4                                   |
| Validator/lint blockers block migration velocity  | Land C5/C6 fully green before moving code; validator is the speed-up, not a brake                     |
| Node-only imports creep into core                 | C3 lint + C5 builtin bans (extends current dep-level check to source level)                           |
| Example/playground duplication                    | Dropped target: single home in `examples/04-tools/playground`; examples stay categorized content (D2) |
| Baseline `types:check`/`test` OOM locally         | Cap turbo concurrency for local baseline; run full checks on CI hardware                              |

## 7. Success Criteria (Definition of Done)

- No `packages/*` imports from `apps/*` or `examples/*`; no app→app edges (CI-enforced).
- `apps/docs`, `apps/www` build in CI as workspace members and consume only `@ai-toolkit/*` (playground intentionally stays a categorized example, not an app — D2).
- Every example has valid `example.json`; catalog generated for docs.
- Runtime-support and model-capability matrices mark current vs planned, not unsupported.
- Validator covers manifests, workspace inclusion, duplicate names, export conditions, dependency direction, generated-metadata consistency.
- Legacy `packages/*` workspace glob removed; all packages in a domain group.

---

## 8. Review Findings 2026-09-06 (verified against repo)

Validator run: 56 packages discovered, 54 in domains, **2 legacy remaining** (`langchain`, `llamaindex`). Zero dependency-direction, Node-builtin, stability/owners, or example-metadata errors.

1. **Docs-mirror check resolved 2026-09-06 (was the sole error source, ~978 errors).** Root causes found: (a) `apps/docs/content/` is a Geistdocs rebuild (commit `ebc7561`), not a byte mirror — numeric `NN-` prefixes stripped per path segment, leading H1 dropped, fence syntax migrated (`filename=`/`file=` → `title=`, `highlight=".."`/`highlight={..}` → `{..}`, `env` → `dotenv`), plus site-only `**/meta.json` nav files and site-only `docs/elements/` section. Validator now enforces **coverage** (every canonical page maps; `index.mdx` drops are warnings) + **transform-normalized freshness** instead of byte identity (see `normalizeDocsContent` in `validate-structure.mjs`, which documents the transform). (b) 24 genuine editorial drifts (stale anchors, vendored `/images/`, Elements nav entries, a fence typo, prettier formatting) were backported from the newer site tree into canonical `content/` — direction verified per file via git log (apps tree uniformly newer). Validator docs checks are green (exit 0); a `structure` CI job now gates `pnpm validate-structure` on all PRs.
2. **Export conditions enforced 2026-09-06 (was ~50 warnings).** `default` added across 43 dual-build packages; `svelte` gained `import`+`default`; bin-only `codemod` gained a `./package.json` exports map. Validator escalated to error for missing exports map / `types` / `import` / `default` / `require`. Deliberate standing warnings: `require` waived for ESM-only-by-design `rsc`, `google-vertex`, `devtools`, `svelte` (pointing `require` at ESM output would be wrong metadata; adding CJS builds is a maintainer decision), `source` still warning-level for private `@ai-toolkit/ai-docs`. `publint --pack` spot-checks on dual-build packages show no errors (only pre-existing `type`-field/`.d.ts`-interop suggestions).
3. **`migrate-package.mjs` DOMAIN_MAP bug — fixed and migrated 2026-09-06.** `langchain`/`llamaindex` moved to `packages/adapters/`; zero legacy packages remain; legacy workspace glob removed (E3/E4 done).
4. **C3 done; governance CI jobs done.** Root `.eslintrc.js` rejects Node-builtin imports in `core`/`validation` shipped source (globals intentionally unrestricted); `ci.yml` has `structure`, `health`, and `inventory` jobs 2026-09-06 (`inventory:check` compares against committed `build/inventory.json` ignoring the `generatedAt` timestamp; `health-check` domain list fixed to include `ui`).
5. **D2 decided 2026-09-06: keep playground as example.** `examples/04-tools/playground` stays (valid `example.json`, indexed); `apps/playground` target dropped. `apps/studio` remains out of scope.
6. **Stale plan claims corrected in this update.** `apps/*` workspace membership, categorized examples + `registry.json`/`example.json`, real `apps/docs` Next.js app, CODEOWNERS coverage, `stability`/`owners` metadata, Turbo domain tasks, and provider/adapter/special/infrastructure waves were already done; §2–§4 now reflect that.
