import type { Connection } from "@prismatic-io/spectral";
import { createApiClient, createClient, createWorkflowClient } from "../client";
import type {
  BynderChangesObject,
  BynderRecord,
  BynderRecordChange,
  PollResourceConfig,
} from "../types/triggers";
import { fetchAllRecords, fetchCollections } from "./index";

export const fetchRecordsForResource = async (
  conn: Connection,
  resourceType: string,
  debug: boolean,
): Promise<BynderRecord[]> => {
  switch (resourceType) {
    case "assets": {
      const client = createClient(conn, debug);
      const result = await fetchAllRecords(
        client,
        "media",
        { fetchAll: true, total: true },
        "media",
      );
      return (result.media ?? []) as BynderRecord[];
    }
    case "collections": {
      const client = createClient(conn, debug);
      const records = await fetchCollections(client, undefined);
      return records as unknown as BynderRecord[];
    }
    case "campaigns": {
      const client = createWorkflowClient(conn, debug);
      const { data } = await client.get("/campaigns");
      return (Array.isArray(data) ? data : []) as BynderRecord[];
    }
    case "jobs": {
      const client = createWorkflowClient(conn, debug);
      const allJobs: BynderRecord[] = [];
      let page = 1;
      const limit = 100;
      let hasMore = true;
      while (hasMore) {
        const { data } = await client.get("/jobs", {
          params: { page, limit },
        });
        const batch = Array.isArray(data) ? data : [];
        allJobs.push(...(batch as BynderRecord[]));
        hasMore = batch.length >= limit;
        page++;
      }
      return allJobs;
    }
    case "orders": {
      const client = createApiClient(conn, debug);
      const allOrders: BynderRecord[] = [];
      let page = 1;
      let hasMore = true;
      while (hasMore) {
        const { data } = await client.get("/store/order", {
          params: { page },
        });
        const batch = Array.isArray(data) ? data : [];
        allOrders.push(...(batch as BynderRecord[]));
        hasMore = batch.length >= 10;
        page++;
      }
      return allOrders;
    }
    default:
      throw new Error(`Unsupported resource type: ${resourceType}`);
  }
};

const filterByTimestamp = (
  records: BynderRecord[],
  since: string,
  createdAtField: string,
  updatedAtField: string | null,
  inclusive: boolean,
): BynderChangesObject => {
  const sinceMs = new Date(since).getTime();
  const isAfter = (value: unknown) => {
    const ms = value ? new Date(value as string).getTime() : Number.NaN;
    return !Number.isNaN(ms) && (inclusive ? ms >= sinceMs : ms > sinceMs);
  };
  const created: BynderRecord[] = [];
  const updated: BynderRecord[] = [];

  for (const record of records) {
    if (isAfter(record[createdAtField])) {
      created.push(record);
    } else if (updatedAtField && isAfter(record[updatedAtField])) {
      updated.push(record);
    }
  }

  return { created, updated };
};

export const collectRecordChanges = (
  records: BynderRecord[],
  since: string,
  config: PollResourceConfig,
  options: {
    isInitialSync: boolean;
    showNewRecords: boolean;
    showUpdatedRecords: boolean;
  },
): BynderChangesObject => {
  const { isInitialSync, showNewRecords, showUpdatedRecords } = options;
  const { created, updated } = filterByTimestamp(
    records,
    since,
    config.createdAtField,
    config.updatedAtField,
    isInitialSync,
  );
  return {
    created: isInitialSync || showNewRecords ? created : [],
    updated: isInitialSync || showUpdatedRecords ? updated : [],
  };
};

export const resolveBynderRecordChanges = (
  data: BynderChangesObject | undefined,
): BynderRecordChange[] => {
  const changesObject = data ?? { created: [], updated: [] };
  return [
    ...(changesObject.created ?? []).map(
      (record): BynderRecordChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updated ?? []).map(
      (record): BynderRecordChange => ({ changeType: "updated", record }),
    ),
  ];
};
