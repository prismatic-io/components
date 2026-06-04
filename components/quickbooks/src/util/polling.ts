import type { Connection } from "@prismatic-io/spectral";
import { createHttpClient } from "../client";
import { MAX_RESULTS, POLL_RESOURCE_CONFIG } from "../constants";
import type { QuickBooksRecord } from "../types";

const MAX_POLL_PAGES = 100;



export const pollResourceModel = Object.entries(POLL_RESOURCE_CONFIG).map(
  ([value, { label }]) => ({ value, label }),
);

















export const fetchQuickBooksRecordsSince = async (
  connection: Connection,
  entityName: string,
  lastPolledAtIso: string,
  debug: boolean,
): Promise<{ records: QuickBooksRecord[]; truncated: boolean }> => {
  const client = createHttpClient(connection, debug);
  const records: QuickBooksRecord[] = [];
  let startPosition = 1; 
  let pages = 0;
  let lastPageFull = true;
  while (lastPageFull && pages < MAX_POLL_PAGES) {
    const query = encodeURIComponent(
      `SELECT * FROM ${entityName} WHERE Metadata.LastUpdatedTime > '${lastPolledAtIso}' STARTPOSITION ${startPosition} MAXRESULTS ${MAX_RESULTS}`,
    );
    const { data } = await client.get(`/query?query=${query}`);
    const page = (data?.QueryResponse?.[entityName] ??
      []) as QuickBooksRecord[];
    records.push(...page);
    lastPageFull = page.length === MAX_RESULTS;
    startPosition += page.length;
    pages++;
  }
  return { records, truncated: lastPageFull };
};
