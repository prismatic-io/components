import { util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { LOOK_BACK_DATE_PATTERN, POLL_RESOURCE_CONFIG } from "./constants";
import type {
  GA4ChangesObject,
  GA4Record,
  GA4RecordChange,
  PaginatedFunction,
} from "./types";
export const toOptionalString = (input: unknown) => {
  return input ? util.types.toString(input) : undefined;
};
export const pollResourceModel = Object.entries(POLL_RESOURCE_CONFIG).map(
  ([value, { label }]) => ({
    label,
    value,
  }),
);
export const paginateRecords = async <T, K extends string>(
  client: HttpClient,
  url: string,
  params: Record<string, unknown>,
  fetchAll: boolean,
  propertyKey: K,
) => {
  const records: PaginatedFunction<T> = {
    [propertyKey]: [],
  };
  const pageSize = params.pageSize ? util.types.toNumber(params.pageSize) : 200;
  const { data } = await client.get<PaginatedFunction<T, K>>(url, {
    params: {
      ...params,
      pageSize,
    },
  });
  data[propertyKey] = data[propertyKey] ?? [];
  records[propertyKey] = data[propertyKey];
  let nextPageToken = data.nextPageToken || "";
  if (fetchAll && nextPageToken) {
    while (nextPageToken) {
      const response = await client.get<PaginatedFunction<T, K>>(url, {
        params: {
          ...params,
          pageSize,
          pageToken: nextPageToken,
        },
      });
      records[propertyKey] = records[propertyKey].concat(
        response.data[propertyKey] ?? [],
      );
      nextPageToken = response.data.nextPageToken || "";
    }
    return records;
  }
  return data;
};
export const resolvePollingRecordChanges = (
  data: GA4ChangesObject | undefined,
): GA4RecordChange[] => {
  const changesObject = data ?? {};
  return [
    ...(changesObject.created ?? []).map(
      (record): GA4RecordChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updated ?? []).map(
      (record): GA4RecordChange => ({ changeType: "updated", record }),
    ),
  ];
};
export const filterByTimestamp = (
  records: GA4Record[],
  lastPolledAt: string,
  isBackfill: boolean,
  showNewRecords: boolean,
  showUpdatedRecords: boolean,
): {
  created: GA4Record[];
  updated: GA4Record[];
} => {
  const lastPolledAtDate = new Date(lastPolledAt);
  const created: GA4Record[] = [];
  const updated: GA4Record[] = [];
  for (const record of records) {
    const { createTime, updateTime } = record;
    const createdAtDate =
      typeof createTime === "string" ? new Date(createTime) : null;
    const updatedAtDate =
      typeof updateTime === "string" ? new Date(updateTime) : null;
    const isNew = createdAtDate !== null && createdAtDate > lastPolledAtDate;
    const isUpdated =
      !isNew && updatedAtDate !== null && updatedAtDate > lastPolledAtDate;
    if (isNew && (isBackfill || showNewRecords)) created.push(record);
    else if (isUpdated && (isBackfill || showUpdatedRecords))
      updated.push(record);
  }
  return { created, updated };
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
