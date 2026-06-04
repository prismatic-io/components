export const cleanValueListInput = (value: unknown): string[] | undefined => {
  if (Array.isArray(value)) {
    return value.length > 0 ? value : undefined;
  }
  return undefined;
};
