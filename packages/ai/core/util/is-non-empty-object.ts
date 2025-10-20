/**
 * Checks if a value is a non-empty object.
 *
 * This function performs a type guard check to ensure the value is:
 * - Not null or undefined
 * - Has at least one own property
 *
 * @param object - The value to check
 * @returns True if the value is a non-empty object, false otherwise
 *
 * @example
 * ```typescript
 * const obj = { key: 'value' };
 * const empty = {};
 * const nullish = null;
 *
 * console.log(isNonEmptyObject(obj)); // true
 * console.log(isNonEmptyObject(empty)); // false
 * console.log(isNonEmptyObject(nullish)); // false
 * ```
 */
export function isNonEmptyObject(
  object: Record<string, unknown> | undefined | null,
): object is Record<string, unknown> {
  return object != null && Object.keys(object).length > 0;
}
