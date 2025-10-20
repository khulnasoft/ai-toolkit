import { InvalidArgumentError } from '../../errors/invalid-argument-error';

/**
 * Splits an array into chunks of a specified size.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} array - The array to split.
 * @param {number} chunkSize - The size of each chunk. Must be greater than 0.
 * @returns {T[][]} - A new array containing the chunks.
 *
 * @throws {InvalidArgumentError} If chunkSize is not greater than 0.
 *
 * @example
 * ```typescript
 * const array = [1, 2, 3, 4, 5];
 * const chunks = splitArray(array, 2);
 * // Result: [[1, 2], [3, 4], [5]]
 * ```
 */
export function splitArray<T>(array: T[], chunkSize: number): T[][] {
  if (chunkSize <= 0) {
    throw new InvalidArgumentError({
      parameter: 'chunkSize',
      value: chunkSize,
      message: 'chunkSize must be greater than 0',
    });
  }

  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }

  return result;
}
