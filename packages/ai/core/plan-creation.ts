import { generateObject } from 'ai';
import { z } from 'zod';
import type { AgentTask, AgentPlan, PlanStep } from './agent';

// Plan generation schema for structured output
const PlanGenerationSchema = z.object({
  title: z.string().describe('Brief title for the plan'),
  description: z
    .string()
    .describe('Detailed description of what this plan accomplishes'),
  steps: z
    .array(
      z.object({
        title: z.string().describe('Short title for this step'),
        description: z
          .string()
          .describe('Detailed description of what this step does'),
        priority: z
          .enum(['low', 'medium', 'high', 'critical'])
          .describe('Priority level of this step'),
        estimatedDuration: z
          .number()
          .optional()
          .describe('Estimated duration in milliseconds'),
        tools: z
          .array(z.string())
          .optional()
          .describe('Tools required for this step'),
        dependencies: z
          .array(z.string())
          .describe('IDs of steps that must complete first'),
      }),
    )
    .describe('Array of plan steps in logical order'),
});

// LLM-powered dynamic plan creation
export class DynamicPlanCreator {
  constructor(private modelProvider: any) {}

  async createPlan(task: AgentTask, context: any): Promise<AgentPlan> {
    const planId = `plan-${task.id}`;

    const prompt = this.buildPlanGenerationPrompt(task, context);

    try {
      const { object } = await generateObject({
        model: this.modelProvider,
        schema: PlanGenerationSchema,
        prompt,
        temperature: 0.3, // Lower temperature for more consistent planning
      });

      // Convert generated plan to AgentPlan format
      const steps: PlanStep[] = object.steps.map((step, index) => ({
        id: `${planId}-step-${index + 1}`,
        title: step.title,
        description: step.description,
        status: 'pending' as const,
        dependencies: step.dependencies.map(
          depIndex => `${planId}-step-${depIndex + 1}`,
        ),
        estimatedDuration: step.estimatedDuration || 5000,
        priority: step.priority,
        tools: step.tools || [],
        maxRetries: 3,
        retryCount: 0,
      }));

      return {
        id: planId,
        title: object.title,
        description: object.description,
        steps,
        status: 'draft',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        estimatedTotalDuration: steps.reduce(
          (total, step) => total + (step.estimatedDuration || 0),
          0,
        ),
      };
    } catch (error) {
      console.error('Failed to generate plan with LLM:', error);
      // Fallback to simple plan
      return this.createFallbackPlan(task, planId);
    }
  }

  private buildPlanGenerationPrompt(task: AgentTask, context: any): string {
    return `
You are an AI planning assistant. Create a detailed execution plan for the following task:

TASK DETAILS:
- Type: ${task.type}
- Priority: ${task.priority || 'medium'}
- Deadline: ${task.deadline ? new Date(task.deadline).toISOString() : 'None'}
- Constraints: ${JSON.stringify(task.constraints || {})}
- Payload: ${JSON.stringify(task.payload)}

AVAILABLE CONTEXT:
- MCP Context: ${JSON.stringify(context.mcpContext || {})}
- Codebase Context: ${JSON.stringify(context.codebaseContext || {})}
- Shell Context: ${JSON.stringify(context.shellContext || {})}

REQUIREMENTS:
1. Break down the task into logical, sequential steps
2. Consider dependencies between steps
3. Estimate realistic durations for each step
4. Specify required tools for each step
5. Assign appropriate priorities
6. Handle potential edge cases and error scenarios

Please generate a comprehensive plan that addresses all aspects of the task.
`;
  }

  private createFallbackPlan(task: AgentTask, planId: string): AgentPlan {
    return {
      id: planId,
      title: `Fallback plan for ${task.type}`,
      description: `Basic plan generated due to LLM planning failure`,
      steps: [
        {
          id: `${planId}-step-1`,
          title: `Execute ${task.type} task`,
          description: `Perform the ${task.type} task with fallback approach`,
          status: 'pending',
          dependencies: [],
          estimatedDuration: 10000,
          priority: 'medium',
          maxRetries: 3,
          retryCount: 0,
        },
      ],
      status: 'draft',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      estimatedTotalDuration: 10000,
    };
  }

  async adaptPlan(
    plan: AgentPlan,
    failedStepId: string,
    error: string,
  ): Promise<AgentPlan> {
    const prompt = `
The following plan execution failed:

PLAN: ${plan.title}
FAILED STEP: ${failedStepId}
ERROR: ${error}

CURRENT PLAN STEPS:
${plan.steps
  .map(
    (step, index) =>
      `${index + 1}. ${step.title} (${step.status}) - ${step.description}`,
  )
  .join('\n')}

Please suggest modifications to handle this failure. You can:
1. Retry the failed step with different approach
2. Add recovery steps
3. Skip the failed step if non-critical
4. Modify subsequent steps

Respond with the updated plan structure.
`;

    try {
      const { object } = await generateObject({
        model: this.modelProvider,
        schema: PlanGenerationSchema,
        prompt,
        temperature: 0.4,
      });

      // Update the plan with adapted steps
      const updatedSteps = object.steps.map((step, index) => {
        const existingStep = plan.steps[index];
        return {
          ...existingStep,
          title: step.title,
          description: step.description,
          priority: step.priority,
          estimatedDuration:
            step.estimatedDuration || existingStep.estimatedDuration,
          tools: step.tools || existingStep.tools,
          dependencies: step.dependencies.map(
            depIndex => `${plan.id}-step-${depIndex + 1}`,
          ),
        };
      });

      return {
        ...plan,
        steps: updatedSteps,
        updatedAt: Date.now(),
        status: 'validated',
      };
    } catch (error) {
      console.error('Failed to adapt plan:', error);
      return plan; // Return original plan if adaptation fails
    }
  }
}

