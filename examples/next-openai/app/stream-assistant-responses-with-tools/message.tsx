'use client';

import { StreamableValue, useStreamableValue } from 'ai-toolkit/rsc';

export function Message({ textStream }: { textStream: StreamableValue }) {
  const [text] = useStreamableValue(textStream);

  return <div>{text}</div>;
}
