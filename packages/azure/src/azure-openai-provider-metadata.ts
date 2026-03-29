import {
  ResponsesProviderMetadata,
  ResponsesReasoningProviderMetadata,
  ResponsesSourceDocumentProviderMetadata,
  ResponsesTextProviderMetadata,
} from '@ai-toolkit/openai/internal';

export type AzureResponsesProviderMetadata = {
  azure: ResponsesProviderMetadata;
};

export type AzureResponsesReasoningProviderMetadata = {
  azure: ResponsesReasoningProviderMetadata;
};

export type AzureResponsesTextProviderMetadata = {
  azure: ResponsesTextProviderMetadata;
};

export type AzureResponsesSourceDocumentProviderMetadata = {
  azure: ResponsesSourceDocumentProviderMetadata;
};
