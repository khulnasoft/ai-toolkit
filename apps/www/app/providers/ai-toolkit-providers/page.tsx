import { ProviderBrowser } from '@/components/provider-browser';
import { SectionHeader } from '@/components/section-header';
import { getProviders } from '@/lib/providers';

export const metadata = {
  title: 'AI Toolkit Providers',
};

export default function ProvidersPage() {
  const providers = getProviders();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 lg:px-6">
      <SectionHeader
        eyebrow="AI TOOLKIT PROVIDERS"
        title="First-party providers."
        description="Model providers maintained by the AI TOOLKIT team. Connect to OpenAI, Anthropic, Google, Amazon Bedrock, and more with a single consistent interface."
      />
      <div className="mt-10">
        <ProviderBrowser providers={providers} />
      </div>
    </div>
  );
}