---
'ai-toolkit': patch
---

Convert `ServerResponse` imports to `import type` in streaming response helpers. Type-only usage verified; no runtime change. Satisfies the runtime-neutral Node import rule (ADR-004) enforced by `validate-structure`.
