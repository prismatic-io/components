import { type Connection, util } from "@prismatic-io/spectral";
import { createHttpClient } from "../client";
import {
  LOOK_BACK_DATE_PATTERN,
  MAX_RESULTS,
  POLL_RESOURCE_CONFIG,
} from "../constants";
import type { QuickBooksRecord } from "../types";
export const MAX_POLL_PAGES = 100;
export const MAX_BATCHED_POLL_PAGES = 1;
export const pollResourceModel = Object.entries(POLL_RESOURCE_CONFIG).map(
  ([value, { label }]) => ({ value, label }),
);
export const fetchQuickBooksRecordsSince = async (
  connection: Connection,
  entityName: string,
  lastPolledAtIso: string,
  debug: boolean,
  options?: {
    maxPages?: number;
    resumePosition?: number;
  },
): Promise<{
  records: QuickBooksRecord[];
  truncated: boolean;
  nextPosition: number;
}> => {
  const client = createHttpClient(connection, debug);
  const records: QuickBooksRecord[] = [];
  const maxPages = options?.maxPages ?? MAX_POLL_PAGES;
  let startPosition = options?.resumePosition ?? 1;
  let pages = 0;
  let lastPageFull = true;
  while (lastPageFull && pages < maxPages) {
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
  return { records, truncated: lastPageFull, nextPosition: startPosition };
};
export interface QuickBooksChangesObject {
  created: unknown[];
  updated: unknown[];
}
export interface QuickBooksRecordChange {
  changeType: "created" | "updated";
  record: unknown;
}
export const lookBackDateClean = (value: unknown): string => {
  const str = util.types.toString(value).trim();
  if (!str) return "";
  if (!LOOK_BACK_DATE_PATTERN.test(str)) {
    throw new Error("Look-back Date must be in YYYY-MM-DD format.");
  }
  const parts = str.split("-");
  const year = util.types.toNumber(parts[0]);
  const month = util.types.toNumber(parts[1]);
  const day = util.types.toNumber(parts[2]);
  const parsed = new Date(year, month - 1, day);
  if (
    parsed.getFullYear() !== year ||
    parsed.getMonth() !== month - 1 ||
    parsed.getDate() !== day
  ) {
    throw new Error(`Look-back Date "${str}" is not a valid calendar date.`);
  }
  if (parsed > new Date()) {
    throw new Error("Look-back Date cannot be a future date.");
  }
  return str;
};
export const resolvePollingRecordChanges = (
  data: QuickBooksChangesObject | undefined,
): QuickBooksRecordChange[] => {
  if (!data) return [];
  const changes: QuickBooksRecordChange[] = [];
  for (const record of data.created ?? []) {
    changes.push({ changeType: "created", record });
  }
  for (const record of data.updated ?? []) {
    changes.push({ changeType: "updated", record });
  }
  return changes;
};
