import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type {
  PipedriveRecentItem,
  PollingChangesObject,
  PollingRecordChange,
  PollResourceConfig,
} from "../types";
import { paginateRecordsWithLimit } from "./pagination";
export const formatPipedriveTimestamp = (date: Date): string =>
  date.toISOString().replace("T", " ").substring(0, 19);
export const formatPipedriveTimestampV2 = (date: Date): string =>
  date.toISOString();
export const fetchRecentsSince = async (
  client: HttpClient,
  sinceTimestamp: string,
  itemType?: string,
): Promise<PipedriveRecentItem[]> => {
  const params: Record<string, unknown> = { since_timestamp: sinceTimestamp };
  if (itemType) {
    params.items = itemType;
  }
  const { data } = await paginateRecordsWithLimit<PipedriveRecentItem>(
    client,
    "/recents",
    params,
    true,
  );
  return data ?? [];
};
export const partitionByTimestamp = (
  records: PipedriveRecentItem[],
  sinceDate: Date,
  config: PollResourceConfig,
): {
  created: PipedriveRecentItem[];
  updated: PipedriveRecentItem[];
} => {
  const created: PipedriveRecentItem[] = [];
  const updated: PipedriveRecentItem[] = [];
  for (const record of records) {
    const recordData = record.data ?? {};
    const createdAtRaw = config.createdAtField
      ? (recordData[config.createdAtField] as string | undefined)
      : undefined;
    const updatedAtRaw = config.updatedAtField
      ? (recordData[config.updatedAtField] as string | undefined)
      : undefined;
    const createdAt = createdAtRaw ? new Date(createdAtRaw) : null;
    const updatedAt = updatedAtRaw ? new Date(updatedAtRaw) : null;
    if (createdAt && createdAt > sinceDate) {
      created.push(record);
    } else if (updatedAt && updatedAt > sinceDate) {
      updated.push(record);
    } else if (!createdAt && !updatedAt) {
      updated.push(record);
    }
  }
  return { created, updated };
};
export const resolvePollingRecordChanges = (
  data: PollingChangesObject | undefined,
): PollingRecordChange[] => {
  const changesObject = data ?? { created: [], updated: [] };
  return [
    ...(changesObject.created ?? []).map(
      (record): PollingRecordChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updated ?? []).map(
      (record): PollingRecordChange => ({ changeType: "updated", record }),
    ),
  ];
};
