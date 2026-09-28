import { getApi } from "../api";
import { KlaviyoApi } from "../constants";
import { fetchCampaigns } from "./pagination";
import type {
  FieldsCampaign,
  KlaviyoPollableResource,
  KlaviyoRecord,
  PollingChangesObject,
  PollingRecordChange,
} from "../types";
export const filterByTimestamp = (
  records: KlaviyoRecord[],
  lastPolledAt: string,
  createdAtField: string,
  updatedAtField: string,
  includeNew: boolean,
  includeUpdated: boolean,
): {
  created: KlaviyoRecord[];
  updated: KlaviyoRecord[];
} => {
  const lastPolledAtDate = new Date(lastPolledAt);
  const created: KlaviyoRecord[] = [];
  const updated: KlaviyoRecord[] = [];
  for (const record of records) {
    const attrs = record.attributes;
    const rawCreatedAt = attrs[createdAtField];
    const rawUpdatedAt = attrs[updatedAtField];
    const createdAtDate =
      rawCreatedAt instanceof Date
        ? rawCreatedAt
        : typeof rawCreatedAt === "string"
          ? new Date(rawCreatedAt)
          : null;
    const updatedAtDate =
      rawUpdatedAt instanceof Date
        ? rawUpdatedAt
        : typeof rawUpdatedAt === "string"
          ? new Date(rawUpdatedAt)
          : null;
    const isNew = createdAtDate !== null && createdAtDate > lastPolledAtDate;
    const isUpdated =
      !isNew && updatedAtDate !== null && updatedAtDate > lastPolledAtDate;
    if (isNew && includeNew) {
      created.push(record);
    } else if (isUpdated && includeUpdated) {
      updated.push(record);
    }
  }
  return { created, updated };
};
export const fetchProfileOrListRecords = async (
  conn: Parameters<typeof getApi>[0],
  resourceType: KlaviyoPollableResource,
  filter?: string,
): Promise<KlaviyoRecord[]> => {
  const all: KlaviyoRecord[] = [];
  let next: string | undefined;
  if (resourceType === "profiles") {
    const api = getApi(conn, KlaviyoApi.Profiles);
    do {
      const { body } = await api.getProfiles({ pageCursor: next, filter });
      all.push(...(body.data as unknown as KlaviyoRecord[]));
      next = body.links.next;
    } while (next);
    return all;
  }
  const api = getApi(conn, KlaviyoApi.Lists);
  do {
    const { body } = await api.getLists({ pageCursor: next, filter });
    all.push(...(body.data as unknown as KlaviyoRecord[]));
    next = body.links.next;
  } while (next);
  return all;
};
export const fetchCampaignRecords = async (
  conn: Parameters<typeof getApi>[0],
  filter: string,
): Promise<KlaviyoRecord[]> => {
  const api = getApi(conn, KlaviyoApi.Campaigns);
  const result = await fetchCampaigns(
    api,
    undefined as unknown as FieldsCampaign[],
    filter,
    [],
    undefined,
  );
  return result.data as unknown as KlaviyoRecord[];
};
export const resolvePollingRecordChanges = (
  data: PollingChangesObject | undefined,
): PollingRecordChange[] => {
  const changesObject = data ?? {};
  return [
    ...(changesObject.created ?? []).map(
      (record): PollingRecordChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updated ?? []).map(
      (record): PollingRecordChange => ({ changeType: "updated", record }),
    ),
  ];
};
