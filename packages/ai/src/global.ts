import { ProviderV2, ProviderV3, ProviderV4 } from '@ai-toolkit/provider';
import { LogWarningsFunction } from './logger/log-warnings';
import type { TelemetryIntegration } from './telemetry/telemetry-integration';

// add AI TOOLKIT default provider to the globalThis object
declare global {
  /**
   * The default provider to use for the AI TOOLKIT.
   * String model ids are resolved to the default provider and model id.
   *
   * If not set, the default provider is the Vercel AI gateway provider.
   *
   * @see https://ai-toolkit.dev/docs/ai-toolkit-core/provider-management#global-provider-configuration
   */
  var AI_TOOLKIT_DEFAULT_PROVIDER:
    | ProviderV4
    | ProviderV3
    | ProviderV2
    | undefined;

  /**
   * The warning logger to use for the AI TOOLKIT.
   *
   * If not set, the default logger is the console.warn function.
   *
   * If set to false, no warnings are logged.
   */
  var AI_TOOLKIT_LOG_WARNINGS: LogWarningsFunction | undefined | false;

  /**
   * Globally registered telemetry integrations for the AI TOOLKIT.
   *
   * Integrations registered here receive lifecycle events (onStart, onStepStart,
   * etc.) from every `generateText`, `streamText`, and similar call.
   *
   * Prefer using `registerTelemetryIntegration()` from `'ai'` instead of
   * assigning this directly.
   */
  var AI_TOOLKIT_TELEMETRY_INTEGRATIONS: TelemetryIntegration[] | undefined;
}
