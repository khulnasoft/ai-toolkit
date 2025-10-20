# Enhanced React Server Components (RSC) for AI Toolkit

This document outlines the enhanced React Server Components implementation for the AI Toolkit, providing advanced features for building robust AI-powered applications.

## 🚀 Features

- **Enhanced Error Handling**: Comprehensive error management with custom error types and recovery strategies
- **Advanced Streaming**: Progress tracking, debouncing, and enhanced streaming utilities
- **Optimistic Updates**: Seamless optimistic UI updates with rollback capabilities
- **Loading States**: Advanced loading state management for better UX
- **Rate Limiting**: Built-in rate limiting for API protection
- **Authentication**: Integrated authentication checks
- **Analytics**: Usage tracking and performance monitoring
- **Caching**: State persistence and caching strategies

## 📦 Installation

```bash
npm install ai
```

## 🛠️ Core Concepts

### 1. Error Handling

The enhanced RSC implementation provides several error types for better error management:

```typescript
import {
  AIActionError,
  AIAuthenticationError,
  AIRateLimitError,
  AIValidationError,
  withErrorHandling,
  createSafeAction,
} from 'ai/rsc';

// Custom error types
throw new AIAuthenticationError('Please log in to continue');
throw new AIRateLimitError('Too many requests. Please wait.');
throw new AIValidationError('Invalid input', {
  field: ['This field is required'],
});

// Wrap actions with error handling
export const safeAction = withErrorHandling(
  async (input: string) => {
    // Your action logic here
    return result;
  },
  {
    logErrors: true,
    includeStackTrace: process.env.NODE_ENV === 'development',
  },
);

// Create safe actions with retries and timeouts
export const resilientAction = createSafeAction(
  async (input: string) => {
    // Your action logic here
    return result;
  },
  {
    timeout: 30000,
    retries: 2,
    retryDelay: 1000,
  },
);
```

### 2. Enhanced Streaming

Advanced streaming utilities with progress tracking and error recovery:

```typescript
import {
  createEnhancedStreamableValue,
  withStreamProgress,
  createDebouncedStream,
} from 'ai/rsc';

// Enhanced streamable value with progress tracking
const stream = createEnhancedStreamableValue<string>('');

// Stream with progress callbacks
const result = await streamUI({
  model: openai('gpt-4'),
  text: withStreamProgress(
    async function* ({ content, done }) {
      if (done) {
        stream.done(content);
        yield <div>{content}</div>;
      } else {
        stream.append(content);
        yield <div>{content}</div>;
      }
    },
    {
      onProgress: (progress) => {
        console.log(`Streaming progress: ${progress}%`);
      },
      onError: (error) => {
        console.error('Streaming error:', error);
        stream.error(error);
      },
    }
  ),
});

// Debounced streaming for better performance
const debouncedStream = createDebouncedStream(stream, 100); // 100ms debounce
debouncedStream.append('Hello '); // Won't update UI immediately
debouncedStream.append('World!'); // Updates UI after 100ms with combined content
```

### 3. Optimistic Updates

Seamless optimistic updates with automatic rollback on errors:

```typescript
import {
  withOptimisticUpdates,
  LoadingStateManager,
  useLoadingState,
} from 'ai/rsc';

// Wrap actions with optimistic updates
export const submitMessage = withOptimisticUpdates(
  async (content: string) => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
    return response.json();
  },
  {
    generateOptimisticData: (content: string) => ({
      id: `temp_${Date.now()}`,
      content,
      status: 'sending',
    }),
    onError: (error, actionId) => {
      console.error('Message failed:', error);
    },
    onSuccess: (result, actionId) => {
      console.log('Message sent:', result);
    },
  }
);

// Client-side loading state management
function ChatComponent() {
  const loadingState = useLoadingState('submitMessage');

  return (
    <div>
      {loadingState.isLoading && <div>Sending message...</div>}
      {loadingState.error && <div>Error: {loadingState.error.message}</div>}
      {loadingState.data && <div>Message sent: {loadingState.data.content}</div>}
    </div>
  );
}
```

### 4. Loading States

Advanced loading state management for better user experience:

```typescript
import {
  LoadingStateManager,
  OptimisticUpdateManager,
  createLoadingUI,
} from 'ai/rsc';

// Server-side loading state management
const loadingManager = new LoadingStateManager();

export async function submitForm(data: FormData) {
  'use server';

  const actionId = `form_${Date.now()}`;

  try {
    loadingManager.setLoading(actionId, { status: 'processing' });

    // Process form data
    const result = await processForm(data);

    loadingManager.setSuccess(actionId, result);
    return result;
  } catch (error) {
    loadingManager.setError(actionId, error as Error);
    throw error;
  }
}

// Client-side loading UI
const LoadingUI = createLoadingUI(
  (data) => <div>Processing... {data?.status}</div>,
  (error) => <div>Error: {error.message}</div>,
  (data) => <div>Success! {JSON.stringify(data)}</div>
);

function FormComponent() {
  const actionId = 'form_submit';

  return (
    <div>
      <form action={submitForm}>
        <input name="email" type="email" />
        <button type="submit">Submit</button>
      </form>

      {LoadingUI(actionId)}
    </div>
  );
}
```

## 🎯 Complete Example

Here's a complete example showing all features working together:

```tsx
// app/ai-provider.tsx
'use client';

import { createAI } from 'ai/rsc';
import { AIState, submitUserMessage, UIState } from './actions';

export const { AIProvider, useAI, useActions } = createAI<AIState, UIState>({
  actions: { submitUserMessage },
  initialAIState: { chatId: generateId(), messages: [] },
  initialUIState: [],
});
```

