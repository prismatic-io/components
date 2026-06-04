import type { Connection } from "@prismatic-io/spectral";
import { createAirtableClient } from "../../client";
import type { AirtableRecord } from "../../types";

const MAX_POLL_PAGES = 100;
const PAGE_SIZE = 100;











export const fetchAirtableRecordsSince = async (
  connection: Connection,
  baseId: string,
  tableNameOrId: string,
  lastPolledAtIso: string,
  debug: boolean,
  view?: string,
  additionalFilter?: string,
): Promise<{ records: AirtableRecord[]; truncated: boolean }> => {
  const client = createAirtableClient(connection, debug);
  
  
  
  
  const modifiedFilter = `IS_AFTER(LAST_MODIFIED_TIME(), DATETIME_PARSE("${lastPolledAtIso}"))`;
  const filterByFormula = additionalFilter
    ? `AND(${additionalFilter}, ${modifiedFilter})`
    : modifiedFilter;

  const records: AirtableRecord[] = [];
  let offset: string | undefined;
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
  } while (offset && pages < MAX_POLL_PAGES);

  return { records, truncated: Boolean(offset) };
};
