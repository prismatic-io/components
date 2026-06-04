import type { Connection } from "@prismatic-io/spectral";
import {
  createApiClient,
  createClient,
  createWorkflowClient,
} from "../client";
import { fetchAllRecords, fetchCollections } from "./index";
import type { BynderRecord } from "../types/triggers";

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

export const filterByTimestamp = (
  records: BynderRecord[],
  lastPolledAt: string,
  createdAtField: string,
  updatedAtField: string | null,
): { created: BynderRecord[]; updated: BynderRecord[] } => {
  const lastPolledDate = new Date(lastPolledAt);
  const created: BynderRecord[] = [];
  const updated: BynderRecord[] = [];

  for (const record of records) {
    const createdAt = record[createdAtField] as string;
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
