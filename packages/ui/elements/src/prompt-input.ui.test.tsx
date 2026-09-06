import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { PromptInput } from './prompt-input';

describe('PromptInput', () => {
  it('submits typed text and clears the input', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<PromptInput onSubmit={onSubmit} />);

    const textarea = screen.getByPlaceholderText('Type your message…');
    await user.type(textarea, 'Hello AI');
    await user.click(screen.getByRole('button', { name: 'Send' }));

    expect(onSubmit).toHaveBeenCalledWith('Hello AI');
    expect(textarea).toHaveValue('');
  });

  it('submits with Enter and inserts newline with Shift+Enter', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<PromptInput onSubmit={onSubmit} />);

    const textarea = screen.getByPlaceholderText('Type your message…');
    await user.type(textarea, 'line');
    await user.keyboard('{Shift>}{Enter}{/Shift}');
    expect(textarea).toHaveValue('line\n');
    expect(onSubmit).not.toHaveBeenCalled();

    await user.keyboard('{Enter}');
    expect(onSubmit).toHaveBeenCalledWith('line\n');
  });

  it('ignores empty submissions and respects disabled', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const { rerender } = render(<PromptInput onSubmit={onSubmit} />);

    await user.click(screen.getByRole('button', { name: 'Send' }));
    expect(onSubmit).not.toHaveBeenCalled();

    rerender(<PromptInput onSubmit={onSubmit} disabled />);
    expect(screen.getByRole('button', { name: 'Send' })).toBeDisabled();
  });

  it('supports controlled mode', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const onChange = vi.fn();
    render(<PromptInput onSubmit={onSubmit} value="fixed" onChange={onChange} />);

    await user.type(screen.getByPlaceholderText('Type your message…'), '!');
    expect(onChange).toHaveBeenCalledWith('fixed!');
    expect(screen.getByPlaceholderText('Type your message…')).toHaveValue('fixed');
  });
});
