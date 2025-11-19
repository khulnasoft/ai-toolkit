import type {
  LanguageModelV1CallOptions,
  LanguageModelV1ProviderMetadata,
} from '@ai-toolkit/provider';
import type { LanguageModelV1Middleware } from './language-model-v1-middleware';
import { mergeObjects } from '../util/merge-objects';

/**
 * Applies default settings for a language model.
 *
 * This middleware merges provided settings with default values, ensuring
 * consistent behavior across different language model calls.
 *
 * @param options - Configuration object containing default settings
 * @param options.settings - Default settings to apply when not provided in params
 * @returns Language model middleware that applies the default settings
 *
 * @example
 * ```typescript
 * const middleware = defaultSettingsMiddleware({
 *   settings: {
 *     temperature: 0.7,
 *     maxTokens: 1000,
 *   }
 * });
 * ```
 */
export function defaultSettingsMiddleware({
  settings,
}: {
  settings: Partial<
    LanguageModelV1CallOptions & {
      providerMetadata?: LanguageModelV1ProviderMetadata;
    }
  >;
}): LanguageModelV1Middleware {
  return {
    middlewareVersion: 'v1',
    transformParams: async ({ params }) => {
      // Merge settings with params, with params taking precedence
      const mergedSettings = {
        ...settings,
        ...params,
        providerMetadata: mergeObjects(
          settings.providerMetadata,
          params.providerMetadata,
        ),
      };

      // Handle temperature special case for backwards compatibility
      // TODO: Remove when temperature defaults to undefined in provider
      if (params.temperature === 0 || params.temperature == null) {
        mergedSettings.temperature = settings.temperature ?? 0;
      }

      return mergedSettings;
    },
  };
}
