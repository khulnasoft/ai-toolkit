# AI Toolkit Playground

An interactive web-based playground for experimenting with AI models and providers using the Vercel AI Toolkit.

## Features

- **Multi-Provider Support**: Test different AI providers (OpenAI, Anthropic, Google, Groq, Mistral, etc.)
- **Real-time Streaming**: Experience streaming responses from AI models
- **Code Generation**: Generate and edit code with AI assistance
- **Interactive Chat**: Conversational interface with various AI models
- **Example Templates**: Pre-built examples for common use cases
- **Provider Comparison**: Compare responses across different models
- **API Key Management**: Secure management of API keys

## Getting Started

1. **Install dependencies**:

   ```bash
   pnpm install
   ```

2. **Set up environment variables**:

   ```bash
   cp .env.example .env.local
   ```

   Add your API keys to `.env.local`:

   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ANTHROPIC_API_KEY=your_anthropic_api_key_here
   GOOGLE_GENERATIVE_AI_API_KEY=your_google_api_key_here
   # ... other API keys
   ```

3. **Run the development server**:

   ```bash
   pnpm dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## Available Providers

The playground supports the following AI providers:

- **OpenAI** - GPT-3.5, GPT-4, GPT-4 Turbo
- **Anthropic** - Claude 3 Opus, Sonnet, Haiku
- **Google** - Gemini Pro, Gemini Pro Vision
- **Groq** - Llama 2, Mixtral
- **Mistral** - Mistral 7B, Mixtral 8x7B
- **Cohere** - Command, Command R
- **Perplexity** - Sonar, Sonar Large
- **xAI** - Grok
- **Fireworks** - FireLLaMA, Mixtral
- **DeepSeek** - DeepSeek Coder

## Usage

### Chat Interface

1. Select your preferred AI provider and model from the sidebar
2. Type your message in the chat interface
3. Receive streaming responses in real-time
4. Compare responses across different models

### Code Generation

1. Choose a code generation template or write a custom prompt
2. Select the appropriate model for code generation
3. Generate and edit code with AI assistance
4. Export generated code to your project

### Examples

Browse through pre-built examples including:

- Text generation and completion
- Code generation and explanation
- Data analysis and visualization
- Creative writing and storytelling
- Translation and language tasks

## Development

### Project Structure

```
playground/
├── app/                    # Next.js app router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   └── ui/               # Reusable UI components
├── lib/                  # Utility functions
├── hooks/                # Custom React hooks
└── types/                # TypeScript type definitions
```

### Adding New Providers

1. Install the provider package:

   ```bash
   pnpm add @ai-toolkit/new-provider
   ```

2. Update the provider configuration in `lib/providers.ts`

3. Add the provider to the UI in `components/provider-selector.tsx`

### Building

```bash
pnpm build
```

### Linting

```bash
pnpm lint
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the Apache License - see the LICENSE file for details.
