// @ts-nocheck
import { LangChainAdapter } from 'ai-toolkit';
import { model } from 'langchain';

const stream = LangChainAdapter.toAIStream(model.stream(), {
  onToken: token => console.log(token)
});

const response = new Response(stream);
