import { generateText, tool } from 'ai';
import { openai } from '@ai-toolkit/openai';
import { z } from 'zod';
import type {
  Agent,
  AgentTask,
  AgentContext,
  AgentPlan,
  PlanStep,
} from '@ai-toolkit/ai/core';
import {
  DynamicPlanCreator,
  PlanTemplateManager,
} from '@ai-toolkit/ai/core/plan-creation';
import { PlanExecutor } from '@ai-toolkit/ai/core/plan-execution';

export class MathAgent implements Agent {
  id: string;
  status: 'pending' | 'running' | 'completed' | 'failed' = 'pending';
  context: AgentContext;
  task: AgentTask;
  plan?: AgentPlan;
  selectedModel?: string;
  startTime?: number;
  endTime?: number;
  duration?: number;
  answer?: string;

  private planCreator: DynamicPlanCreator;
  private templateManager: PlanTemplateManager;
  private executor: PlanExecutor;

  constructor(task: AgentTask, context: AgentContext) {
    this.id = task.id;
    this.task = task;
    this.context = context;

    // Initialize planning components
    this.planCreator = new DynamicPlanCreator(openai('gpt-4o'));
    this.templateManager = new PlanTemplateManager();
    this.executor = new PlanExecutor();
  }

  async createPlan(): Promise<AgentPlan> {
    // First try to get a template for math problems
    const template = this.templateManager.getTemplate('math-problem');

    if (template) {
      // Use template as base, adapt with LLM for specific problem
      const basePlan = {
        ...template,
        id: `plan-${this.task.id}`,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      } as AgentPlan;
      return await this.adaptTemplateToProblem(basePlan);
    }

    // Fallback to dynamic LLM-based planning
    return await this.planCreator.createPlan(this.task, this.context);
  }

  private async adaptTemplateToProblem(
    basePlan: AgentPlan,
  ): Promise<AgentPlan> {
    const problem = this.task.payload.prompt || '';

    // Analyze problem complexity and adapt steps accordingly
    const isComplex =
      problem.length > 100 ||
      problem.includes('explain') ||
      problem.includes('prove');
    const requiresGraphing =
      problem.includes('graph') ||
      problem.includes('plot') ||
      problem.includes('visualize');
    const requiresProof =
      problem.includes('prove') ||
      problem.includes('show that') ||
      problem.includes('demonstrate');

    const adaptedSteps: PlanStep[] = [];

    // Step 1: Problem Analysis
    adaptedSteps.push({
      id: `${basePlan.id}-step-1`,
      title: 'Analyze Math Problem',
      description:
        'Understand the mathematical problem, identify key concepts and required operations',
      status: 'pending',
      dependencies: [],
      estimatedDuration: 2000,
      priority: 'high',
      tools: ['analyzer'],
      maxRetries: 2,
    });

    // Step 2: Strategy Selection
    adaptedSteps.push({
      id: `${basePlan.id}-step-2`,
      title: 'Select Solution Strategy',
      description:
        'Choose the most appropriate mathematical approach and solution method',
      status: 'pending',
      dependencies: [`${basePlan.id}-step-1`],
      estimatedDuration: 1500,
      priority: 'high',
      tools: ['strategy-selector'],
      maxRetries: 2,
    });

    // Step 3: Calculation
    adaptedSteps.push({
      id: `${basePlan.id}-step-3`,
      title: 'Perform Calculations',
      description: 'Execute the mathematical operations and computations',
      status: 'pending',
      dependencies: [`${basePlan.id}-step-2`],
      estimatedDuration: isComplex ? 4000 : 2000,
      priority: 'critical',
      tools: ['calculator'],
      maxRetries: 3,
    });

    // Step 4: Verification (optional for complex problems)
    if (isComplex) {
      adaptedSteps.push({
        id: `${basePlan.id}-step-4`,
        title: 'Verify Results',
        description: 'Check calculations and validate the solution',
        status: 'pending',
        dependencies: [`${basePlan.id}-step-3`],
        estimatedDuration: 2000,
        priority: 'medium',
        tools: ['verifier'],
        maxRetries: 2,
      });
    }

    // Step 5: Explanation (always included, enhanced for complex problems)
    adaptedSteps.push({
      id: `${basePlan.id}-step-${isComplex ? 5 : 4}`,
      title: 'Generate Explanation',
      description: requiresProof
        ? 'Provide step-by-step proof with logical reasoning'
        : 'Explain the solution process and final answer',
      status: 'pending',
      dependencies: [`${basePlan.id}-step-${isComplex ? 4 : 3}`],
      estimatedDuration: isComplex ? 3000 : 1500,
      priority: 'medium',
      tools: ['explainer'],
      maxRetries: 2,
    });

    // Step 6: Visualization (if required)
    if (requiresGraphing) {
      adaptedSteps.push({
        id: `${basePlan.id}-step-${isComplex ? 6 : 5}`,
        title: 'Create Visualization',
        description:
          'Generate graph or visual representation of the mathematical concept',
        status: 'pending',
        dependencies: [`${basePlan.id}-step-${isComplex ? 5 : 4}`],
        estimatedDuration: 2500,
        priority: 'medium',
        tools: ['visualizer'],
        maxRetries: 2,
      });
    }

    return {
      ...basePlan,
      title: `Math Problem Solution Plan`,
      description: `Structured approach to solve: ${problem.substring(0, 50)}${problem.length > 50 ? '...' : ''}`,
      steps: adaptedSteps,
      estimatedTotalDuration: adaptedSteps.reduce(
        (total, step) => total + (step.estimatedDuration || 0),
        0,
      ),
      optimizationScore: 90,
    };
  }

