# AI Gateway Project Structure

This document outlines the current project structure and the proposed improvements for better organization and developer experience.

## Current Structure

```
packages/
├── ai                    # Core SDK
├── provider              # Provider interfaces
├── provider-utils        # Provider utilities
├── gateway             # Unified gateway
├── react               # React hooks
├── rsc                # React Server Components
├── vue                 # Vue integration
├── svelte              # Svelte integration
├── angular             # Angular integration
├── codemod            # Migration tools
├── valibot            # Schema integration
├── test-server         # Testing utilities
│
├── PROVIDERS (32 packages)
│   ├── openai
│   ├── anthropic
│   ├── google
│   ├── google-vertex
│   ├── azure
│   ├── amazon-bedrock
│   ├── deepseek
│   ├── mistral
│   ├── cohere
│   ├── perplexity
│   ├── fireworks
│   ├── huggingface
│   └── ... (more)
│
├── FRAMEWORKS (6)
│   ├── react
│   ├── vue
│   ├── svelte
│   ├── angular
│   ├── rsc
│   └── langchain
│
├── MEDIA (8)
│   ├── assemblyai    # Speech
│   ├── deepgram     # Transcription
│   ├── elevenlabs  # Speech
│   ├── lmnt       # Speech
│   ├── prodia     # Image
│   ├── replicate  # Image
│   ├── luma       # Image
│   └── fal        # Image/Audio
│
├── TOOLS (7)
│   ├── mcp         # Model Context Protocol
│   ├── devtools    # Developer tools
│   ├── codemod    # Migration
│   ├── langchain   # LangChain adapter
│   ├── llamaindex # LlamaIndex adapter
│   └── gateway    # Unified API
│
tools/                  # Internal tooling
examples/              # Example applications
content/              # Documentation
contributing/         # Contributor guides
```

## Proposed Structure

```
packages/
├── CORE
│   ├── ai                    # Core SDK (@ai-toolkit/core)
│   ├── provider              # Interfaces (@ai-toolkit/provider)
│   └── provider-utils      # Utilities (@ai-toolkit/provider-utils)
│
├── PROVIDERS (official)
│   ├── openai
│   ├── anthropic
│   ├── google
│   ├── google-vertex
│   ├── azure-openai
│   └── aws-bedrock
│
├── COMMUNITY-PROVIDERS
│   ├── deepseek
│   ├── mistral
│   ├── cohere
│   ├── perplexity
│   ├── fireworks
│   ├── huggingface
│   └── groq
│
├── UI-FRAMEWORKS
│   ├── react              # @ai-toolkit/react
│   ├── vue               # @ai-toolkit/vue
│   ├── svelte           # @ai-toolkit/svelte
│   ├── angular          # @ai-toolkit/angular
│   ├── rsc             # @ai-toolkit/rsc
│   └── solid           # @ai-toolkit/solid
│
├── AI-CAPABILITIES
│   ├── speech           # Text-to-speech
│   ├── transcription  # Speech-to-text
│   ├── image          # Image generation
│   └── embedding      # Embeddings
│
├── INTEGRATIONS
│   ├── langchain       # LangChain adapter
│   ├── llamaindex    # LlamaIndex adapter
│   └── mcp          # Model Context Protocol
│
├── DEV-TOOLS
│   ├── cli             # create-ai CLI
│   ├── codemod        # Migration tools
│   └── devtools      # Developer tools
│
├── SCHEMAS
│   └── valibot         # Schema support
│
└── GATEWAY
    └── gateway        # Unified API (@ai-toolkit/gateway)
```

## CLI Tool: create-ai

The `create-ai` CLI helps developers quickly scaffold AI applications.

### Installation

```bash
npx create-ai@latest my-ai-app
```

### Usage

```bash
# Interactive mode
create-ai my-app

# With template
create-ai my-app --template next-react

# With provider
create-ai my-app --provider openai

# Skip installation
create-ai my-app --no-install
```

### Available Templates

| Template     | Description     |
| ------------ | --------------- |
| `next-react` | Next.js + React |
| `next-rsc`   | Next.js + RSC   |
| `vite-react` | Vite + React    |
| `vue`        | Vue 3           |
| `svelte`     | SvelteKit       |
| `node`       | Node.js API     |

### Available Providers

| Provider    | Package                      |
| ----------- | ---------------------------- |
| OpenAI      | `@ai-toolkit/openai`         |
| Anthropic   | `@ai-toolkit/anthropic`      |
| Google      | `@ai-toolkit/google`         |
| Azure       | `@ai-toolkit/azure`          |
| AWS Bedrock | `@ai-toolkit/amazon-bedrock` |

## Benefits

1. **Better Organization**: Clear separation of concerns
2. **Scalability**: Easy to add new providers
3. **Developer Experience**: Quick scaffolding with CLI
4. **Type Safety**: Consistent across all packages
5. **Documentation**: Self-documenting structure
