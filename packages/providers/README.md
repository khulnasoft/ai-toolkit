# Provider Layer

LLM provider integrations. Each provider is independent, follows the same pattern, and can be maintained by its own team.

**Owner**: @khulnasoft/ai-toolkit-providers

Each provider implements the `@ai-toolkit/provider` interface and exports a factory function (e.g., `createOpenAI()`).
