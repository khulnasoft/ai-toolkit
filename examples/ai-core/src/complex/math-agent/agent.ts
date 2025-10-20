// @ts-ignore: Suppress missing type declarations for monorepo local import
import { Agent, AgentTask, AgentContext } from '@ai-toolkit/core/agent';
// @ts-ignore: Suppress missing type declarations for monorepo local import
import { openai } from '@ai-toolkit/openai';
// @ts-ignore: Suppress missing type declarations for monorepo local import
import { generateText, tool } from 'ai';
import * as mathjs from 'mathjs';
import { z } from 'zod';

export class MathAgent implements Agent {
  id: string;
  status: 'pending' | 'running' | 'completed' | 'failed' = 'pending';
  context: AgentContext;
  task: AgentTask;
  answer: string | null = null;
  plan?: string[];
  selectedModel?: string;

  constructor(task: AgentTask, context: AgentContext) {
    this.id = task.id;
    this.task = task;
    this.context = context;
  }

  async planSteps(): Promise<string[]> {
    // Use LLM to generate a step-by-step plan for the math problem
    // For now, simulate with a static plan; replace with LLM call for real use
    return [
      'Understand the math problem',
      'Extract relevant numbers and operations',
      'Perform calculations step by step',
      'Check the result for correctness',
      'Report the final answer with explanation',
    ];
  }

  async selectModel(): Promise<string> {
    // Simulate model selection based on prompt/context
    const prompt: string = this.task.payload.prompt || '';
    if (prompt.includes('explain') || prompt.length > 100) {
      return 'gpt-4o'; // Use a more capable model for complex/explanatory tasks
    }
    return 'gpt-3.5-turbo'; // Use a faster/cheaper model for simple math
  }

  async run() {
    this.status = 'running';
    try {
      const { text: answer } = await generateText({
        model:
          this.selectedModel ||
          openai('gpt-4o-2024-08-06', { structuredOutputs: true }),
        tools: {
          calculate: tool({
            description:
              'A tool for evaluating mathematical expressions. Example expressions: ' +
              "'1.2 * (2 + 4.5)', '12.7 cm to inch', 'sin(45 deg) ^ 2'.",
            parameters: z.object({ expression: z.string() }),
            execute: async ({ expression }: { expression: string }) =>
              mathjs.evaluate(expression),
          }),
        },
        maxSteps: 10,
        onStepFinish: async ({ toolResults }: { toolResults: any }) => {
          // Optionally log or store step results
        },
        system:
          'You are solving math problems. ' +
          'Reason step by step. ' +
          'Use the calculator when necessary. ' +
          'The calculator can only do simple additions, subtractions, multiplications, and divisions. ' +
          'When you give the final answer, provide an explanation for how you got it.',
        prompt: this.task.payload.prompt,
      });
      this.answer = answer;
      this.status = 'completed';
    } catch (e) {
      this.status = 'failed';
      this.answer = null;
    }
  }
}
