export const suiteQlRequestBody = (
  query: string,
  parameters: unknown[],
): { q: string; params?: unknown[] } =>
  parameters.length > 0 ? { q: query, params: parameters } : { q: query };
