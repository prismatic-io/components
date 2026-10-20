import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import {
  MAX_POLL_PAGES,
  POLL_PAGE_SIZE,
  POLL_RESOURCE_CONFIG,
} from "../constants";
import type { ChangesObject, RecordChange, TableauRecord } from "../types";
export const pollResourceModel = Object.keys(POLL_RESOURCE_CONFIG).map(
  (value) => ({
    value,
    label: value.charAt(0).toUpperCase() + value.slice(1),
  }),
);
export const fetchTableauRecordsSince = async (
  client: HttpClient,
  resourceType: string,
  lastPolledAt: string,
): Promise<{
  records: TableauRecord[];
  truncated: boolean;
}> => {
  const config = POLL_RESOURCE_CONFIG[resourceType];
  if (!config) {
    throw new Error(`Unsupported resource type: ${resourceType}`);
  }
  const records: TableauRecord[] = [];
  for (let page = 1; page <= MAX_POLL_PAGES; page++) {
    const query = `filter=updatedAt:gte:${lastPolledAt}&sort=updatedAt:asc&pageSize=${POLL_PAGE_SIZE}&pageNumber=${page}`;
    const { data } = await client.get(`${config.endpoint}?${query}`);
    const items: TableauRecord[] =
      data?.[config.collectionKey]?.[config.itemKey] ?? [];
    records.push(...items);
    const total = Number(data?.pagination?.totalAvailable ?? 0);
    if (items.length < POLL_PAGE_SIZE || records.length >= total) {
      return { records, truncated: false };
    }
  }
  return { records, truncated: true };
};
export const resolvePollingRecordChanges = (
  data: ChangesObject | undefined,
): RecordChange[] => {
  const changesObject = data ?? {};
  return [
    ...(changesObject.created ?? []).map(
      (record): RecordChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updated ?? []).map(
      (record): RecordChange => ({ changeType: "updated", record }),
    ),
  ];
};
