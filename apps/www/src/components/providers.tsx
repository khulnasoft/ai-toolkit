import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ai-toolkit/design-system';

const providers = [
  {
    name: 'OpenAI',
    description: 'GPT-4o, GPT-4o mini, o1, and more',
    models: ['gpt-4o', 'gpt-4o-mini', 'o1', 'o3'],
  },
  {
    name: 'Anthropic',
    description: 'Claude Opus, Sonnet, and Haiku models',
    models: ['claude-opus-4', 'claude-sonnet-4', 'claude-haiku-3'],
  },
  {
    name: 'Google',
    description: 'Gemini 2.5 Pro, Flash, and more',
    models: ['gemini-2.5-pro', 'gemini-2.5-flash', 'gemini-2.0'],
  },
  {
    name: 'Amazon Bedrock',
    description: 'Nova, Claude, and Llama on AWS',
    models: ['nova-pro', 'nova-lite', 'llama-3'],
  },
  {
    name: 'Azure',
    description: 'OpenAI models on Azure',
    models: ['gpt-4o', 'gpt-4-turbo', 'gpt-35-turbo'],
  },
  {
    name: 'Groq',
    description: 'Ultra-fast inference for open models',
    models: ['llama-3', 'mixtral', 'gemma'],
  },
];

export function Providers() {
  return (
    <section className="py-24 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            One API, many providers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Use any AI provider with a unified interface. Switch models and providers
            without changing your application code.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.map((provider) => (
            <Card key={provider.name} className="hover:bg-accent/50 transition-colors">
              <CardHeader>
                <CardTitle className="text-lg">{provider.name}</CardTitle>
                <CardDescription>{provider.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {provider.models.map((model) => (
                    <span
                      key={model}
                      className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium"
                    >
                      {model}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