// Plan template system for common task patterns
export class PlanTemplateManager {
  private templates: Map<string, Partial<AgentPlan>> = new Map();

  constructor() {
    this.initializeTemplates();
  }

  private initializeTemplates() {
    // Code generation template
    this.templates.set('code-generation', {
      title: 'Code Generation Plan',
      description: 'Standard plan for generating code based on requirements',
      steps: [
        {
          id: 'analyze-requirements',
          title: 'Analyze Requirements',
          description:
            'Understand and analyze the code generation requirements',
          status: 'pending',
          dependencies: [],
          estimatedDuration: 2000,
          priority: 'high',
          tools: ['analyzer'],
          maxRetries: 2,
        },
        {
          id: 'design-structure',
          title: 'Design Code Structure',
          description: 'Plan the overall code structure and architecture',
          status: 'pending',
          dependencies: ['analyze-requirements'],
          estimatedDuration: 3000,
          priority: 'high',
          tools: ['designer'],
          maxRetries: 2,
        },
        {
          id: 'generate-code',
          title: 'Generate Code',
          description: 'Write the actual code implementation',
          status: 'pending',
          dependencies: ['design-structure'],
          estimatedDuration: 5000,
          priority: 'critical',
          tools: ['generator'],
          maxRetries: 3,
        },
        {
          id: 'validate-code',
          title: 'Validate Code',
          description:
            'Check code quality, syntax, and requirements compliance',
          status: 'pending',
          dependencies: ['generate-code'],
          estimatedDuration: 2000,
          priority: 'medium',
          tools: ['validator'],
          maxRetries: 2,
        },
      ],
    });

    // Debugging template
    this.templates.set('debugging', {
      title: 'Debugging Plan',
      description: 'Systematic approach to identify and fix issues',
      steps: [
        {
          id: 'reproduce-issue',
          title: 'Reproduce Issue',
          description: 'Reproduce the reported issue consistently',
          status: 'pending',
          dependencies: [],
          estimatedDuration: 3000,
          priority: 'critical',
          tools: ['reproducer'],
          maxRetries: 3,
        },
        {
          id: 'analyze-logs',
          title: 'Analyze Logs',
          description: 'Examine logs and error messages for clues',
          status: 'pending',
          dependencies: ['reproduce-issue'],
          estimatedDuration: 2000,
          priority: 'high',
          tools: ['log-analyzer'],
          maxRetries: 2,
        },
        {
          id: 'identify-root-cause',
          title: 'Identify Root Cause',
          description: 'Pinpoint the exact cause of the issue',
          status: 'pending',
          dependencies: ['analyze-logs'],
          estimatedDuration: 4000,
          priority: 'high',
          tools: ['analyzer'],
          maxRetries: 3,
        },
        {
          id: 'implement-fix',
          title: 'Implement Fix',
          description: 'Apply the necessary changes to fix the issue',
          status: 'pending',
          dependencies: ['identify-root-cause'],
          estimatedDuration: 3000,
          priority: 'critical',
          tools: ['fixer'],
          maxRetries: 3,
        },
        {
          id: 'verify-fix',
          title: 'Verify Fix',
          description:
            'Test that the fix resolves the issue without side effects',
          status: 'pending',
          dependencies: ['implement-fix'],
          estimatedDuration: 2000,
          priority: 'high',
          tools: ['tester'],
          maxRetries: 2,
        },
      ],
    });

    // Math problem template
    this.templates.set('math-problem', {
      title: 'Math Problem Solution Plan',
      description: 'Structured approach to solve mathematical problems',
      steps: [
        {
          id: 'analyze-problem',
          title: 'Analyze Math Problem',
          description:
            'Understand the mathematical problem, identify key concepts and required operations',
          status: 'pending',
          dependencies: [],
          estimatedDuration: 2000,
          priority: 'high',
          tools: ['analyzer'],
          maxRetries: 2,
        },
        {
          id: 'select-strategy',
          title: 'Select Solution Strategy',
          description:
            'Choose the most appropriate mathematical approach and solution method',
          status: 'pending',
          dependencies: ['analyze-problem'],
          estimatedDuration: 1500,
          priority: 'high',
          tools: ['strategy-selector'],
          maxRetries: 2,
        },
        {
          id: 'perform-calculations',
          title: 'Perform Calculations',
          description: 'Execute the mathematical operations and computations',
          status: 'pending',
          dependencies: ['select-strategy'],
          estimatedDuration: 3000,
          priority: 'critical',
          tools: ['calculator'],
          maxRetries: 3,
        },
        {
          id: 'generate-explanation',
          title: 'Generate Explanation',
          description: 'Explain the solution process and final answer',
          status: 'pending',
          dependencies: ['perform-calculations'],
          estimatedDuration: 2000,
          priority: 'medium',
          tools: ['explainer'],
          maxRetries: 2,
        },
      ],
    });
  }

  getTemplate(taskType: string): Partial<AgentPlan> | undefined {
    return this.templates.get(taskType);
  }

  addTemplate(name: string, template: Partial<AgentPlan>) {
    this.templates.set(name, template);
  }

  listTemplates(): string[] {
    return Array.from(this.templates.keys());
  }
}
