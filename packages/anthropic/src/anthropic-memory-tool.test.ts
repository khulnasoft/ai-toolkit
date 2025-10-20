import { memoryTool } from './anthropic-tools';

describe('memoryTool', () => {
  it('should create a memory tool with correct structure', () => {
    const tool = memoryTool();

    expect(tool.type).toBe('provider-defined');
    expect(tool.id).toBe('anthropic.memory');
    expect(tool.args).toEqual({});
    expect(tool.parameters).toBeDefined();
    expect(tool.execute).toBeUndefined();
  });

  it('should accept execute function', () => {
    const executeFn = jest.fn();
    const tool = memoryTool({ execute: executeFn });

    expect(tool.execute).toBe(executeFn);
  });

  it('should accept experimental_toToolResultContent function', () => {
    const toToolResultContentFn = jest.fn();
    const tool = memoryTool({
      experimental_toToolResultContent: toToolResultContentFn,
    });

    expect(tool.experimental_toToolResultContent).toBe(toToolResultContentFn);
  });

  it('should have correct parameter schema', () => {
    const tool = memoryTool();
    const schema = tool.parameters;

    // Test that the schema accepts valid parameters
    const validParams1 = {
      action: 'store',
      key: 'test-key',
      value: 'test-value',
    };

    const validParams2 = {
      action: 'retrieve',
      key: 'test-key',
    };

    const validParams3 = {
      action: 'list',
    };

    const validParams4 = {
      action: 'delete',
      key: 'test-key',
    };

    // Test that the schema accepts all valid parameter combinations
    expect(() => schema.parse(validParams1)).not.toThrow();
    expect(() => schema.parse(validParams2)).not.toThrow();
    expect(() => schema.parse(validParams3)).not.toThrow();
    expect(() => schema.parse(validParams4)).not.toThrow();
  });

  it('should reject invalid action', () => {
    const tool = memoryTool();
    const schema = tool.parameters;

    const invalidParams = {
      action: 'invalid-action',
      key: 'test-key',
    };

    expect(() => schema.parse(invalidParams)).toThrow();
  });

  it('should require key for store action', () => {
    const tool = memoryTool();
    const schema = tool.parameters;

    const invalidParams = {
      action: 'store',
      value: 'test-value',
    };

    expect(() => schema.parse(invalidParams)).toThrow();
  });

  it('should require key for retrieve action', () => {
    const tool = memoryTool();
    const schema = tool.parameters;

    const invalidParams = {
      action: 'retrieve',
    };

    expect(() => schema.parse(invalidParams)).toThrow();
  });

  it('should require key for delete action', () => {
    const tool = memoryTool();
    const schema = tool.parameters;

    const invalidParams = {
      action: 'delete',
    };

    expect(() => schema.parse(invalidParams)).toThrow();
  });

  it('should require value for store action', () => {
    const tool = memoryTool();
    const schema = tool.parameters;

    const invalidParams = {
      action: 'store',
      key: 'test-key',
    };

    expect(() => schema.parse(invalidParams)).toThrow();
  });

  it('should accept optional key and value for list action', () => {
    const tool = memoryTool();
    const schema = tool.parameters;

    const validParams = {
      action: 'list',
    };

    expect(() => schema.parse(validParams)).not.toThrow();
  });
});
