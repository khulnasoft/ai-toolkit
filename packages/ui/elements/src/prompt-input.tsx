import {
  useState,
  type FormEvent,
  type HTMLAttributes,
  type KeyboardEvent,
} from 'react';
import { cn } from './util/cn';

export interface PromptInputProps
  extends Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  /** Called with the input text on submit. Empty submissions are ignored. */
  onSubmit: (text: string) => void | Promise<void>;
  /** Placeholder for the textarea. */
  placeholder?: string;
  /** Disables the textarea and submit button. */
  disabled?: boolean;
  /** Controlled value. */
  value?: string;
  /** Uncontrolled initial value. */
  defaultValue?: string;
  /** Called on every change in controlled mode. */
  onChange?: (value: string) => void;
  /** Submit button label. Defaults to `"Send"`. */
  submitLabel?: string;
}

function isEmpty(text: string): boolean {
  return text.trim().length === 0;
}

/**
 * Chat input form: textarea with Enter-to-send (Shift+Enter for newlines) and
 * a submit button. Works controlled or uncontrolled. Pair with `sendMessage`
 * from `useChat`:
 *
 * ```tsx
 * const { sendMessage } = useChat();
 * <PromptInput onSubmit={text => sendMessage({ text })} />
 * ```
 */
export function PromptInput({
  onSubmit,
  placeholder = 'Type your message…',
  disabled = false,
  value: controlledValue,
  defaultValue = '',
  onChange,
  submitLabel = 'Send',
  className,
  ...props
}: PromptInputProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue ?? internalValue;

  function handleChange(next: string) {
    if (controlledValue === undefined) {
      setInternalValue(next);
    }
    onChange?.(next);
  }

  function submit() {
    if (disabled || isEmpty(value)) {
      return;
    }
    void onSubmit(value);
    if (controlledValue === undefined) {
      setInternalValue('');
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submit();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  }

  const submittable = !disabled && !isEmpty(value);

  return (
    <form
      {...props}
      data-slot="prompt-input"
      onSubmit={handleSubmit}
      className={cn('flex w-full items-end gap-2', className)}
    >
      <textarea
        data-slot="prompt-input-textarea"
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
        onChange={event => handleChange(event.target.value)}
        onKeyDown={handleKeyDown}
        className="min-h-10 w-full resize-none"
      />
      <button
        data-slot="prompt-input-submit"
        type="submit"
        disabled={!submittable}
        className="shrink-0"
      >
        {submitLabel}
      </button>
    </form>
  );
}
