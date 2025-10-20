import { MCPClientError } from '../../../errors';
import { JSONRPCMessage, JSONRPCMessageSchema } from './json-rpc-message';
import { MCPTransport } from './mcp-transport';

export class WebSocketMCPTransport implements MCPTransport {
  private url: URL;
  private ws: WebSocket | null = null;
  private connected = false;
  private headers?: Record<string, string>;

  onclose?: () => void;
  onerror?: (error: Error) => void;
  onmessage?: (message: JSONRPCMessage) => void;

  constructor({
    url,
    headers,
  }: {
    url: string;
    headers?: Record<string, string>;
  }) {
    this.url = new URL(url);
    this.headers = headers;
  }

  async start(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.connected) {
        return resolve();
      }

      try {
        // Convert WebSocket URL if needed (ws:// or wss://)
        const wsUrl =
          this.url.protocol === 'https:'
            ? `wss://${this.url.host}${this.url.pathname}${this.url.search}`
            : `ws://${this.url.host}${this.url.pathname}${this.url.search}`;

        this.ws = new WebSocket(wsUrl);

        this.ws.onopen = () => {
          this.connected = true;
          resolve();
        };

        this.ws.onmessage = event => {
          try {
            const message = JSONRPCMessageSchema.parse(JSON.parse(event.data));
            this.onmessage?.(message);
          } catch (error) {
            const e = new MCPClientError({
              message: 'MCP WebSocket Transport Error: Failed to parse message',
              cause: error,
            });
            this.onerror?.(e);
          }
        };

        this.ws.onerror = event => {
          const error = new MCPClientError({
            message:
              'MCP WebSocket Transport Error: WebSocket connection failed',
          });
          this.onerror?.(error);
          reject(error);
        };

        this.ws.onclose = () => {
          this.connected = false;
          this.onclose?.();
        };
      } catch (error) {
        this.onerror?.(error as Error);
        reject(error);
      }
    });
  }

  async close(): Promise<void> {
    this.connected = false;
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.onclose?.();
  }

  async send(message: JSONRPCMessage): Promise<void> {
    if (!this.ws || !this.connected) {
      throw new MCPClientError({
        message: 'MCP WebSocket Transport Error: Not connected',
      });
    }

    try {
      this.ws.send(JSON.stringify(message));
    } catch (error) {
      const e = new MCPClientError({
        message: 'MCP WebSocket Transport Error: Failed to send message',
        cause: error,
      });
      this.onerror?.(e);
      throw e;
    }
  }
}
