import { describe, it } from 'vitest';
import transformer from '../codemods/remove-metadata-with-headers';
import { testTransform } from './test-utils';

describe('remove-metadata-with-headers', () => {
  it('transforms correctly', () => {
    testTransform(transformer, 'remove-metadata-with-headers');
  });
});
