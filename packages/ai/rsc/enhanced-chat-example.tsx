/**
 * Enhanced RSC Chat Application Example
 *
 * This example demonstrates the advanced features of the AI RSC implementation:
 * - Error handling with proper error boundaries
 * - Enhanced streaming with progress tracking
 * - Optimistic updates and loading states
 * - Rate limiting and authentication
 * - Analytics and caching
 */

import { createAI } from 'ai/rsc';
import { openai } from '@ai-toolkit/openai';
import { z } from 'zod';
import {
  withErrorHandling,
  createSafeAction,
  createEnhancedStreamableValue,
  withStreamProgress,
  withOptimisticUpdates,
  LoadingStateManager,
  AIActionError,
  AIAuthenticationError,
  AIRateLimitError,
} from 'ai/rsc';
import { generateId } from 'ai';

// Types
type Message = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
};

type ChatState = {
  messages: Message[];
  isTyping: boolean;
  error?: string;
};

type UIState = {
  id: string;
  display: React.ReactNode;
}[];

// Loading state manager for the chat
const loadingManager = new LoadingStateManager();

// Mock authentication check
async function checkAuth(): Promise<string> {
  // In a real app, this would check for a valid session
  const userId = 'user_123';
  if (!userId) {
    throw new AIAuthenticationError('Please log in to continue');
  }
  return userId;
}

// Mock rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

async function checkRateLimit(userId: string): Promise<void> {
  const now = Date.now();
  const windowMs = 60000; // 1 minute window
  const maxRequests = 10;

  const userLimit = rateLimitMap.get(userId);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(userId, { count: 1, resetTime: now + windowMs });
    return;
  }

  if (userLimit.count >= maxRequests) {
    throw new AIRateLimitError(
      'Too many messages. Please wait before sending another.',
    );
  }

  userLimit.count++;
  rateLimitMap.set(userId, userLimit);
}

// Enhanced message submission with all safety features
export const submitMessage = withErrorHandling(
  createSafeAction(
    withOptimisticUpdates(
      async (content: string) => {
        'use server';

        // Authentication check
        const userId = await checkAuth();

        // Rate limiting check
        await checkRateLimit(userId);

        const { getMutableAIState } = await import('ai/rsc');
        const aiState = getMutableAIState();

        // Create optimistic message
        const optimisticMessage: Message = {
          id: `temp_${Date.now()}`,
          role: 'user',
          content,
          timestamp: Date.now(),
        };

        // Update state with optimistic message
        aiState.update({
          ...aiState.get(),
          messages: [...aiState.get().messages, optimisticMessage],
          isTyping: true,
        });

        // Generate AI response with enhanced streaming
        const result = await streamUI({
          model: openai('gpt-4'),
          initial: <div className="typing">AI is thinking...</div>,
          system: 'You are a helpful assistant.',
          messages: [
            ...aiState
              .get()
              .messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content },
          ],
          text: withStreamProgress(
            async function* ({ content, done }) {
              if (done) {
                // Final message
                const finalMessage: Message = {
                  id: generateId(),
                  role: 'assistant',
                  content,
                  timestamp: Date.now(),
                };

                aiState.update({
                  ...aiState.get(),
                  messages: [
                    ...aiState
                      .get()
                      .messages.filter(m => !m.id.startsWith('temp_')),
                    finalMessage,
                  ],
                  isTyping: false,
                });

                yield <div className="message assistant">{content}</div>;
              } else {
                // Streaming chunks
                yield (
                  <div className="message assistant streaming">{content}</div>
                );
              }
            },
            {
              onProgress: progress => {
                // Update typing indicator progress
                aiState.update({
                  ...aiState.get(),
                  typingProgress: progress,
                });
              },
            },
          ),
          tools: {
            get_weather: {
              description: 'Get current weather',
              parameters: z.object({
                location: z.string(),
              }),
              generate: async function* ({ location }) {
                yield (
                  <div className="tool-loading">
                    Getting weather for {location}...
                  </div>
                );

                // Mock weather data
                await new Promise(resolve => setTimeout(resolve, 1000));
                const weather = { temperature: '72°F', condition: 'sunny' };

                yield (
                  <div className="weather-result">
                    Weather in {location}: {weather.temperature},{' '}
                    {weather.condition}
                  </div>
                );
              },
            },
          },
          onFinish: event => {
            // Analytics tracking
            console.log('Message completed:', {
              userId,
              messageLength: content.length,
              responseLength: event.usage?.totalTokens || 0,
              duration: Date.now() - Date.now(), // Would need to track start time
            });
          },
        });

        return {
          id: generateId(),
          display: result.value,
          optimisticMessage,
        };
      },
      {
        generateOptimisticData: (content: string) => ({
          messages: [], // Will be filled by optimistic update
          isTyping: true,
        }),
        onError: (error, actionId) => {
          console.error('Chat error:', error);
          loadingManager.setError(actionId, error);
        },
        onSuccess: (result, actionId) => {
          loadingManager.setSuccess(actionId, result);
        },
      },
    ),
    {
      timeout: 30000,
      retries: 2,
      retryDelay: 1000,
      onRetry: (error, attempt) => {
        console.warn(`Retrying message (attempt ${attempt}):`, error.message);
      },
    },
  ),
  {
    logErrors: true,
    includeStackTrace: process.env.NODE_ENV === 'development',
    transformError: error => {
      // Transform errors for user-friendly messages
      if (error instanceof AIActionError) {
        return error;
      }
      return new AIActionError(
        'Something went wrong. Please try again.',
        'UNKNOWN_ERROR',
        500,
        error,
      );
    },
  },
);

