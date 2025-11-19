import type { LanguageModelV1StreamPart } from '@ai-toolkit/provider';
import { getPotentialStartIndex } from '../util/get-potential-start-index';
import type { LanguageModelV1Middleware } from './language-model-v1-middleware';

/**
 * Extracts reasoning from the response stream.
 *
 * This middleware extracts reasoning from the response stream and adds it to the
 * response metadata.
 */
export function extractReasoningMiddleware(): LanguageModelV1Middleware {
  return {
    middlewareVersion: 'v1',
    wrapStream: async ({ doGenerate }) => {
      const result = await doGenerate();

      let reasoning: string | undefined;
      let reasoningSignature: string | undefined;

      const modifiedStream = new ReadableStream<LanguageModelV1StreamPart>({
        start(controller) {
          // Forward response metadata
          controller.enqueue({
            type: 'response-metadata',
            ...result.response,
          });

          // Process the stream
          const reader = result.stream.getReader();

          function pump(): Promise<void> {
            return reader.read().then(({ done, value }: { done: boolean; value: LanguageModelV1StreamPart }) => {
              if (done) {
                controller.close();
                return;
              }

              switch (value.type) {
                case 'reasoning': {
                  reasoning = (reasoning ?? '') + value.textDelta;

                  // Do not forward reasoning parts
                  break;
                }

                case 'reasoning-signature': {
                  reasoningSignature = value.signature;

                  // Do not forward reasoning signature parts
                  break;
                }

                default: {
                  controller.enqueue(value);
                }
              }

              return pump();
            });
          }

          return pump();
        },
      });

      return {
        stream: modifiedStream,
        rawCall: result.rawCall,
        rawResponse: {
          ...result.rawResponse,
          reasoning,
          reasoningSignature,
        },
        warnings: result.warnings,
      };
    },
  };
}
