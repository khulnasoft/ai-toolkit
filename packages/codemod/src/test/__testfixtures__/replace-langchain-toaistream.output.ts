// @ts-nocheck
import { LangChainAdapter } from 'ai-toolkit';
import { model } from 'langchain';

const stream = LangChainAdapter.toDataStream(model.stream(), {
  onToken: token => console.log(token)
});

const response = new Response(stream);
