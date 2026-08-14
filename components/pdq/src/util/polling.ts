import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { DEFAULT_PAGE_SIZE, POLL_RESOURCE_CONFIG } from "../constants";
import type { PollableRecord } from "../types";
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
