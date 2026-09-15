import { POLL_RESOURCE_CONFIG } from "../constants";
import type {
  PollingChangesObject,
  PollingRecordChange,
  ServiceTitanRecord,
} from "../types";
export const filterByTimestamp = (
  records: ServiceTitanRecord[],
  lastPolledAt: string,
  createdAtField: string,
  updatedAtField: string,
  deliveredIds: number[] = [],
): {
  created: ServiceTitanRecord[];
  updated: ServiceTitanRecord[];
} => {
  const cutoff = new Date(lastPolledAt).getTime();
  const delivered = new Set(deliveredIds);
  const created: ServiceTitanRecord[] = [];
  const updated: ServiceTitanRecord[] = [];
  const isNew = (timestamp: string, record: ServiceTitanRecord): boolean => {
    const at = new Date(timestamp).getTime();
    if (at > cutoff) return true;
    return at === cutoff && !delivered.has(record.id);
  };
  for (const record of records) {
    const createdAt = record[createdAtField] as string;
    const updatedAt = record[updatedAtField] as string;
    if (createdAt && isNew(createdAt, record)) {
      created.push(record);
    } else if (updatedAt && isNew(updatedAt, record)) {
      updated.push(record);
    }
  }
  return { created, updated };
};
export const resolvePollingRecordChanges = (
  data: PollingChangesObject | undefined,
): PollingRecordChange[] => [
  ...(data?.created ?? []).map(
    (record): PollingRecordChange => ({ changeType: "created", record }),
  ),
  ...(data?.updated ?? []).map(
    (record): PollingRecordChange => ({ changeType: "updated", record }),
  ),
];
export const pollResourceModel = Object.entries(POLL_RESOURCE_CONFIG).map(
  ([value, { label }]) => ({ label, value }),
);
export const advanceCursor = (
  records: ServiceTitanRecord[],
  lastPolledAt: string,
  updatedAtField: string,
  createdAtField: string,
): string => {
  let watermark = lastPolledAt;
  let watermarkAt = new Date(lastPolledAt).getTime();
  for (const record of records) {
    const timestamp = recordTimestamp(record, updatedAtField, createdAtField);
    if (!timestamp) continue;
    const at = new Date(timestamp).getTime();
    if (at > watermarkAt) {
      watermark = timestamp;
      watermarkAt = at;
    }
  }
  return watermark;
};
export const recordTimestamp = (
  record: ServiceTitanRecord,
  updatedAtField: string,
  createdAtField: string,
): string => (record[updatedAtField] ?? record[createdAtField] ?? "") as string;
