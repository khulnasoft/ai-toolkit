import { openai } from '@ai-toolkit/openai';
import { generateText, tool } from 'ai-toolkit';
import 'dotenv/config';
import { z } from 'zod';
import { weatherTool } from '../tools/weather-tool';

async function main() {
  const { text } = await generateText({
    model: openai('gpt-4o'),
    tools: {
      weather: weatherTool,
      cityAttractions: tool({
        parameters: z.object({ city: z.string() }),
      }),
    },
    experimental_activeTools: [], // disable all tools
    maxSteps: 5,
    prompt:
      'What is the weather in San Francisco and what attractions should I visit?',
  });

  console.log(text);
}

main().catch(console.error);
