import { openai } from '@ai-toolkit/openai';
import { generateText, tool } from 'ai-toolkit';
import { MockLanguageModelV1 } from 'ai-toolkit/test';
import 'dotenv/config';
import { z } from 'zod';

async function main() {
  const result = await generateText({
    model: new MockLanguageModelV1({
      doGenerate: async () => ({
        rawCall: { rawPrompt: null, rawSettings: {} },
        usage: { promptTokens: 10, completionTokens: 20 },
        finishReason: 'tool-calls',
        toolCalls: [
          {
            toolCallType: 'function',
            toolCallId: 'call-1',
            toolName: 'cityAttractions',
            // wrong tool call arguments (city vs cities):
            args: `{ "city": "San Francisco" }`,
          },
        ],
      }),
    }),
    tools: {
      cityAttractions: tool({
        parameters: z.object({ cities: z.array(z.string()) }),
      }),
    },
    prompt: 'What are the tourist attractions in San Francisco?',

    experimental_repairToolCall: async ({
      toolCall,
      tools,
      error,
      messages,
      system,
    }) => {
      const result = await generateText({
        model: openai('gpt-4o'),
        system,
        messages: [
          ...messages,
          {
            role: 'assistant',
            content: [
              {
                type: 'tool-call',
                toolCallId: toolCall.toolCallId,
                toolName: toolCall.toolName,
                args: toolCall.args,
              },
            ],
          },
          {
            role: 'tool' as const,
            content: [
              {
                type: 'tool-result',
                toolCallId: toolCall.toolCallId,
                toolName: toolCall.toolName,
                result: error.message,
              },
            ],
          },
        ],
        tools,
      });

      const newToolCall = result.toolCalls.find(
        newToolCall => newToolCall.toolName === toolCall.toolName,
      );

      return newToolCall != null
        ? {
            toolCallType: 'function' as const,
            toolCallId: toolCall.toolCallId,
            toolName: toolCall.toolName,
            args: JSON.stringify(newToolCall.args),
          }
        : null;
    },
  });

  console.log('Repaired tool calls:');
  console.log(JSON.stringify(result.toolCalls, null, 2));
}

main().catch(console.error);
