import { createAI } from 'ai-toolkit/rsc';
import { submitMessage } from './actions';

export const AI = createAI({
  actions: {
    submitMessage,
  },
  initialAIState: [],
  initialUIState: [],
});
