import {
  createTestServer,
  TestResponseController,
} from '@ai-toolkit/provider-utils/test';
import { MCPClientError } from '../../../errors';
import { WebSocketMCPTransport } from './mcp-websocket-transport';
import { JSONRPCMessage } from './json-rpc-message';

describe('WebSocketMCPTransport', () => {
  const server = createTestServer({
    'ws://localhost:3000/mcp': {
      type: 'websocket',
    },
  });

  let transport: WebSocketMCPTransport;

  beforeEach(() => {
    transport = new WebSocketMCPTransport({
      url: 'ws://localhost:3000/mcp',
    });
  });

  it('should establish WebSocket connection', async () => {
    const connectPromise = transport.start();

    // Simulate WebSocket connection
    const ws = server.urls['ws://localhost:3000/mcp'];
    if (ws && 'controller' in ws) {
      const controller = ws.controller as any;
      controller.connect();
    }

    await connectPromise;
    await transport.close();

    expect(server.calls).toHaveLength(0); // WebSocket doesn't use HTTP calls for connection
  });

  it('should send and receive messages', async () => {
    const connectPromise = transport.start();
    const receivedMessages: JSONRPCMessage[] = [];

    transport.onmessage = message => {
      receivedMessages.push(message);
    };

    // Simulate WebSocket connection
    const ws = server.urls['ws://localhost:3000/mcp'];
    if (ws && 'controller' in ws) {
      const controller = ws.controller as any;
      controller.connect();

      // Wait for connection to be established
      await new Promise(resolve => setTimeout(resolve, 10));

      // Send a test message
      const testMessage = {
        jsonrpc: '2.0',
        id: '1',
        method: 'test',
        params: {},
      };

      controller.message(JSON.stringify(testMessage));
    }

    await connectPromise;

    // Wait for message processing
    await new Promise(resolve => setTimeout(resolve, 10));

    await transport.close();

    expect(receivedMessages).toHaveLength(1);
    expect(receivedMessages[0].method).toBe('test');
  });

  it('should send messages through WebSocket', async () => {
    const connectPromise = transport.start();

    // Simulate WebSocket connection
    const ws = server.urls['ws://localhost:3000/mcp'];
    if (ws && 'controller' in ws) {
      const controller = ws.controller as any;
      controller.connect();
    }

    await connectPromise;

    const testMessage = {
      jsonrpc: '2.0',
      id: '1',
      method: 'test',
      params: {},
    };

    // Mock WebSocket send method to capture sent messages
    const sentMessages: string[] = [];
    if (transport && 'ws' in (transport as any)) {
      const originalSend = (transport as any).ws.send;
      (transport as any).ws.send = (data: string) => {
        sentMessages.push(data);
      };
    }

    await transport.send(testMessage);

    // Restore original send method
    if (transport && 'ws' in (transport as any)) {
      (transport as any).ws.send =
        (transport as any).ws._originalSend || (transport as any).ws.send;
    }

    await transport.close();

    expect(sentMessages).toHaveLength(1);
    const parsedMessage = JSON.parse(sentMessages[0]);
    expect(parsedMessage.method).toBe('test');
  });

  it('should handle connection errors', async () => {
    const errorPromise = new Promise<void>((_, reject) => {
      transport.onerror = error => {
        expect(error).toBeInstanceOf(MCPClientError);
        reject(error);
      };
    });

    // Simulate WebSocket connection error
    const ws = server.urls['ws://localhost:3000/mcp'];
    if (ws && 'controller' in ws) {
      const controller = ws.controller as any;
      controller.error(new Error('Connection failed'));
    }

    await expect(transport.start()).rejects.toThrow();
  });

  it('should handle not connected error when sending', async () => {
    const testMessage = {
      jsonrpc: '2.0',
      id: '1',
      method: 'test',
      params: {},
    };

    await expect(transport.send(testMessage)).rejects.toThrow(
      'MCP WebSocket Transport Error: Not connected',
    );
  });
});