// Create the AI provider with enhanced error handling
export const AI = createAI<ChatState, UIState>({
  actions: {
    submitMessage,
  },
  initialAIState: {
    messages: [],
    isTyping: false,
  },
  initialUIState: [],
  onSetAIState: async ({ state }) => {
    // Persist state to database or cache
    console.log('Saving AI state:', state);
  },
});

// Enhanced client-side chat component
('use client');

import { useAI, useActions } from 'ai/rsc';
import { useState, useCallback } from 'react';
import { useLoadingState } from 'ai/rsc';

export default function EnhancedChat() {
  const { messages, isTyping } = useAI();
  const { submitMessage } = useActions();
  const [input, setInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadingState = useLoadingState('submitMessage');

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim() || isSubmitting || loadingState.isLoading) return;

      setIsSubmitting(true);
      try {
        await submitMessage(input);
        setInput('');
      } catch (error) {
        console.error('Failed to send message:', error);
        // Error is already handled by the action wrapper
      } finally {
        setIsSubmitting(false);
      }
    },
    [input, isSubmitting, loadingState.isLoading, submitMessage],
  );

  return (
    <div className="enhanced-chat">
      <div className="messages">
        {messages.map(message => (
          <div key={message.id} className={`message ${message.role}`}>
            <div className="content">{message.content}</div>
            <div className="timestamp">
              {new Date(message.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="typing-indicator">
            <div className="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span>AI is typing...</span>
          </div>
        )}
      </div>

      {loadingState.error && (
        <div className="error-banner">
          <div className="error-icon">⚠️</div>
          <div className="error-message">{loadingState.error.message}</div>
          <button
            onClick={() => loadingState.clear?.()}
            className="error-dismiss"
          >
            ✕
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isSubmitting || loadingState.isLoading}
          className="message-input"
        />

        <button
          type="submit"
          disabled={!input.trim() || isSubmitting || loadingState.isLoading}
          className="send-button"
        >
          {isSubmitting || loadingState.isLoading ? (
            <div className="loading-spinner"></div>
          ) : (
            'Send'
          )}
        </button>
      </form>

      <div className="chat-status">
        {isSubmitting && <span>Sending...</span>}
        {loadingState.isLoading && <span>Processing...</span>}
      </div>
    </div>
  );
}

// Error boundary component
export class ChatErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Chat error boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage example with error boundary
export function ChatWithErrorBoundary() {
  return (
    <ChatErrorBoundary>
      <AI initialUIState={[]}>
        <EnhancedChat />
      </AI>
    </ChatErrorBoundary>
  );
}
