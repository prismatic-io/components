import { DEFAULT_CREATED_FIELD } from "../constants";
import type { SageIntacctRecord } from "../types";
export const filterByTimestamp = (
  records: SageIntacctRecord[],
  lastPolledAt: string,
  includeNew: boolean,
  includeUpdated: boolean,
  createdField = DEFAULT_CREATED_FIELD,
): {
  created: SageIntacctRecord[];
  updated: SageIntacctRecord[];
} => {
  const lastPolledAtDate = new Date(lastPolledAt);
  const created: SageIntacctRecord[] = [];
  const updated: SageIntacctRecord[] = [];
  for (const record of records) {
    const rawCreated = record[createdField];
    const createdAtDate =
      typeof rawCreated === "string" && rawCreated.length > 0
        ? new Date(rawCreated)
        : null;
    const isNew = createdAtDate !== null && createdAtDate > lastPolledAtDate;
    if (isNew) {
      if (includeNew) created.push(record);
    } else {
      if (includeUpdated) updated.push(record);
    }
  }
  return { created, updated };
};
