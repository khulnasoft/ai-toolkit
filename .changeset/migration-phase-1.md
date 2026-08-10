---
"ai": patch
"@ai-toolkit/provider-utils": patch
"@ai-toolkit/provider": patch
"@ai-toolkit/gateway": patch
"@ai-toolkit/test-server": patch
"@ai-toolkit/khulnasoft": patch
"@ai-toolkit/valibot": patch
---

Complete the first phase of enterprise architecture restructuring (MIGRATION_PLAN.md):

- Move `packages/ai/` → `packages/core/ai/`
- Move `packages/provider-utils/` → `packages/core/provider-utils/`
- Move `packages/gateway/` → `packages/special/gateway/`
- Move `packages/provider/` → `packages/validation/provider/`
- Move `packages/test-server/` → `packages/infrastructure/test-server/`
- Move `packages/khulnasoft/` → `packages/special/khulnasoft/`
- Move `packages/valibot/` → `packages/validation/valibot/`
- Move all provider packages to `packages/providers/`
- Move all adapter packages (angular, react, rsc, svelte, vue) to `packages/adapters/`
- Update all tsconfig.json project references across the monorepo
- Update root tsconfig.json, pnpm-workspace.yaml, and turbo.json
- Update example tsconfig.json references

No public API changes — package names and exports remain the same.
