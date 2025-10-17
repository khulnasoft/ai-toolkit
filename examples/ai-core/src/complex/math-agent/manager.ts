// @ts-ignore: Suppress missing type declarations for monorepo local import
import { AgentManager, AgentTask, AgentContext, Agent } from '@ai-toolkit/core/agent';
import { MathAgent } from './agent';
// @ts-ignore: Suppress missing type declarations for uuid
import { v4 as uuidv4 } from 'uuid';

// Extend AgentManager to support MathAgent instantiation
class MathAgentManager extends AgentManager {
  // Override runAgent to use MathAgent for math tasks
  protected async runAgent(task: AgentTask) {
    let agent: Agent;
    if (task.type === 'math') {
      const context: AgentContext = await (this as any).gatherContext(task);
      agent = new MathAgent(task, context);
    } else {
      // fallback to base agent
      agent = {
        id: task.id,
        status: 'running',
        context: await (this as any).gatherContext(task),
        task,
        async run() {
          this.status = 'completed';
        },
      };
    }
    // @ts-ignore: Accessing protected/private property for monitoring
    this['agents'].set(agent.id, agent);
    try {
      console.log(`[Agent] Task ${agent.id} started. Status: ${agent.status}`);
      await agent.run();
      agent.status = 'completed';
      if (agent instanceof MathAgent) {
        console.log(`Task ${agent.id} completed. Answer: ${agent.answer}`);
      }
      this.printAgentStatuses();
    } catch (e) {
      agent.status = 'failed';
      console.error(`Task ${agent.id} failed.`);
      this.printAgentStatuses();
    }
  }

  printAgentStatuses() {
    // @ts-ignore: Accessing protected/private property for monitoring
    const statuses = Array.from(this['agents'].values()).map(a => {
      const agent = a as Agent;
      return `${agent.id}: ${agent.status}`;
    });
    console.log(`[Monitor] Agent statuses: ${statuses.join(' | ')}`);
  }
}

export const manager = new MathAgentManager(2); // 2 concurrent agents

// Example usage
async function main() {
  // Use the exported manager instance
  // const manager = new MathAgentManager(2); // 2 concurrent agents

  // Example math tasks
  const tasks: AgentTask[] = [
    {
      id: uuidv4(),
      type: 'math',
      payload: {
        prompt: 'What is (12 + 7) * 3?'
      },
    },
    {
      id: uuidv4(),
      type: 'math',
      payload: {
        prompt: 'A taxi driver earns $9461 per 1-hour work. If he works 12 hours a day and in 1 hour he uses 14-liters petrol with price $134 for 1-liter. How much money does he earn in one day?'
      },
    },
  ];

  for (const task of tasks) {
    // @ts-ignore: addTask is available on AgentManager
    manager.addTask(task);
  }

  // Wait for all tasks to complete
  await waitForAllTasks(manager, tasks.map(t => t.id));
  printAnalytics(manager, tasks.map(t => t.id));
}

async function waitForAllTasks(manager: MathAgentManager, ids: string[]) {
  // Poll until all agents are completed or failed
  while (true) {
    // @ts-ignore: Accessing protected/private property for monitoring
    const agents = manager['agents'];
    const done = ids.every(id => {
      const agent = agents.get(id);
      return agent && (agent.status === 'completed' || agent.status === 'failed');
    });
    if (done) break;
    await new Promise(res => setTimeout(res, 200));
  }
}

function printAnalytics(manager: MathAgentManager, ids: string[]) {
  // @ts-ignore: Accessing protected/private property for monitoring
  const agents = manager['agents'];
  const results = ids.map(id => agents.get(id)).filter(Boolean) as Agent[];
  const completed = results.filter(a => a.status === 'completed');
  const failed = results.filter(a => a.status === 'failed');
  const durations = results.map(a => a.duration || 0);
  const avg = durations.length ? (durations.reduce((a, b) => a + b, 0) / durations.length) : 0;
  const min = durations.length ? Math.min(...durations) : 0;
  const max = durations.length ? Math.max(...durations) : 0;
  const modelCounts: Record<string, number> = {};
  for (const a of results) {
    if (a.selectedModel) modelCounts[a.selectedModel] = (modelCounts[a.selectedModel] || 0) + 1;
  }
  console.log('\n[Analytics] Summary:');
  console.log(`  Total tasks: ${results.length}`);
  console.log(`  Completed: ${completed.length}`);
  console.log(`  Failed: ${failed.length}`);
  console.log(`  Avg duration: ${Math.round(avg)}ms, Min: ${min}ms, Max: ${max}ms`);
  console.log('  Model usage:', modelCounts);
}

main().catch(console.error); 