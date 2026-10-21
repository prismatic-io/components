import type { Connection } from "@prismatic-io/spectral";
import { createAirtableClient } from "../../client";
import type { AirtableRecord } from "../../types";
export const MAX_POLL_PAGES = 100;
export const PAGE_SIZE = 100;
export const BATCHED_MAX_PAGES = 1;
export const fetchAirtableRecordsSince = async (
  connection: Connection,
  baseId: string,
  tableNameOrId: string,
  lastPolledAtIso: string,
  debug: boolean,
  maxPages: number,
  view?: string,
  additionalFilter?: string,
  resumeOffset?: string,
): Promise<{
  records: AirtableRecord[];
  offset: string | undefined;
}> => {
  const client = createAirtableClient(connection, debug);
  const modifiedFilter = `IS_AFTER(LAST_MODIFIED_TIME(), DATETIME_PARSE("${lastPolledAtIso}"))`;
  const filterByFormula = additionalFilter
    ? `AND(${additionalFilter}, ${modifiedFilter})`
    : modifiedFilter;
  const records: AirtableRecord[] = [];
  let offset: string | undefined = resumeOffset;
  let pages = 0;
  do {
    const { data } = await client.get<{
      offset?: string;
      records: AirtableRecord[];
    }>(`/v0/${baseId}/${tableNameOrId}`, {
      params: {
        filterByFormula,
        pageSize: PAGE_SIZE,
        ...(view && { view }),
        ...(offset && { offset }),
      },
    });
    records.push(...(data.records ?? []));
    offset = data.offset;
    pages++;
  } while (offset && pages < maxPages);
  return { records, offset };
};
export const partitionRecordsByTimestamp = (
  records: AirtableRecord[],
  boundaryIso: string,
  opts: {
    isBackfill: boolean;
    showNewRecords: boolean;
    showUpdatedRecords: boolean;
  },
): {
  created: AirtableRecord[];
  updated: AirtableRecord[];
} => {
  const boundary = new Date(boundaryIso);
  const created: AirtableRecord[] = [];
  const updated: AirtableRecord[] = [];
  for (const record of records) {
    const createdAt =
      typeof record.createdTime === "string"
        ? new Date(record.createdTime)
        : null;
    const isNew = createdAt !== null && createdAt > boundary;
    if (isNew && (opts.isBackfill || opts.showNewRecords)) created.push(record);
    else if (!isNew && (opts.isBackfill || opts.showUpdatedRecords))
      updated.push(record);
  }
  return { created, updated };
};
