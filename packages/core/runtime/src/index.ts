export type RuntimeTarget =
  | 'browser'
  | 'node'
  | 'edge'
  | 'serverless'
  | 'workers'
  | 'mobile'
  | 'electron'
  | 'tauri';

export interface RuntimeCapabilities {
  readonly target: RuntimeTarget;
  readonly fetch: boolean;
  readonly streams: boolean;
  readonly abortSignal: boolean;
  readonly crypto: boolean;
  readonly timers: boolean;
  readonly encoding: boolean;
  readonly binaryData: boolean;
}

export interface RuntimeContext {
  readonly fetch: typeof globalThis.fetch;
  readonly crypto?: Crypto;
  readonly setTimeout: typeof globalThis.setTimeout;
  readonly clearTimeout: typeof globalThis.clearTimeout;
  readonly supports: RuntimeCapabilities;
}

export interface RuntimeAdapter {
  readonly target: RuntimeTarget;
  readonly capabilities: RuntimeCapabilities;
  createContext(overrides?: Partial<RuntimeContext>): RuntimeContext;
}

export class RuntimeCapabilityError extends Error {
  readonly code = 'RUNTIME_CAPABILITY_UNSUPPORTED';
  readonly target: RuntimeTarget;
  readonly capability: keyof RuntimeCapabilities;

  constructor(target: RuntimeTarget, capability: keyof RuntimeCapabilities) {
    super(
      `Runtime \"${target}\" does not support capability \"${capability}\".`,
    );
    this.name = 'RuntimeCapabilityError';
    this.target = target;
    this.capability = capability;
  }
}

export function assertRuntimeCapability(
  runtime: RuntimeCapabilities,
  capability: keyof RuntimeCapabilities,
): void {
  if (capability === 'target') return;
  if (!runtime[capability]) {
    throw new RuntimeCapabilityError(runtime.target, capability);
  }
}

export function createRuntimeContext(
  target: RuntimeTarget,
  overrides: Partial<RuntimeContext> = {},
): RuntimeContext {
  const capabilities: RuntimeCapabilities = {
    target,
    fetch: typeof globalThis.fetch === 'function',
    streams: typeof globalThis.ReadableStream === 'function',
    abortSignal: typeof globalThis.AbortSignal === 'function',
    crypto: typeof globalThis.crypto !== 'undefined',
    timers: typeof globalThis.setTimeout === 'function',
    encoding: typeof globalThis.TextEncoder === 'function',
    binaryData: typeof globalThis.ArrayBuffer === 'function',
  };

  return {
    fetch: overrides.fetch ?? globalThis.fetch.bind(globalThis),
    crypto: overrides.crypto ?? globalThis.crypto,
    setTimeout: overrides.setTimeout ?? globalThis.setTimeout,
    clearTimeout: overrides.clearTimeout ?? globalThis.clearTimeout,
    supports: overrides.supports ?? capabilities,
  };
}
