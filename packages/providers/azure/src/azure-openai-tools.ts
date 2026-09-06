import {
  codeInterpreter,
  fileSearch,
  imageGeneration,
  webSearchPreview,
} from '@ai-toolkit/openai/internal';

export const azureOpenaiTools: {
  codeInterpreter: typeof codeInterpreter;
  fileSearch: typeof fileSearch;
  imageGeneration: typeof imageGeneration;
  webSearchPreview: typeof webSearchPreview;
} = {
  codeInterpreter,
  fileSearch,
  imageGeneration,
  webSearchPreview,
};
