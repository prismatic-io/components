export const getIdObject = (
  value: string | undefined,
): { id: string } | undefined =>
  value
    ? {
        id: value,
      }
    : undefined;

export const compactObject = <T extends Record<string, unknown>>(
  value: T | undefined,
): Partial<T> | undefined => {
  const entries = Object.entries(value ?? {}).filter(
    ([, fieldValue]) =>
      fieldValue !== undefined && fieldValue !== null && fieldValue !== "",
  );
  return entries.length > 0
    ? (Object.fromEntries(entries) as Partial<T>)
    : undefined;
};

export const compactRows = <T extends Record<string, unknown>>(
  rows: T[] | undefined,
): Partial<T>[] | undefined => {
  const compacted = (Array.isArray(rows) ? rows : [])
    .map((row) => compactObject(row))
    .filter((row): row is Partial<T> => row !== undefined);
  return compacted.length > 0 ? compacted : undefined;
};
