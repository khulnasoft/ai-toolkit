# Runtime Support Matrix

States **current** vs **planned** support for each runtime target defined by `@ai-toolkit/runtime` (`RuntimeTarget`). Current status derives from `createRuntimeContext` capability detection and package test configs. Cells mark **current** support only when verified; everything else is **planned** — never "unsupported" as a commitment.

| Runtime    | Core contracts (`core/runtime`) | Capability catalog (`validation/capabilities`) | Providers                | Adapters (react/rsc/vue/svelte/angular) | Apps                      |
| ---------- | ------------------------------- | ---------------------------------------------- | ------------------------ | --------------------------------------- | ------------------------- |
| browser    | current                         | current                                        | planned                  | current (react/vue/svelte/angular)      | current (www, playground) |
| node       | current                         | current                                        | current                  | current (rsc)                           | current (docs build)      |
| edge       | planned                         | planned                                        | planned                  | planned                                 | planned                   |
| serverless | planned                         | planned                                        | current (deploy targets) | planned                                 | current (www, playground) |
| workers    | planned                         | planned                                        | planned                  | planned                                 | planned                   |
| mobile     | planned                         | planned                                        | planned                  | planned                                 | planned                   |
| electron   | planned                         | planned                                        | planned                  | planned                                 | planned                   |
| tauri      | planned                         | planned                                        | planned                  | planned                                 | planned                   |

## Notes

- "current" is asserted only where a package ships a runtime-safe build or an explicit runtime-targeted test. All other cells are **planned**.
- Runtime capability detection (`fetch`, `streams`, `abortSignal`, `crypto`, `timers`, `encoding`, `binaryData`) is runtime-agnostic by design; capability checks fail explicitly rather than downgrading (ADR-004).
- Edge/worker support for providers is gated on the export-condition work in ADR-006 (Phase C/E).

## Source of truth

- `packages/core/runtime/src/index.ts` — `RuntimeTarget`, `RuntimeCapabilities`
- `packages/validation/capabilities/src/index.ts` — descriptor `runtimes` field
- `build/inventory.json` — runtime assumptions per package
