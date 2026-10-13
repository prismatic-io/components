import { util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import {
  DEFAULT_PAGE_SIZE,
  LOOK_BACK_DATE_PATTERN,
  POLL_RESOURCE_CONFIG,
} from "../constants";
import type {
  PdqChangesObject,
  PdqRecordChange,
  PollableRecord,
} from "../types";
import { fetchData } from "./pagination";
export const TComparator = <
  T extends {
    id: string;
  },
>(
  a: T,
  b: T,
): number => (a.id < b.id ? -1 : 1);
export const pollResourceModel: {
  label: string;
  value: string;
}[] = Object.keys(POLL_RESOURCE_CONFIG).map((value) => ({
  label: value,
  value,
}));
export const filterRecordsInsertedAfter = (
  records: PollableRecord[],
  lastPolledAt: string,
): PollableRecord[] => {
  const lastPolledAtMs = new Date(lastPolledAt).getTime();
  return records.filter((record) => {
    const insertedMs = record.insertedAt
      ? new Date(record.insertedAt).getTime()
      : Number.NaN;
    return !Number.isNaN(insertedMs) && insertedMs > lastPolledAtMs;
  });
};
export const fetchAllInsertedAfter = async (
  client: HttpClient,
  path: string,
  lastPolledAt: string,
): Promise<PollableRecord[]> => {
  const lastPolledAtMs = new Date(lastPolledAt).getTime();
  const records: PollableRecord[] = [];
  const keepFetching = true;
  let page = 1;
  do {
    const response = await fetchData(client, path, {
      sort: "insertedAtDesc",
      pageSize: DEFAULT_PAGE_SIZE,
      page,
    });
    const data = (response?.data ?? []) as PollableRecord[];
    if (data.length === 0) {
      break;
    }
    records.push(...data);
    const oldest = data[data.length - 1];
    const oldestMs = oldest?.insertedAt
      ? new Date(oldest.insertedAt).getTime()
      : Number.NaN;
    if (!Number.isNaN(oldestMs) && oldestMs <= lastPolledAtMs) {
      break;
    }
    page++;
  } while (keepFetching);
  return records;
};
export const resolvePollingRecordChanges = (
  data: PdqChangesObject | undefined,
): PdqRecordChange[] => {
  const changesObject = data ?? {};
  return (changesObject.created ?? []).map(
    (record): PdqRecordChange => ({ changeType: "created", record }),
  );
};
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
