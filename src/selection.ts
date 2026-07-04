export function isAllSelected<T>(modelValue: T[] | undefined, items: T[]): boolean {
  return items.every(item => modelValue?.includes(item));
}

export function isSomeSelected<T>(modelValue: T[] | undefined, items: T[]): boolean {
  return items.some(item => modelValue?.includes(item));
}

export function toggleSelection<T>(modelValue: T[] | undefined, items: T[], checked: boolean): T[] {
  const currentModel = modelValue ?? [];
  if (checked) {
    return [...new Set([...currentModel, ...items])];
  } else {
    return currentModel.filter(item => !items.includes(item));
  }
}
