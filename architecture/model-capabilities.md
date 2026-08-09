# Model Capability Matrix

Capabilities come from `@ai-toolkit/capabilities` (`ModelCapability`). This matrix tracks which provider packages support which capability categories. **current** = a provider package ships the capability; **planned** = targeted but not yet shipped; blank = not claimed.

| Capability  | OpenAI  | Anthropic | Google  | Azure   | Amazon Bedrock | Gateway | Others (long tail) |
| ----------- | ------- | --------- | ------- | ------- | -------------- | ------- | ------------------ |
| chat        | current | current   | current | current | current        | current | current            |
| vision      | current | current   | current | current | current        | current | planned            |
| embedding   | current | planned   | current | current | current        | current | planned            |
| speech      | current | planned   | planned | planned | planned        | planned | planned            |
| audio       | planned | planned   | planned | planned | planned        | planned | planned            |
| reasoning   | current | current   | current | planned | current        | current | planned            |
| image       | current | planned   | current | current | current        | current | planned            |
| video       | planned | planned   | planned | planned | planned        | planned | planned            |
| reranker    | planned | planned   | planned | planned | planned        | planned | planned            |
| moderation  | current | planned   | planned | planned | planned        | planned | planned            |
| ocr         | planned | planned   | planned | planned | planned        | planned | planned            |
| translation | planned | planned   | planned | planned | planned        | planned | planned            |

## Notes

- "current" is a **planning assertion** to be reconciled against each provider's `src/index.ts` and its descriptor entries before the provider migration wave (Phase E2); the table is the checklist, not the claim.
- Per-model detail (context window, pricing, streaming, tool calling, structured output) belongs in `@ai-toolkit/capabilities` descriptors and the generated catalog, not in this coarse matrix.
- Final matrix will be generated from `build/inventory.json` + provider descriptors so it cannot drift.

## Source of truth

- `packages/validation/capabilities/src/index.ts` — `ModelCapability`, `ModelCapabilityDescriptor`
- Per-provider `src/index.ts` export surfaces (Phase B reconciliation task)
