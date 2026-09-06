import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Message } from './message';
import type { UIMessage } from 'ai-toolkit';

const userMessage: UIMessage = {
  id: 'user-1',
  role: 'user',
  parts: [{ type: 'text', text: 'What is the weather?' }],
};

const assistantMessage: UIMessage = {
  id: 'assistant-1',
  role: 'assistant',
  parts: [
    { type: 'reasoning', text: 'Let me think' },
    { type: 'text', text: 'It is sunny' },
    {
      type: 'dynamic-tool',
      toolName: 'getWeather',
      toolCallId: 'call-1',
      state: 'output-available',
      input: { city: 'Oslo' },
      output: 'sunny',
    },
  ],
};

describe('Message', () => {
  it('renders user text aligned right', () => {
    render(<Message message={userMessage} />);

    const message = screen.getByText('What is the weather?').closest('[data-slot="message"]');
    expect(message).toHaveAttribute('data-role', 'user');
    expect(message).toHaveClass('flex-row-reverse');
  });

  it('renders assistant text, reasoning, and tool summaries', () => {
    render(<Message message={assistantMessage} />);

    expect(screen.getByText('It is sunny')).toBeInTheDocument();
    expect(screen.getByText('Let me think')).toBeInTheDocument();
    const tool = screen.getByText('Tool call: getWeather');
    expect(tool.closest('[data-slot="message-tool"]')).toHaveAttribute(
      'data-state',
      'output-available',
    );
  });

  it('renders static tool invocations by name', () => {
    render(
      <Message
        message={{
          id: 'assistant-2',
          role: 'assistant',
          parts: [
            {
              type: 'tool-search',
              toolCallId: 'call-2',
              state: 'input-available',
              input: { query: 'x' },
            },
          ],
        }}
      />,
    );

    expect(screen.getByText('Tool call: search')).toBeInTheDocument();
  });

  it('supports avatar and part overrides', () => {
    render(
      <Message
        message={userMessage}
        avatar={<span>avatar</span>}
        renderPart={part => (part.type === 'text' ? <>overridden</> : undefined)}
      />,
    );

    expect(screen.getByText('avatar')).toBeInTheDocument();
    expect(screen.getByText('overridden')).toBeInTheDocument();
    expect(screen.queryByText('What is the weather?')).not.toBeInTheDocument();
  });
});
