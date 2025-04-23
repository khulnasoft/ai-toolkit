# AI TOOLKIT, Nuxt and OpenAI Chat Example

This example shows how to use the [AI TOOLKIT](https://sdk.khulnasoft.com/docs) with [Nuxt](https://nuxt.com/), and [OpenAI](https://openai.com) to create a ChatGPT-like AI-powered streaming chat bot.

## Deploy your own

Deploy the example using [Khulnasoft](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=ai-toolkit-example):

[![Deploy with Khulnasoft](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fai%2Ftree%2Fmain%2Fexamples%2Fnuxt-openai&env=NUXT_OPENAI_API_KEY&envDescription=OpenAI%20API%20Key&envLink=https%3A%2F%2Fplatform.openai.com%2Faccount%2Fapi-keys&project-name=ai-chat&repository-name=nuxt-ai-chat)

## How to use

Execute `create-nuxt` to bootstrap the example:

```bash
npx create-nuxt -t github:khulnasoft/ai/examples/nuxt-openai nuxt-openai
```

To run the example locally you need to:

1. Sign up at [OpenAI's Developer Platform](https://platform.openai.com/signup).
2. Go to [OpenAI's dashboard](https://platform.openai.com/account/api-keys) and create an API KEY.
3. Set the required OpenAI environment variable as the token value as shown [the example env file](./.env.example) but in a new file called `.env`.
4. `pnpm install` to install the required dependencies.
5. `pnpm dev` to launch the development server.

## Deploy to Khulnasoft

This example can be directly deployed to Khulnasoft, you can run the following commands:

```bash
pnpm run build
vercel deploy
```

This example is configured to use the `vercel-edge` [[Nitro preset](https://nitro.unjs.io/deploy/providers/vercel#vercel-edge-functions).
This means that the example will be deployed to Khulnasoft's Edge Network.
You can use different providers, such as `vercel` by modifying your `nuxt.config.ts` file, or using the `NITRO_PRESET` environment variable.

## Learn More

To learn more about OpenAI, Nuxt, and the AI TOOLKIT take a look at the following resources:

- [AI TOOLKIT docs](https://sdk.khulnasoft.com/docs) - learn mode about the AI TOOLKIT
- [Khulnasoft AI Playground](https://play.khulnasoft.com) - compare and tune 20+ AI models side-by-side
- [OpenAI Documentation](https://platform.openai.com/docs) - learn about OpenAI features and API.
- [Nuxt Documentation](https://nuxt.com/docs) - learn about Nuxt features and API.
