import prompts from 'prompts';
import kleur from 'kleur';

export async function runConfigMenu() {
  let config = {
    openaiKey: '',
    apiEndpoint: '',
    silentMode: false,
    model: 'gpt-4o-mini',
    language: 'en',
  };

  let exit = false;
  while (!exit) {
    console.log(kleur.cyan().bold('\n◆  Set config:'));
    const { menuItem } = await prompts({
      type: 'select',
      name: 'menuItem',
      message: '',
      choices: [
        {
          title: `OpenAI Key${config.openaiKey ? ' (set)' : ''}`,
          value: 'openaiKey',
        },
        {
          title: `OpenAI API Endpoint${config.apiEndpoint ? ' (set)' : ''}`,
          value: 'apiEndpoint',
        },
        {
          title: `Silent Mode${config.silentMode ? ' (on)' : ''}`,
          value: 'silentMode',
        },
        {
          title: kleur.green().bold(`Model (${config.model})`),
          value: 'model',
        },
        { title: `Language (${config.language})`, value: 'language' },
        { title: kleur.red('Cancel'), value: 'cancel' },
      ],
      initial: 3,
      instructions: false,
    });

    switch (menuItem) {
      case 'openaiKey': {
        const { value } = await prompts({
          type: 'password',
          name: 'value',
          message: 'Enter your OpenAI API Key:',
          validate: (val: string) =>
            val && val.startsWith('sk-')
              ? true
              : 'Key must start with sk- and not be empty',
        });
        if (value) config.openaiKey = value;
        break;
      }
      case 'apiEndpoint': {
        const { value } = await prompts({
          type: 'text',
          name: 'value',
          message: 'Enter OpenAI API Endpoint:',
          initial:
            config.apiEndpoint || 'https://api.openai.com/v1/completions',
        });
        if (value) config.apiEndpoint = value;
        break;
      }
      case 'silentMode': {
        config.silentMode = !config.silentMode;
        break;
      }
      case 'model': {
        const { value } = await prompts({
          type: 'text',
          name: 'value',
          message: 'Enter model name:',
          initial: config.model,
        });
        if (value) config.model = value;
        break;
      }
      case 'language': {
        const { value } = await prompts({
          type: 'text',
          name: 'value',
          message: 'Enter language code:',
          initial: config.language,
        });
        if (value) config.language = value;
        break;
      }
      case 'cancel':
      default:
        exit = true;
        break;
    }
  }
  return config;
}
