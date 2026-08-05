import type { ServiceTitanRecord } from "../types";
export const filterByTimestamp = (
  records: ServiceTitanRecord[],
  lastPolledAt: string,
  createdAtField: string,
  updatedAtField: string,
): {
  created: ServiceTitanRecord[];
  updated: ServiceTitanRecord[];
} => {
  const lastPolledDate = new Date(lastPolledAt);
  const created: ServiceTitanRecord[] = [];
  const updated: ServiceTitanRecord[] = [];
  for (const record of records) {
    const createdAt = record[createdAtField] as string;
    const updatedAt = record[updatedAtField] as string;
    if (createdAt && new Date(createdAt) > lastPolledDate) {
      created.push(record);
    } else if (updatedAt && new Date(updatedAt) > lastPolledDate) {
      updated.push(record);
    }
  }
  return { created, updated };
};
