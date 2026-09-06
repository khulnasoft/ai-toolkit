import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Conversation } from './conversation';
import { Message } from './message';
import type { UIMessage } from 'ai-toolkit';

const assistantMessage: UIMessage = {
  id: 'assistant-1',
  role: 'assistant',
  parts: [{ type: 'text', text: 'Hello there' }],
};

describe('Conversation', () => {
  it('renders messages inside a log region', () => {
    render(
      <Conversation>
        <Message message={assistantMessage} />
      </Conversation>,
    );

    const log = screen.getByRole('log');
    expect(log).toHaveAttribute('data-slot', 'conversation');
    expect(screen.getByText('Hello there')).toBeInTheDocument();
  });

  it('merges class names', () => {
    render(
      <Conversation className="custom-class">
        <Message message={assistantMessage} />
      </Conversation>,
    );

    expect(screen.getByRole('log')).toHaveClass('custom-class');
  });

  it('does not scroll when autoScroll is false', () => {
    const scrollHeightSpy = vi.fn();
    render(
      <Conversation autoScroll={false}>
        <Message message={assistantMessage} />
      </Conversation>,
    );

    expect(scrollHeightSpy).not.toHaveBeenCalled();
    expect(screen.getByRole('log')).toBeInTheDocument();
  });
});
