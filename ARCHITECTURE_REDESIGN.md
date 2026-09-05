# AI Toolkit: Enterprise Monorepo Architecture

**Status:** Living document — partially implemented, updated September 2026
**Audience:** Principal Engineers, Tech Leads, Contributors
**Scope:** Domain-organized monorepo for 500+ contributors, 100+ packages

> Source of truth lives in code, not in this doc. When they disagree, code wins:
> `pnpm-workspace.yaml`, `turbo.json`, `CODEOWNERS`, `ADR/`, `tools/scripts/validate-structure.mjs`,
> `examples/registry.json`, `architecture/`.
>
> The original v1.0 proposal (June 2026) used `@ai-sdk/*` / `@vercel/*` names and an
> aspirational layout. This refactor corrects names to `@ai-toolkit/*` / `@khulnasoft/*`
> and aligns the document with what is actually implemented.

---

## 1. Executive Summary

The monorepo has moved from a flat `packages/` layout to a **domain-driven, layered
architecture**:

- **Scalability**: domains (`core`, `providers`, `adapters`, `validation`, `special`,
  `mcp`, `infrastructure`) can be built, tested, and owned independently.
- **Clarity**: each domain has a `README.md`, a `tsconfig.json`, and `CODEOWNERS` entries.
- **DX**: `pnpm generate`, `pnpm health-check`, `pnpm inventory`, `pnpm validate-structure`,
  `pnpm find-package` automate onboarding and governance.
- **Governance**: ADRs 004–009 plus `validate-structure` enforce dependency direction,
  export conditions, `stability`/`owners` metadata, and example metadata.

**What changed vs the v1.0 proposal:** names, package locations, example categories,
tooling, and Turbo syntax are corrected below. Aspirational items that were never
implemented are explicitly marked **Outstanding** instead of being presented as fact.

---

## 2. Implemented Repository Structure

Condensed — see `pnpm-workspace.yaml` and `architecture/PROJECT-STRUCTURE.md` for the
full tree.

