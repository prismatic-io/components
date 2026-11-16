export const filterFalseyValues = (
  obj: Record<string, unknown>,
): Record<string, unknown> =>
  Object.fromEntries(Object.entries(obj).filter(([, value]) => value));
