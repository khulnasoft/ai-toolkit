# Gateway Provider

The Gateway provider for the AI Toolkit allows the use of a wide variety of AI models and providers through a unified gateway service. It provides automatic provider selection, load balancing, and fallback capabilities.

## Features

- **Multi-provider support**: Access models from OpenAI, Anthropic, Google, and more through a single API
- **Automatic provider selection**: The gateway automatically selects the best provider for your model
- **Load balancing**: Distribute requests across multiple providers for better performance
- **Fallback support**: Automatic fallback to alternative providers when needed
- **Unified API**: Single interface for all supported models and providers

## Installation

```bash
npm install @ai-toolkit/gateway
```

## Usage

### Basic Usage

```typescript
import { createGateway } from '@ai-toolkit/gateway';

const gateway = createGateway({
  apiKey: process.env.GATEWAY_API_KEY,
  baseURL: 'https://gateway.ai', // optional
});

// Use any model through the gateway
const model = gateway('gpt-4');
```

### Language Models

```typescript
import { generateText } from 'ai';
import { createGateway } from '@ai-toolkit/gateway';

const gateway = createGateway({
  apiKey: process.env.GATEWAY_API_KEY,
});

const result = await generateText({
  model: gateway('gpt-4'),
  prompt: 'Write a story about a robot learning to love.',
});

console.log(result.text);
```

### Embeddings

```typescript
import { embed } from 'ai';
import { createGateway } from '@ai-toolkit/gateway';

const gateway = createGateway({
  apiKey: process.env.GATEWAY_API_KEY,
});

const { embeddings } = await embed({
  model: gateway.embedding('text-embedding-ada-002'),
  values: ['Hello world', 'Goodbye world'],
});

console.log(embeddings);
```

### Provider Selection

You can specify which provider to use:

```typescript
const model = gateway('claude-3-sonnet', {
  provider: 'anthropic',
});
```

### Advanced Configuration

```typescript
const gateway = createGateway({
  apiKey: process.env.GATEWAY_API_KEY,
  baseURL: 'https://my-gateway.com',
  headers: {
    'X-Custom-Header': 'custom-value',
  },
});

const model = gateway('gpt-4', {
  temperature: 0.7,
  maxTokens: 1000,
  providerSettings: {
    // Provider-specific settings
    openai: {
      organization: 'org-123',
    },
  },
});
```

## Configuration

### Environment Variables

- `GATEWAY_API_KEY` - Your gateway API key (required)
- `GATEWAY_BASE_URL` - Custom gateway URL (optional, defaults to https://gateway.ai)

### Provider Options

```typescript
interface GatewaySettings {
  apiKey?: string;
  baseURL?: string;
  headers?: Record<string, string>;
  fetch?: (input: string | Request, init?: RequestInit) => Promise<Response>;
  provider?: string;
  temperature?: number;
  topP?: number;
  topK?: number;
  maxTokens?: number;
  presencePenalty?: number;
  frequencyPenalty?: number;
  stopSequences?: string[];
  stream?: boolean;
  providerSettings?: Record<string, unknown>;
}
```

## Error Handling

The gateway provider includes comprehensive error handling:

```typescript
import { GatewayError, asGatewayError } from '@ai-toolkit/gateway';

try {
  const result = await generateText({
    model: gateway('gpt-4'),
    prompt: 'Hello',
  });
} catch (error) {
  if (error instanceof GatewayError) {
    console.error('Gateway error:', error.message);
    console.error('Cause:', error.cause);
  } else {
    console.error('Unexpected error:', asGatewayError(error));
  }
}
```

## Supported Models

The gateway supports a wide variety of models including:

- **OpenAI**: GPT-3.5, GPT-4, GPT-4 Turbo, text-embedding-ada-002
- **Anthropic**: Claude Instant, Claude 2, Claude 3 family
- **Google**: Gemini models, embedding models
- **Cohere**: Command, Embed models
- **Mistral**: Mistral 7B, Mixtral
- And many more...

Check the gateway documentation for the full list of supported models.

## License

Apache License 2.0
