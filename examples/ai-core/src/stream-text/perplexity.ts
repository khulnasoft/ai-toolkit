import { perplexity } from '@ai-toolkit/perplexity';
import { streamText } from 'ai-toolkit';
import 'dotenv/config';

async function main() {
  const result = streamText({
    model: perplexity('sonar-pro'),
    prompt: 'What has happened in San Francisco recently?',
    providerOptions: {
      perplexity: {
        search_recency_filter: 'week',
      },
    },
  });

  for await (const textPart of result.textStream) {
    process.stdout.write(textPart);
  }

  console.log();
  console.log('Sources:', await result.sources);
  console.log('Token usage:', await result.usage);
  console.log('Finish reason:', await result.finishReason);
  console.log(
    'Metadata:',
    JSON.stringify(await result.providerMetadata, null, 2),
  );
}

main().catch(console.error);
