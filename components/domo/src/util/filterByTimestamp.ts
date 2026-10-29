import type { DomoRecord } from "../types";

export const filterByTimestamp = (
  records: DomoRecord[],
  lastPolled: string,
  createdAtField: string | null,
  updatedAtField: string | null,
): { created: DomoRecord[]; updated: DomoRecord[] } => {
  const lastPolledDate = new Date(lastPolled);
  const created: DomoRecord[] = [];
  const updated: DomoRecord[] = [];

  for (const record of records) {
    const createdAt = createdAtField
      ? (record[createdAtField] as string)
      : null;
    const updatedAt = updatedAtField
      ? (record[updatedAtField] as string)
      : null;

    if (createdAt && new Date(createdAt) > lastPolledDate) {
      created.push(record);
    } else if (updatedAt && new Date(updatedAt) > lastPolledDate) {
      updated.push(record);
    }
  }

  return { created, updated };
};
