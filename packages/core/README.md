# Core Layer

Foundation packages for the AI TOOLKIT. These provide the core SDK functionality, shared provider utilities, and browser-safe runtime contracts.

**Owner**: @khulnasoft/ai-toolkit-core

| Package          | npm name                     | Purpose                            | Exports                                        |
| ---------------- | ---------------------------- | ---------------------------------- | ---------------------------------------------- |
| `ai`             | `ai`                         | Main SDK entry point               | generateText, streamText, generateObject, tool |
| `provider-utils` | `@ai-toolkit/provider-utils` | Shared types, utilities, parseJSON | Types, error helpers, utilities                |
| `runtime`        | `@ai-toolkit/runtime`        | Browser-safe runtime contracts     | createRuntimeContext, capability detection     |
