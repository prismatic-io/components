import type { createShipStationClient } from "../client";
import type { TimestampedRecord } from "../types";

export const getModifiedOrCreatedRecords = <T extends TimestampedRecord>(
  records: T[],
  lastPolledAt: string,
) => {
  return records.reduce(
    (previous, current) => {
      const createdDate = new Date(current.createDate);
      const modifiedDate = new Date(current.modifyDate);
      if (createdDate >= new Date(lastPolledAt)) {
        previous.created.push(current);
      } else if (modifiedDate >= new Date(lastPolledAt)) {
        previous.updated.push(current);
      }
      return previous;
    },
    { created: [] as T[], updated: [] as T[] },
  );
};

export const hasChanges = (result: {
  created: unknown[];
  updated: unknown[];
}) => result.created.length > 0 || result.updated.length > 0;

export const fetchAllPages = async <T = unknown>(
  client: ReturnType<typeof createShipStationClient>,
  endpoint: string,
  params: Record<string, unknown>,
  dataKey: string,
): Promise<T[]> => {
  let page = 1;
  const allRecords: T[] = [];
  let hasMore = true;

  while (hasMore) {
    const { data } = await client.get(endpoint, {
      params: { ...params, page, pageSize: 500 },
    });
    const records = data[dataKey] || data;
    allRecords.push(...(Array.isArray(records) ? records : []));
    hasMore = Array.isArray(records) && records.length === 500;
    page++;
  }

  return allRecords;
};
