import { createGateway } from '@ai-toolkit/gateway';

// Initialize the gateway provider
const gateway = createGateway({
  apiKey: process.env.GATEWAY_API_KEY,
  baseURL: process.env.GATEWAY_BASE_URL,
});

// Example: Using a language model
export async function chatExample() {
  const model = gateway('gpt-4', {
    temperature: 0.7,
    maxTokens: 1000,
  });

  try {
    const response = await model.doGenerate({
      prompt: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Hello! How are you?' },
      ],
    });

    console.log('Response:', response.text);
    console.log('Usage:', response.usage);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Example: Using an embedding model
export async function embeddingExample() {
  const embeddingModel = gateway.embedding('text-embedding-ada-002');

  try {
    const result = await embeddingModel.doEmbed({
      values: ['Hello world', 'Goodbye world'],
    });

    console.log('Embeddings:', result.embeddings);
    console.log('Usage:', result.usage);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Example: Using streaming
export async function streamingExample() {
  const model = gateway('gpt-4', {
    stream: true,
  });

  try {
    const { stream } = await model.doStream({
      prompt: [
        { role: 'user', content: 'Tell me a story about a dragon.' },
      ],
    });

    for await (const chunk of stream) {
      if (chunk.type === 'text-delta') {
        process.stdout.write(chunk.textDelta);
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Example: Using specific provider
export async function specificProviderExample() {
  const anthropicModel = gateway('claude-3-sonnet', {
    provider: 'anthropic',
    temperature: 0.5,
  });

  try {
    const response = await anthropicModel.doGenerate({
      prompt: [
        { role: 'user', content: 'Explain quantum computing in simple terms.' },
      ],
    });

    console.log('Anthropic response:', response.text);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Example: Using tools
export async function toolsExample() {
  const model = gateway('gpt-4', {
    temperature: 0.1,
  });

  try {
    const response = await model.doGenerate({
      prompt: [
        { role: 'user', content: 'What is the weather in San Francisco?' },
      ],
      tools: [
        {
          type: 'function',
          name: 'getWeather',
          description: 'Get the current weather for a location',
          parameters: {
            type: 'object',
            properties: {
              location: {
                type: 'string',
                description: 'The city and state, e.g. San Francisco, CA',
              },
            },
            required: ['location'],
          },
        },
      ],
      toolChoice: { type: 'auto' },
    });

    console.log('Response:', response.text);
    console.log('Tool calls:', response.toolCalls);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run examples if this file is executed directly
if (require.main === module) {
  console.log('Running Gateway provider examples...\n');

  chatExample()
    .then(() => console.log('\nChat example completed.'))
    .catch(console.error);

  embeddingExample()
    .then(() => console.log('\nEmbedding example completed.'))
    .catch(console.error);

  streamingExample()
    .then(() => console.log('\nStreaming example completed.'))
    .catch(console.error);

  specificProviderExample()
    .then(() => console.log('\nSpecific provider example completed.'))
    .catch(console.error);

  toolsExample()
    .then(() => console.log('\nTools example completed.'))
    .catch(console.error);
}
