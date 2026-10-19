import { type KeyValuePair, util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { LOOK_BACK_DATE_PATTERN } from "../constants";
import type { Collection, Collections, Records } from "../types";
export const cleanString = (value: unknown) =>
  value ? util.types.toString(value).trim() : undefined;
export const cleanNumber = (value: unknown) =>
  value ? util.types.toNumber(value) : undefined;
export const cleanCodeInput = (value: unknown) =>
  value ? (util.types.toObject(value) as Record<string, unknown>) : undefined;
export const cleanKeyValueListInput = (value: unknown) =>
  value
    ? util.types.keyValPairListToObject(value as KeyValuePair[])
    : undefined;
export const cleanValueListInput = (value: unknown) => {
  if (value && Array.isArray(value) && value.length > 0) {
    return value.map(cleanString).filter(Boolean);
  }
  return undefined;
};
export const lookBackDateClean = (value: unknown): string => {
  const raw = cleanString(value);
  if (!raw) {
    return "";
  }
  const match =
    typeof value === "string" ? raw.match(LOOK_BACK_DATE_PATTERN) : null;
  if (!match) {
    throw new Error(
      `Look-back Date must be a date in YYYY-MM-DD format. Received: ${raw}`,
    );
  }
  const [, yearStr, monthStr, dayStr] = match;
  const year = util.types.toNumber(yearStr);
  const month = util.types.toNumber(monthStr);
  const day = util.types.toNumber(dayStr);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    throw new Error(
      `Look-back Date must be a date in YYYY-MM-DD format. Received: ${raw}`,
    );
  }
  if (parsed.getTime() > Date.now()) {
    throw new Error(`Look-back Date cannot be a future date. Received: ${raw}`);
  }
  return parsed.toISOString();
};
export const fetchAllRecords = async (
  client: HttpClient,
  url: string,
  params: Record<string, unknown>,
  listName: string,
) => {
  if (params.fetchAll) {
    let records: Record<string, unknown>[] = [];
    let keepFetching = true;
    let page = 1;
    let response = null;
    const limit = 1000;
    do {
      const { data } = await client.get(url, {
        params: {
          ...params,
          total: true,
          page,
          limit,
        },
      });
      response = data;
      const count = data?.total?.count;
      records = [...records, ...data[listName]];
      if (count) {
        keepFetching = records.length < count;
      }
      page++;
    } while (keepFetching);
    return {
      ...response,
      [listName]: records,
    };
  } else {
    const { data } = await client.get(url, { params });
    return data;
  }
};
export const fetchCollections = async (
  client: HttpClient,
  extraParams: Record<string, unknown> | undefined,
) => {
  let flag = true;
  let records: Collection[] = [];
  let pageNumber = 1;
  do {
    const {
      data: { collections, count },
    } = await client.get<Collections>(`/collections`, {
      params: {
        limit: 1000,
        page: pageNumber,
        count: true,
        ...extraParams,
      },
    });
    records = [...records, ...collections];
    if (records.length >= count) {
      flag = false;
    }
    pageNumber++;
  } while (flag);
  return records;
};
export function sortArray<T extends Records>(array: T[], key: string) {
  return array.sort((a, b) => (a[key] < b[key] ? -1 : 1));
}
export {
  collectRecordChanges,
  fetchRecordsForResource,
  resolveBynderRecordChanges,
} from "./polling";