```tsx
// app/actions.tsx
import {
  withErrorHandling,
  createSafeAction,
  withOptimisticUpdates,
  AIActionError,
  AIAuthenticationError,
  AIRateLimitError,
} from 'ai/rsc';
import { openai } from '@ai-toolkit/openai';
import { streamUI } from 'ai/rsc';

async function checkAuth() {
  const userId = await getCurrentUser();
  if (!userId) throw new AIAuthenticationError('Not authenticated');
  return userId;
}

async function checkRateLimit(userId: string) {
  const rateLimit = await getRateLimit(userId);
  if (rateLimit.exceeded) {
    throw new AIRateLimitError('Rate limit exceeded');
  }
}

export const submitUserMessage = withErrorHandling(
  createSafeAction(
    withOptimisticUpdates(
      async (content: string) => {
        'use server';

        const userId = await checkAuth();
        await checkRateLimit(userId);

        const { getMutableAIState } = await import('ai/rsc');
        const aiState = getMutableAIState();

        // Add optimistic user message
        const optimisticMessage = {
          id: `temp_${Date.now()}`,
          role: 'user',
          content,
        };

        aiState.update({
          ...aiState.get(),
          messages: [...aiState.get().messages, optimisticMessage],
        });

        // Generate response
        const result = await streamUI({
          model: openai('gpt-4'),
          messages: [
            ...aiState
              .get()
              .messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content },
          ],
          text: ({ content, done }) => {
            if (done) {
              aiState.update({
                ...aiState.get(),
                messages: [
                  ...aiState
                    .get()
                    .messages.filter(m => !m.id.startsWith('temp_')),
                  { id: generateId(), role: 'assistant', content },
                ],
              });
            }
            return <div>{content}</div>;
          },
        });

        return {
          id: generateId(),
          display: result.value,
        };
      },
      {
        generateOptimisticData: (content: string) => ({
          messages: [], // Will be populated by optimistic update
        }),
      },
    ),
    {
      timeout: 30000,
      retries: 2,
    },
  ),
  {
    logErrors: true,
  },
);
```

```tsx
// app/page.tsx
'use client';

import { useAI, useActions } from './ai-provider';
import { useState } from 'react';
import { useLoadingState } from 'ai/rsc';

export default function Chat() {
  const { messages } = useAI();
  const { submitUserMessage } = useActions();
  const [input, setInput] = useState('');
  const loadingState = useLoadingState('submitUserMessage');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      await submitUserMessage(input);
      setInput('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className="chat">
      <div className="messages">
        {messages.map(message => (
          <div key={message.id} className={`message ${message.role}`}>
            {message.content}
          </div>
        ))}
      </div>

      {loadingState.error && (
        <div className="error">{loadingState.error.message}</div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
          disabled={loadingState.isLoading}
        />
        <button type="submit" disabled={loadingState.isLoading}>
          {loadingState.isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}
```

## 🔧 Configuration Options

### Error Handling Options

```typescript
withErrorHandling(action, {
  logErrors: true, // Log errors to console
  includeStackTrace: false, // Include stack trace in logs
  transformError: error => error, // Transform errors before throwing
});
```

### Safe Action Options

```typescript
createSafeAction(action, {
  timeout: 30000, // Request timeout in milliseconds
  retries: 2, // Number of retry attempts
  retryDelay: 1000, // Delay between retries
  onRetry: (error, attempt) => {}, // Callback on retry
});
```

### Optimistic Updates Options

```typescript
withOptimisticUpdates(action, {
  generateOptimisticData: args => ({}), // Generate optimistic data
  onError: (error, actionId) => {}, // Handle errors
  onSuccess: (result, actionId) => {}, // Handle success
  rollbackOnError: true, // Auto-rollback on error
});
```

## 🎨 Styling Example

```css
/* Chat styles */
.chat {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.messages {
  height: 400px;
  overflow-y: auto;
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 20px;
}

.message {
  margin-bottom: 10px;
  padding: 8px 12px;
  border-radius: 8px;
}

.message.user {
  background-color: #007bff;
  color: white;
  margin-left: auto;
  max-width: 70%;
}

.message.assistant {
  background-color: #f1f1f1;
  max-width: 70%;
}

.error {
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 10px;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
```

## 🚨 Error Handling Best Practices

1. **Use specific error types** for different error scenarios
2. **Provide user-friendly error messages** in production
3. **Log detailed errors** in development for debugging
4. **Implement proper retry logic** for transient failures
5. **Handle timeouts gracefully** for long-running operations

## 📊 Performance Considerations

1. **Debounce rapid updates** to avoid overwhelming the UI
2. **Use optimistic updates** for better perceived performance
3. **Implement proper caching** for frequently accessed data
4. **Monitor streaming progress** to provide user feedback
5. **Handle memory efficiently** when dealing with large datasets

## 🔒 Security Considerations

1. **Validate all inputs** before processing
2. **Implement rate limiting** to prevent abuse
3. **Check authentication** for all sensitive operations
4. **Sanitize error messages** to avoid information leakage
5. **Use proper session management** for stateful operations

## 📈 Monitoring and Analytics

```typescript
// Track usage patterns
export const submitMessage = withErrorHandling(async (content: string) => {
  const startTime = Date.now();

  try {
    const result = await processMessage(content);

    // Track successful completion
    analytics.track('message_sent', {
      duration: Date.now() - startTime,
      messageLength: content.length,
    });

    return result;
  } catch (error) {
    // Track errors
    analytics.track('message_error', {
      error: error.message,
      duration: Date.now() - startTime,
    });

    throw error;
  }
});
```

This enhanced RSC implementation provides a solid foundation for building production-ready AI applications with excellent error handling, performance, and user experience.
