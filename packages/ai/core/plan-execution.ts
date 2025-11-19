import type { AgentPlan, PlanStep } from './agent';

export class PlanExecutor {
  private executionHistory: Map<string, PlanStep[]> = new Map();

  async executePlan(plan: AgentPlan, context: any): Promise<AgentPlan> {
    let updatedPlan: AgentPlan = { ...plan, status: 'executing' as const };

    try {
      // Execute steps in dependency order
      const executedSteps: PlanStep[] = [];

      for (const step of this.getExecutionOrder(updatedPlan.steps)) {
        const updatedStep = await this.executeStep(step, context);
        executedSteps.push(updatedStep);

        // Update the step in the plan
        const stepIndex = updatedPlan.steps.findIndex(s => s.id === step.id);
        if (stepIndex !== -1) {
          updatedPlan.steps[stepIndex] = updatedStep;
        }

        // If step failed and is critical, stop execution
        if (
          updatedStep.status === 'failed' &&
          updatedStep.priority === 'critical'
        ) {
          return { ...updatedPlan, status: 'failed' as const };
        }
      }

      // Update plan status based on step results
      const allCompleted = updatedPlan.steps.every(
        step => step.status === 'completed' || step.status === 'skipped',
      );
      const hasFailures = updatedPlan.steps.some(
        step => step.status === 'failed',
      );

      updatedPlan = {
        ...updatedPlan,
        status: allCompleted
          ? ('completed' as const)
          : hasFailures
            ? ('failed' as const)
            : ('executing' as const),
        actualTotalDuration: this.calculateActualDuration(updatedPlan.steps),
        updatedAt: Date.now(),
      };

      // Store execution history
      this.executionHistory.set(plan.id, updatedPlan.steps);

      return updatedPlan;
    } catch (error) {
      return {
        ...updatedPlan,
        status: 'failed' as const,
        updatedAt: Date.now(),
      };
    }
  }

  private async executeStep(step: PlanStep, context: any): Promise<PlanStep> {
    let updatedStep: PlanStep = {
      ...step,
      status: 'in_progress' as const,
      startTime: Date.now(),
    };

    try {
      // Check if dependencies are completed
      if (!this.areDependenciesCompleted(updatedStep, context.planSteps)) {
        return {
          ...updatedStep,
          status: 'skipped' as const,
          error: 'Dependencies not completed',
        };
      }

      // Execute the step (this would be implemented by specific agents)
      const result = await this.performStepAction(updatedStep, context);

      updatedStep = {
        ...updatedStep,
        status: 'completed' as const,
        output: result,
        endTime: Date.now(),
        actualDuration: Date.now() - (updatedStep.startTime || Date.now()),
      };

      return updatedStep;
    } catch (error) {
      updatedStep = {
        ...updatedStep,
        status: 'failed' as const,
        error: error instanceof Error ? error.message : String(error),
        endTime: Date.now(),
        actualDuration: Date.now() - (updatedStep.startTime || Date.now()),
        retryCount: (updatedStep.retryCount || 0) + 1,
      };

      // Retry logic
      if (updatedStep.retryCount < (updatedStep.maxRetries || 3)) {
        console.log(
          `Retrying step ${updatedStep.id} (attempt ${updatedStep.retryCount + 1})`,
        );
        return this.executeStep(updatedStep, context);
      }

      return updatedStep;
    }
  }

  private async performStepAction(
    step: PlanStep,
    context: any,
  ): Promise<string> {
    // This is a placeholder implementation
    // In a real system, this would delegate to appropriate tools/services

    console.log(`Executing step: ${step.title}`);
    console.log(`Description: ${step.description}`);
    console.log(`Required tools: ${step.tools?.join(', ') || 'none'}`);

    // Simulate work based on estimated duration
    const workDuration = Math.min(step.estimatedDuration || 1000, 3000);
    await new Promise(resolve => setTimeout(resolve, workDuration));

    // Simulate occasional failures (10% chance)
    if (Math.random() < 0.1) {
      throw new Error(`Simulated failure in step: ${step.title}`);
    }

    return `Successfully completed: ${step.title}`;
  }

  private getExecutionOrder(steps: PlanStep[]): PlanStep[] {
    // Topological sort based on dependencies
    const visited = new Set<string>();
    const visiting = new Set<string>();
    const result: PlanStep[] = [];

    const visit = (step: PlanStep) => {
      if (visiting.has(step.id)) {
        throw new Error(
          `Circular dependency detected involving step ${step.id}`,
        );
      }
      if (visited.has(step.id)) {
        return;
      }

      visiting.add(step.id);

      // Visit dependencies first
      for (const depId of step.dependencies) {
        const depStep = steps.find(s => s.id === depId);
        if (depStep) {
          visit(depStep);
        }
      }

      visiting.delete(step.id);
      visited.add(step.id);
      result.push(step);
    };

    // Sort by priority first, then apply topological sort
    const sortedSteps = [...steps].sort((a, b) => {
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    for (const step of sortedSteps) {
      visit(step);
    }

    return result;
  }

  private areDependenciesCompleted(
    step: PlanStep,
    allSteps: PlanStep[],
  ): boolean {
    return step.dependencies.every(depId => {
      const depStep = allSteps.find(s => s.id === depId);
      return (
        depStep &&
        (depStep.status === 'completed' || depStep.status === 'skipped')
      );
    });
  }

  private calculateActualDuration(steps: PlanStep[]): number {
    return steps.reduce((total, step) => total + (step.actualDuration || 0), 0);
  }

  getExecutionHistory(planId: string): PlanStep[] {
    return this.executionHistory.get(planId) || [];
  }

  async resumeExecution(plan: AgentPlan, context: any): Promise<AgentPlan> {
    // Find the first incomplete step
    const incompleteSteps = plan.steps.filter(
      step => step.status === 'pending' || step.status === 'failed',
    );

    if (incompleteSteps.length === 0) {
      return { ...plan, status: 'completed' as const };
    }

    // Reset failed steps to pending for retry
    const resetSteps = plan.steps.map(step =>
      step.status === 'failed'
        ? { ...step, status: 'pending' as const, retryCount: 0 }
        : step,
    );

    const resumedPlan = {
      ...plan,
      steps: resetSteps,
      status: 'executing' as const,
    };
    return this.executePlan(resumedPlan, context);
  }

  getStepMetrics(plan: AgentPlan): {
    totalSteps: number;
    completedSteps: number;
    failedSteps: number;
    pendingSteps: number;
    inProgressSteps: number;
    skippedSteps: number;
    successRate: number;
    averageStepDuration: number;
  } {
    const totalSteps = plan.steps.length;
    const completedSteps = plan.steps.filter(
      s => s.status === 'completed',
    ).length;
    const failedSteps = plan.steps.filter(s => s.status === 'failed').length;
    const pendingSteps = plan.steps.filter(s => s.status === 'pending').length;
    const inProgressSteps = plan.steps.filter(
      s => s.status === 'in_progress',
    ).length;
    const skippedSteps = plan.steps.filter(s => s.status === 'skipped').length;

    const successRate =
      totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

    const completedStepDurations = plan.steps
      .filter(s => s.actualDuration)
      .map(s => s.actualDuration!);
    const averageStepDuration =
      completedStepDurations.length > 0
        ? completedStepDurations.reduce((a, b) => a + b, 0) /
          completedStepDurations.length
        : 0;

    return {
      totalSteps,
      completedSteps,
      failedSteps,
      pendingSteps,
      inProgressSteps,
      skippedSteps,
      successRate,
      averageStepDuration,
    };
  }
}
