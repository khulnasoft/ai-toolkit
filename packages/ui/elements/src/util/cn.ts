type ClassValue = string | false | null | undefined;

/**
 * Joins class names, dropping falsy values. Intentionally dependency-free;
 * prefer `clsx` + `tailwind-merge` in your app if you need conflict merging.
 */
export function cn(...classes: Array<ClassValue>): string {
  return classes.filter(Boolean).join(' ');
}
