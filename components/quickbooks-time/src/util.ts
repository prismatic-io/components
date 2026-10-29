import queryString from "node:querystring";
import { type KeyValuePair, util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { LOOK_BACK_DATE_PATTERN } from "./constants";
import type {
  QBTimeRecord,
  QBTimeRecordChange,
  QBTimeRecordChanges,
} from "./types";

export const injectQueryParams = (
  url: string,
  queryParams: KeyValuePair[],
): string => {
  const paramObject = queryParams.reduce(
    (result, { key, value }) => ({ ...result, [key]: value }),
    {},
  );

  return `${url}?${queryString.stringify(paramObject)}`;
};

export const fetchRecords = async (
  client: HttpClient,
  object: string,
  queryParams: Record<string, string>,
): Promise<QBTimeRecord[]> => {
  const allRecords: QBTimeRecord[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const params = new URLSearchParams({
      ...queryParams,
      page: util.types.toString(page),
      limit: "200",
    });
    const { data } = await client.get(`/${object}?${params.toString()}`);
    const items = Object.values(
      data?.results?.[object] ?? {},
    ) as QBTimeRecord[];
    allRecords.push(...items);
    hasMore = data?.more === true;
    page++;
  }

  return allRecords;
};

export const lookBackDateClean = (value: unknown): string => {
  if (
    value === undefined ||
    value === null ||
    (typeof value === "string" && value.trim() === "")
  ) {
    return "";
  }

  const raw = typeof value === "string" ? value.trim() : String(value);
  const match =
    typeof value === "string" ? raw.match(LOOK_BACK_DATE_PATTERN) : null;
  if (!match) {
    throw new Error(
      `Look-back Date must be a date in YYYY-MM-DD format. Received: ${raw}`,
    );
  }

  const [, yearStr, monthStr, dayStr] = match;
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);
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

export const filterCreatedOnOrAfter = (
  records: QBTimeRecord[],
  since: string,
): QBTimeRecord[] => {
  const threshold = Date.parse(since);
  return records.filter(
    (record) =>
      typeof record.created === "string" &&
      Date.parse(record.created) >= threshold,
  );
};

export const resolveQBTimeRecordChanges = (
  data: QBTimeRecordChanges | undefined,
): QBTimeRecordChange[] => {
  const changesObject = data ?? { created: [], updated: [] };
  return [
    ...(changesObject.created ?? []).map(
      (record): QBTimeRecordChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updated ?? []).map(
      (record): QBTimeRecordChange => ({ changeType: "updated", record }),
    ),
  ];
};