  async validatePlan(plan: AgentPlan): Promise<string[]> {
    const errors: string[] = [];

    if (!plan.steps.length) {
      errors.push('Plan must have at least one step');
    }

    // Check for calculation step
    const hasCalculation = plan.steps.some(
      step =>
        step.title.includes('Calculation') || step.title.includes('Calculate'),
    );
    if (!hasCalculation) {
      errors.push('Math problem plan must include a calculation step');
    }

    // Check dependencies
    const stepIds = new Set(plan.steps.map(s => s.id));
    for (const step of plan.steps) {
      for (const dep of step.dependencies) {
        if (!stepIds.has(dep)) {
          errors.push(`Step ${step.id} depends on non-existent step ${dep}`);
        }
      }
    }

    return errors;
  }

  async optimizePlan(plan: AgentPlan): Promise<AgentPlan> {
    // Sort steps by logical execution order and priority
    const optimizedSteps = [...plan.steps].sort((a, b) => {
      // Critical steps first, then by dependency order
      if (a.priority === 'critical' && b.priority !== 'critical') return -1;
      if (a.priority !== 'critical' && b.priority === 'critical') return 1;

      // Then by dependency count (steps with fewer dependencies first)
      return a.dependencies.length - b.dependencies.length;
    });

    return {
      ...plan,
      steps: optimizedSteps,
      optimizationScore: 95,
      status: 'validated',
      updatedAt: Date.now(),
    };
  }

  async selectModel(): Promise<string> {
    const prompt: string = this.task.payload.prompt || '';

    // Select model based on problem complexity
    if (
      prompt.includes('prove') ||
      prompt.includes('explain') ||
      prompt.length > 150
    ) {
      return 'gpt-4o'; // Use more capable model for complex proofs and explanations
    }
    if (prompt.includes('graph') || prompt.includes('plot')) {
      return 'gpt-4o'; // Use capable model for visualization tasks
    }
    return 'gpt-3.5-turbo'; // Use faster model for simple calculations
  }

  async run(): Promise<void> {
    this.status = 'running';

    try {
      if (!this.plan) {
        throw new Error('No plan available for execution');
      }

      // Execute the plan using the PlanExecutor
      const executedPlan = await this.executor.executePlan(
        this.plan,
        this.context,
      );
      this.plan = executedPlan;

      // Extract the final answer from the completed plan
      const explanationStep = executedPlan.steps.find(
        step =>
          step.title.includes('Explanation') && step.status === 'completed',
      );

      if (explanationStep?.output) {
        this.answer = explanationStep.output;
      } else {
        // Fallback: use the last completed step's output
        const completedSteps = executedPlan.steps.filter(
          step => step.status === 'completed',
        );
        if (completedSteps.length > 0) {
          this.answer = completedSteps[completedSteps.length - 1].output;
        }
      }

      this.status =
        executedPlan.status === 'completed' ? 'completed' : 'failed';
    } catch (error) {
      this.status = 'failed';
      this.answer = null;
      console.error('MathAgent execution failed:', error);
    }
  }

  // Legacy method for backward compatibility
  async planSteps(): Promise<string[]> {
    const plan = await this.createPlan();
    return plan.steps.map(step => `${step.title}: ${step.description}`);
  }
}
