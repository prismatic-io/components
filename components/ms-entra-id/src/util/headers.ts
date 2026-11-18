export const getConsistencyLevelHeader = (
  eventualConsistencyLevelHeader: boolean,
): Record<string, string> =>
  eventualConsistencyLevelHeader ? { ConsistencyLevel: "Eventual" } : {};

export const getUpsertHeader = (
  useAsUpsert: boolean,
): Record<string, string> =>
  useAsUpsert ? { Prefer: "create-if-missing" } : {};

export const getMinimalHeader = (
  returnMinimal: boolean,
): Record<string, string> =>
  returnMinimal ? { Prefer: "return=minimal" } : {};
