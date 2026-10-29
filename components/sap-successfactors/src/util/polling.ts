import { POLL_RESOURCE_CONFIG } from "../constants";
import type { SAPSuccessFactorsRecord } from "../types";
import { parseSapDate } from "./dates";

export const pollResourceModel = Object.entries(POLL_RESOURCE_CONFIG).map(
  ([value, { label }]) => ({
    label,
    value,
  }),
);

export const filterByTimestamp = (
  records: SAPSuccessFactorsRecord[],
  lastPolledAt: string,
): {
  created: SAPSuccessFactorsRecord[];
  updated: SAPSuccessFactorsRecord[];
} => {
  const lastPolledAtDate = new Date(lastPolledAt);
  const created: SAPSuccessFactorsRecord[] = [];
  const updated: SAPSuccessFactorsRecord[] = [];

  for (const record of records) {
    const createdAt = parseSapDate(record.createdDateTime);
    const isNew = createdAt !== undefined && createdAt > lastPolledAtDate;
    if (isNew) {
      created.push(record);
    } else {
      updated.push(record);
    }
  }

  return { created, updated };
};
