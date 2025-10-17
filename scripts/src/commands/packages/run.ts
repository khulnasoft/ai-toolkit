import { Command } from 'commander'
import concurrently from 'concurrently'

/** Run domain used for composing pnpm commands */
export const run = new Command('run').description('Run a command')

run.addCommand(
  new Command('test-servers').description('Run the test servers').action(async () => {
    const { result } = concurrently([
      {
        command: 'CI=1 pnpm --filter @ai-toolkit/create-ai dev',
        name: 'create-ai',
        prefixColor: 'blue',
      },
      {
        command: 'CI=1 pnpm --filter @ai-toolkit/create-ai dev',
        name: 'create-ai',
        prefixColor: 'cyan',
      },
    ])

    await result.catch(() => null)
  }),
)