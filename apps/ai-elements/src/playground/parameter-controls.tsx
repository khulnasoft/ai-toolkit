'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  cn,
} from '@ai-toolkit/design-system';

export interface ParameterControlsProps {
  temperature: number;
  onTemperatureChange: (value: number) => void;
  maxTokens: number;
  onMaxTokensChange: (value: number) => void;
  topP: number;
  onTopPChange: (value: number) => void;
  className?: string;
  disabled?: boolean;
}

interface SliderRowProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  disabled?: boolean;
}

function SliderRow({
  label,
  value,
  onChange,
  min,
  max,
  step,
  disabled,
}: SliderRowProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">{label}</label>
        <span className="text-sm text-muted-foreground">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        disabled={disabled}
        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
      />
    </div>
  );
}

export function ParameterControls({
  temperature,
  onTemperatureChange,
  maxTokens,
  onMaxTokensChange,
  topP,
  onTopPChange,
  className,
  disabled,
}: ParameterControlsProps) {
  return (
    <Card className={cn('', className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Parameters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <SliderRow
          label="Temperature"
          value={temperature}
          onChange={onTemperatureChange}
          min={0}
          max={2}
          step={0.1}
          disabled={disabled}
        />
        <SliderRow
          label="Top P"
          value={topP}
          onChange={onTopPChange}
          min={0}
          max={1}
          step={0.1}
          disabled={disabled}
        />
        <div className="space-y-2">
          <label className="text-sm font-medium">Max Tokens</label>
          <Input
            type="number"
            value={maxTokens}
            onChange={(e) => onMaxTokensChange(parseInt(e.target.value, 10) || 0)}
            min={1}
            max={128000}
            disabled={disabled}
          />
        </div>
      </CardContent>
    </Card>
  );
}
