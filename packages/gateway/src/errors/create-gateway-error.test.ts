import { describe, expect, it } from 'vitest';
import { asGatewayError, GatewayError } from './as-gateway-error';

describe('asGatewayError', () => {
  it('should return the same GatewayError instance', () => {
    const error = new GatewayError('test error');
    const result = asGatewayError(error);
    
    expect(result).toBe(error);
    expect(result.message).toBe('test error');
    expect(result.name).toBe('GatewayError');
  });

  it('should convert Error to GatewayError', () => {
    const error = new Error('regular error');
    const result = asGatewayError(error);
    
    expect(result).toBeInstanceOf(GatewayError);
    expect(result.message).toBe('regular error');
    expect(result.name).toBe('GatewayError');
    expect(result.cause).toBe(error);
  });

  it('should convert string to GatewayError', () => {
    const error = 'string error';
    const result = asGatewayError(error);
    
    expect(result).toBeInstanceOf(GatewayError);
    expect(result.message).toBe('string error');
    expect(result.name).toBe('GatewayError');
    expect(result.cause).toBeUndefined();
  });

  it('should convert unknown object to GatewayError', () => {
    const error = { some: 'object' };
    const result = asGatewayError(error);
    
    expect(result).toBeInstanceOf(GatewayError);
    expect(result.message).toBe('An unknown error occurred');
    expect(result.name).toBe('GatewayError');
    expect(result.cause).toBeUndefined();
  });

  it('should convert null to GatewayError', () => {
    const error = null;
    const result = asGatewayError(error);
    
    expect(result).toBeInstanceOf(GatewayError);
    expect(result.message).toBe('An unknown error occurred');
    expect(result.name).toBe('GatewayError');
    expect(result.cause).toBeUndefined();
  });

  it('should convert undefined to GatewayError', () => {
    const error = undefined;
    const result = asGatewayError(error);
    
    expect(result).toBeInstanceOf(GatewayError);
    expect(result.message).toBe('An unknown error occurred');
    expect(result.name).toBe('GatewayError');
    expect(result.cause).toBeUndefined();
  });
});

describe('GatewayError', () => {
  it('should create GatewayError with message only', () => {
    const error = new GatewayError('test message');
    
    expect(error.message).toBe('test message');
    expect(error.name).toBe('GatewayError');
    expect(error.cause).toBeUndefined();
  });

  it('should create GatewayError with message and cause', () => {
    const cause = new Error('cause error');
    const error = new GatewayError('test message', cause);
    
    expect(error.message).toBe('test message');
    expect(error.name).toBe('GatewayError');
    expect(error.cause).toBe(cause);
  });
});
