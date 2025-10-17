import { openai } from '@ai-toolkit/openai';
import { experimental_transcribe as transcribe } from 'ai';
import 'dotenv/config';

async function main() {
  const result = await transcribe({
    model: openai.transcription('whisper-1'),
    audio: new URL(
      'https://github.com/khulnasoft/ai/raw/refs/heads/main/examples/ai-core/data/galileo.mp3',
    ),
  });

  console.log('Text:', result.text);
  console.log('Duration:', result.durationInSeconds);
  console.log('Language:', result.language);
  console.log('Segments:', result.segments);
  console.log('Warnings:', result.warnings);
  console.log('Responses:', result.responses);
  console.log('Provider Metadata:', result.providerMetadata);
}

main().catch(console.error);
