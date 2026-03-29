import { ReasoningPart, ReasoningFilePart } from '@ai-toolkit/provider-utils';

export function asReasoningText(
  reasoningParts: Array<ReasoningPart | ReasoningFilePart>,
): string | undefined {
  const reasoningText = reasoningParts
    .map(part => ('text' in part ? part.text : ''))
    .join('');
  return reasoningText.length > 0 ? reasoningText : undefined;
}
