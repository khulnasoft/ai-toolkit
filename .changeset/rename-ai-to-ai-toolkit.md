---
'@ai-toolkit/ai': major
'@ai-toolkit/react': patch
'@ai-toolkit/vue': patch
'@ai-toolkit/svelte': patch
'@ai-toolkit/angular': patch
'@ai-toolkit/rsc': patch
'@ai-toolkit/elements': patch
'@ai-toolkit/codemod': patch
'@ai-toolkit/devtools': patch
'@ai-toolkit/langchain': patch
'@ai-toolkit/llamaindex': patch
---

Rename the core SDK package `ai` → `@ai-toolkit/ai` (scoped, consistent with
`@ai-toolkit/provider`, `@ai-toolkit/provider-utils`, `@ai-toolkit/gateway`).

Migration for consumers:

```diff
- import { generateText } from '@ai-toolkit/ai';
+ import { generateText } from '@ai-toolkit/ai';
```

- `ai/test` → `@ai-toolkit/ai/test`, `ai/internal` → `@ai-toolkit/ai/internal`.
- Run the new codemod: `npx @ai-toolkit/codemod v6/rename-ai-to-ai-toolkit <path>`
  (also included in `upgrade` / `v6` bundles).
- Historical `v4`–`v6` codemods now match both `'@ai-toolkit/ai'` and `'@ai-toolkit/ai'`
  import specifiers.
- Alternatively use an npm alias during transition:
  `"@ai-toolkit/ai": "npm:@ai-toolkit/ai@<version>"`.
- Added missing `default` export condition (ADR-006) on `.`, `./internal`,
  `./test` entries.
