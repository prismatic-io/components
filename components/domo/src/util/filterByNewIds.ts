import type { DomoRecord } from "../types";

export const filterByNewIds = (
  records: DomoRecord[],
  knownIds: (string | number)[],
): DomoRecord[] => {
  const knownSet = new Set(knownIds.map(String));
  return records.filter((record) => !knownSet.has(String(record.id)));
};
