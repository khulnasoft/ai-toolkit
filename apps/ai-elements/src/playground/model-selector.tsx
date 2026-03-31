'use client';

import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  cn,
} from '@ai-toolkit/design-system';

export interface Model {
  id: string;
  name: string;
  provider: string;
  description?: string;
}

export interface ModelSelectorProps {
  models: Model[];
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

const defaultModels: Model[] = [
  { id: 'openai/gpt-4o', name: 'GPT-4o', provider: 'OpenAI', description: 'Most capable model' },
  { id: 'openai/gpt-4o-mini', name: 'GPT-4o Mini', provider: 'OpenAI', description: 'Fast and efficient' },
  { id: 'anthropic/claude-sonnet-4', name: 'Claude Sonnet 4', provider: 'Anthropic', description: 'Balanced performance' },
  { id: 'anthropic/claude-opus-4', name: 'Claude Opus 4', provider: 'Anthropic', description: 'Most intelligent' },
  { id: 'google/gemini-2.5-pro', name: 'Gemini 2.5 Pro', provider: 'Google', description: 'Advanced reasoning' },
  { id: 'google/gemini-2.5-flash', name: 'Gemini 2.5 Flash', provider: 'Google', description: 'Fast responses' },
];

export function ModelSelector({
  models = defaultModels,
  value,
  onValueChange,
  className,
  disabled,
}: ModelSelectorProps) {
  const groupedModels = React.useMemo(() => {
    return models.reduce(
      (acc, model) => {
        if (!acc[model.provider]) {
          acc[model.provider] = [];
        }
        acc[model.provider].push(model);
        return acc;
      },
      {} as Record<string, Model[]>
    );
  }, [models]);

  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className={cn('w-[240px]', className)}>
        <SelectValue placeholder="Select a model" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(groupedModels).map(([provider, providerModels]) => (
          <React.Fragment key={provider}>
            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
              {provider}
            </div>
            {providerModels.map((model) => (
              <SelectItem key={model.id} value={model.id}>
                <div className="flex flex-col">
                  <span>{model.name}</span>
                  {model.description && (
                    <span className="text-xs text-muted-foreground">
                      {model.description}
                    </span>
                  )}
                </div>
              </SelectItem>
            ))}
          </React.Fragment>
        ))}
      </SelectContent>
    </Select>
  );
}