```
ai-toolkit/
├── README.md / CONTRIBUTING.md / CODEOWNERS / ARCHITECTURE_*.md
├── ADR/                                # 004–009 + template (see §10)
├── architecture/                       # domain-mapping, runtime-support, etc.
├── .github/workflows/                  # ci.yml, release.yml + ~12 more (see §8)
├── turbo.json                          # `tasks` (not `pipeline`); build:core/providers/adapters
├── pnpm-workspace.yaml                 # domain globs + legacy `packages/*` during migration
├── package.json                        # root scripts (generate, validate-structure, health-check…)
│
├── packages/core/                      # ai, provider-utils, runtime
├── packages/providers/                 # 30 providers (see §3)
├── packages/adapters/                  # react, rsc, angular, svelte, vue
├── packages/validation/                # provider (@ai-toolkit/provider), capabilities, valibot
├── packages/special/                   # gateway, khulnasoft
├── packages/mcp/                       # single @ai-toolkit/mcp package (split is Outstanding)
├── packages/infrastructure/            # test-server only
│
├── packages/codemod/                   # legacy flat — Outstanding: move to special/developer-tools
├── packages/devtools/                  # legacy flat — Outstanding
├── packages/langchain/                 # legacy flat — Outstanding (decision needed)
├── packages/llamaindex/                # legacy flat — Outstanding (decision needed)
│
├── examples/                           # 01-foundations, 02-framework-integration,
│   │                                   # 03-integrations, 04-tools + registry.json (see §7)
├── apps/docs/ apps/www/                # docs site + marketing site (consumers, per ADR-005)
├── content/                            # shared MDX sources consumed by apps/docs
├── tools/                              # analyze-downloads, create-ai-sdk, eslint-config,
│                                       # generate-llms-txt, scripts, tsconfig
└── tools/scripts/                      # generate, validate-structure, health-check,
                                        # inventory, baseline, find-package, migrate-package
```

### What the v1.0 proposal got wrong (corrected here)

| Proposal claimed                                                                           | Reality                                                                                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/core/{ai,shared,telemetry}`                                                      | `packages/core/{ai,provider-utils,runtime}`. There is no `shared` or `telemetry` package. Shared provider utilities = `@ai-toolkit/provider-utils`; spec interfaces = `@ai-toolkit/provider` (under `validation/`).                                               |
| `packages/special/{gateway,khulnasoft,aws,azure,developer-tools}`                          | `packages/special/{gateway,khulnasoft}` only. `azure` and `amazon-bedrock` are real providers under `packages/providers/`. `codemod`/`devtools` are still flat under `packages/`. `eslint-config` lives in `tools/eslint-config`, not `packages/infrastructure/`. |
| `packages/mcp/{core,server,tools}`                                                         | Single `packages/mcp` (`@ai-toolkit/mcp`). The three-way split was never implemented.                                                                                                                                                                             |
| `packages/validation/{valibot,provider}`                                                   | `packages/validation/{provider,capabilities,valibot}` plus `README.md`.                                                                                                                                                                                           |
| `packages/infrastructure/{test-server,eslint-config}`                                      | `test-server` only.                                                                                                                                                                                                                                               |
| Examples `01–06` incl. `04-advanced-patterns`, `05-production-apps`, `06-mcp-integrations` | Actually `01-foundations`, `02-framework-integration`, `03-integrations`, `04-tools` + `registry.json`.                                                                                                                                                           |
| `tools/{cli,generator,scripts,templates}` + `generate-examples.mjs`, `sync-versions.mjs` … | Actually `tools/{analyze-downloads,create-ai-sdk,eslint-config,generate-llms-txt,scripts,tsconfig}`; scripts are `generate.mjs`, `validate-structure.mjs`, `health-check.mjs`, `inventory.mjs`, `baseline.mjs`, `find-package.mjs`, `migrate-package.mjs`.        |
| `infra/`, `tests/`, root `scripts/`                                                        | Do not exist. Infra concerns live in `.github/` and `tools/`.                                                                                                                                                                                                     |
| Turbo `pipeline` with `@ai-sdk/*` filters                                                  | `turbo.json` uses `tasks` with `build:core`, `build:providers`, `build:adapters`, `test:core`, …                                                                                                                                                                  |

---

## 3. Domains & Ownership

Ownership is enforced by `CODEOWNERS` — this table is a summary, not a copy.

| Domain         | Path                                               | npm scope                                                                                                                                                                  | Stability                      |
| -------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| Core           | `packages/core/`                                   | `ai`, `@ai-toolkit/provider-utils`, `@ai-toolkit/runtime`                                                                                                                  | stable                         |
| Providers      | `packages/providers/`                              | `@ai-toolkit/{openai,anthropic,google,google-vertex,azure,amazon-bedrock,cohere,mistral,groq,deepinfra,xai,togetherai,fireworks,replicate,openai-compatible,…}` (30 total) | stable per package             |
| Adapters       | `packages/adapters/`                               | `@ai-toolkit/{react,rsc,angular,svelte,vue}`                                                                                                                               | stable                         |
| Validation     | `packages/validation/`                             | `@ai-toolkit/provider`, `@ai-toolkit/capabilities`, `@ai-toolkit/valibot`                                                                                                  | stable / beta (`capabilities`) |
| Special        | `packages/special/`                                | `@ai-toolkit/{gateway,khulnasoft}`                                                                                                                                         | stable                         |
| MCP            | `packages/mcp/`                                    | `@ai-toolkit/mcp`                                                                                                                                                          | beta                           |
| Infrastructure | `packages/infrastructure/`                         | `@ai-toolkit/test-server` (internal)                                                                                                                                       | internal                       |
| Legacy flat    | `packages/{codemod,devtools,langchain,llamaindex}` | various                                                                                                                                                                    | see mapping §11                |

**Ownership rules:**

- Core changes require `@khulnasoft/ai-toolkit-core` approval; breaking changes go through the RFC process.
- Each Vercel-maintained provider has its own team entry; community providers fall back to `@khulnasoft/ai-toolkit-providers` (see `CODEOWNERS`).
- Adapters require owner + `@khulnasoft/ai-toolkit-adapters`.
- `CODEOWNERS` still carries a **Legacy flat structure** section during migration — do not add new flat packages.

---

## 4. Layer Dependency Rules (ADR-008, ADR-004)

```
ai ────────────┬──▶ @ai-toolkit/provider-utils ──▶ @ai-toolkit/provider
               │
@ai-toolkit/<provider> ─┴──▶ @ai-toolkit/provider-utils ──▶ @ai-toolkit/provider

@ai-toolkit/runtime ← capability contracts (browser-safe, no Node builtins)
@ai-toolkit/capabilities ← model capability declarations
apps/*, examples/* → packages/* (never the reverse; ADR-005)
```

Enforced by `pnpm validate-structure` (dependency direction + Node-builtin scan):

- `core` and `validation` packages **must not** import Node builtins (`node:*` or bare
  `fs`, `os`, …) and must not depend on Node-builtin packages. Use `@ai-toolkit/runtime`
  (`createRuntimeContext`) for capability detection.
- Never use `JSON.parse` directly in production code — use `parseJSON` / `safeParseJSON`
  from `@ai-toolkit/provider-utils`.
- Provider option schemas: `.optional()` unless `null` is meaningful; be restrictive.
  Response schemas: `.nullish()`, minimal, tolerant of provider API drift.
- Zod: `zod/v3` only for compat code; new code uses `zod/v4` (`z4.core.$ZodType`).

---

## 5. Package Standards (ADR-006, ADR-007)

Every public package `package.json` must declare (see `packages/core/runtime/package.json`
as the reference example):

- `exports` map with `types`, `import`, `require` (and `default`) on the `.` entry;
  `browser`/`worker`/`edge` conditions alias the runtime-neutral build or are omitted
  for Node-only packages. Runtime-neutral packages (`core`, `validation`) must not
  reference Node-only entry points.
- Governance metadata: `stability` (`stable` | `beta` | `alpha` | `internal`) and
  `owners` (team handles). Missing metadata is a `validate-structure` warning during
  migration and an error at the end of migration.
- Errors extend `AITOOLKITError` with the `Symbol.for(marker)` pattern and static
  `isInstance` (see `AGENTS.md` → Error Pattern).

---

## 6. Public vs Internal API

```typescript
// ✅ Public: core entry point (npm `ai`)
export { generateText, streamText, generateObject } from 'ai';

// ✅ Public: providers
export { createOpenAI } from '@ai-toolkit/openai';

// ✅ Public: framework adapters
export { useChat, useCompletion } from '@ai-toolkit/react';

// ⚠️ Internal: subject to change without notice
import type { … } from '@ai-toolkit/provider-utils/internal';
```

Guarantees for public APIs: semver, 6-month deprecation notices, backwards compatibility.
Internal APIs: JSDoc-documented, no stability guarantees. Example code: copy & adapt,
never depend on.

---

## 7. Examples (ADR-009)

Four categories, indexed by `examples/registry.json` (do not invent new top-level
categories without updating the registry schema and `validate-structure`):

| Category                   | Contents                                                                                                                                                     |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `01-foundations`           | `ai-functions`, `express`, `fastify`, `hono`, `node-http-server`                                                                                             |
| `02-framework-integration` | `angular`, `nest`, `next`, `next-agent`, `next-fastapi`, `next-langchain`, `next-openai`, `next-openai-pages`, `nuxt-openai`                                 |
| `03-integrations`          | `mcp`, `next-google-vertex`, `next-openai-kasada-bot-protection`, `next-openai-telemetry`, `next-openai-telemetry-sentry`, `next-openai-upstash-rate-limits` |
| `04-tools`                 | `playground`                                                                                                                                                 |

Each example carries machine-readable metadata per ADR-009 (validated by
`validate-structure`); the registry is the discovery index. The v1.0 proposal's
`04-advanced-patterns` / `05-production-apps` / `06-mcp-integrations` and per-example
`example.json` sketches do not match the implemented schema — consult
`ADR/009-example-metadata-schema.md` and `examples/registry.json` instead.

```bash
pnpm inventory      # list packages/examples from source of truth
pnpm find-package   # locate a package by name
```

---

## 8. Testing & CI/CD

- **Framework**: Vitest. Test files `*.test.ts` next to source; type tests
  `*.test-d.ts`; fixtures in `__fixtures__`, snapshots in `__snapshots__`.
- **Commands**: `pnpm test` (all packages/examples/tools via Turbo), plus domain
  shortcuts `test:core`, `test:providers`, `test:adapters`; per-package
  `test:node` / `test:edge` / `test:watch`.
- **Turbo** (`turbo.json`, `tasks` syntax): `build` (`dependsOn: ["^build"]`),
  `type-check` / `test` / `publint` (depend on `^build` + `build`), domain tasks
  `build:core`, `build:providers` (depends on `^build:core`), `build:adapters`.
- **Workflows** (`.github/workflows/`): `ci.yml`, `release.yml`, plus
  `ai-provider-api-changes.yml`, `verify-changesets.yml`,
  `update-model-settings.yml`, and triage/backport/automerge helpers. The v1.0
  sketch (`docs.yml`, `governance.yml`, `biome+prettier+TS` pseudo-YAML) was
  illustrative — read the actual workflow files.
- **Quality gates**: `pnpm lint`, `pnpm prettier-check`, `pnpm types:check`,
  `pnpm validate-structure`, `pnpm health-check`.

---

## 9. Tooling & Contributor Workflow

```bash
git clone https://github.com/khulnasoft/ai-toolkit && cd ai-toolkit
pnpm install && pnpm build
pnpm health-check        # verify setup
pnpm generate --help     # scaffold provider / adapter / example (tools/scripts/generate.mjs)
pnpm validate-structure  # governance checks (replaces the proposal's validate-structure.sh etc.)
```

- Adding a package: create under the correct domain (`packages/<domain>/<name>`),
  add to root `tsconfig.json` references, run `pnpm update-references`.
- Shell-script helpers from the proposal (`scripts/setup.sh`, `audit-dependencies.sh`, …)
  were superseded by Node scripts in `tools/scripts/` — use those.
- PRs: `CODEOWNERS` selects reviewers; CI runs lint, type-check, test,
  `validate-structure`; production-code PRs need a changeset (`pnpm changeset`,
  default `patch`; minor/major need maintainer approval; never select example packages).

---

## 10. ADRs

Location: `ADR/`. The v1.0 proposal listed ADR-001…010; the implemented set is:

| ADR                                        | Topic                                        |
| ------------------------------------------ | -------------------------------------------- |
| `004-runtime-and-capability-contracts`     | `@ai-toolkit/runtime`, capability detection  |
| `005-workspace-topology-apps-as-consumers` | `apps/*` consume `packages/*`, never reverse |
| `006-export-condition-conventions`         | `exports` map requirements                   |
| `007-stability-labels-and-ownership`       | `stability` + `owners` metadata              |
| `008-dependency-direction-and-validator`   | Layer rules + `validate-structure`           |
| `009-example-metadata-schema`              | Example categories + `registry.json`         |

Follow `ADR/template.md` for new decisions.

---

## 11. Migration Status

**Done:** domain directories + `pnpm-workspace.yaml` globs, `CODEOWNERS` (incl. legacy
section), `turbo.json` domain tasks, `tools/scripts/*` generation + validation,
`examples/registry.json`, ADRs 004–009, `packages/core/runtime`,
`packages/validation/capabilities`, root scripts (`health-check`, `inventory`,
`baseline`, `find-package`), `validate-structure` zero-error baseline
(`ServerResponse` imports in `core/ai` converted to `import type`; validator
ignores `import type` and excludes tests, dev `scripts/`, and tooling configs),
stale `CODEOWNERS` rule cleanup (`providers/_shared/`, `apps/playground/`).

**Outstanding:**

1. Move `packages/{codemod,devtools}` → `packages/special/developer-tools/` (proposal §"special").
2. Decide fate of `packages/{langchain,llamaindex}` (keep flat, move, or extract).
3. Decide whether the `packages/mcp` → `{core,server,tools}` split is still wanted; today it is a single package.
4. `shared` / `telemetry` packages from the proposal were never created — close or re-propose (likely covered by `provider-utils` / `runtime` / observability docs).
5. ~~Retire the `packages/*` legacy workspace glob once 1–2 are done; flip missing
   `stability`/`owners` metadata from warning to error.~~ Partially done —
   `stability`/`owners`/`source` metadata backfilled for all 49 packages
   (provider/adapters owners mapped from `CODEOWNERS`; `langchain`/`llamaindex`
   carry interim `@khulnasoft/ai-toolkit-maintainers` ownership pending a
   maintainer decision in item 2). Remaining validator warnings are
   `exports`-map conditions (`default`/`import`/`require`), deferred as they
   affect published module resolution.
6. ~~Reconcile `AGENTS.md` "Key Directories" table (still describes the old flat layout:
   `packages/ai`, `packages/provider`, …) with this document.~~ Done — table now lists
   domain paths; "Adding New Packages" points at `packages/<domain>/<name>`.

### Appendix A — Current → domain mapping (corrected)

| Current                                                  | Domain location                       | npm name                             |
| -------------------------------------------------------- | ------------------------------------- | ------------------------------------ |
| `packages/ai` (legacy re-export)                         | `packages/core/ai`                    | `ai`                                 |
| `packages/provider-utils` (legacy path)                  | `packages/core/provider-utils`        | `@ai-toolkit/provider-utils`         |
| — (new)                                                  | `packages/core/runtime`               | `@ai-toolkit/runtime`                |
| `packages/provider` (legacy path)                        | `packages/validation/provider`        | `@ai-toolkit/provider`               |
| `packages/valibot` (legacy path)                         | `packages/validation/valibot`         | `@ai-toolkit/valibot`                |
| — (new)                                                  | `packages/validation/capabilities`    | `@ai-toolkit/capabilities`           |
| `packages/{openai,anthropic,…}` (30)                     | `packages/providers/{…}`              | `@ai-toolkit/{…}`                    |
| `packages/{react,rsc,angular,svelte,vue}` (legacy paths) | `packages/adapters/{…}`               | `@ai-toolkit/{…}`                    |
| `packages/gateway` (legacy path)                         | `packages/special/gateway`            | `@ai-toolkit/gateway`                |
| `packages/khulnasoft` (legacy path)                      | `packages/special/khulnasoft`         | `@ai-toolkit/khulnasoft`             |
| `packages/mcp` (legacy path)                             | `packages/mcp`                        | `@ai-toolkit/mcp`                    |
| `packages/test-server` (legacy path)                     | `packages/infrastructure/test-server` | `@ai-toolkit/test-server` (internal) |
| `packages/{codemod,devtools,langchain,llamaindex}`       | Outstanding (§11)                     | various                              |

> Full historical mapping (including per-provider rows) lives in
> `architecture/domain-mapping.md` — consult it before moving packages.

---

**Document version:** 2.0 (refactor of v1.0 proposal)
**Last updated:** September 2026
**Status:** Partially implemented — §11 tracks the remainder.
