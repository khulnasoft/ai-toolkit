import { command } from 'cleye';
import { execaCommand } from 'execa';
import { dim } from 'kolorist';
import i18n from '../helpers/i18n';

export default command(
  {
    name: 'update',
    help: {
      description: 'Update Dev AI to the latest version',
    },
  },
  async () => {
    console.log('');
    const command = `npm update -g @ai-toolkit/dev-ai`;
    console.log(dim(`${i18n.t('Running')}: ${command}`));
    console.log('');
    await execaCommand(command, {
      stdio: 'inherit',
      shell: process.env.SHELL || true,
    }).catch(() => {
      // No need to handle, will go to stderr
    });
    console.log('');
  },
);
