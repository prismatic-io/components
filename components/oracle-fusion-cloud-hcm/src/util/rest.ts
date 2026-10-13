import { util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { LOOK_BACK_DATE_PATTERN, REST_RESOURCE_CONFIG } from "../constants";
import type {
  HcmRestChangesObject,
  HcmRestRecordChange,
  OracleHcmListResponse,
} from "../types";
export const restResourceModel = Object.entries(REST_RESOURCE_CONFIG).map(
  ([value, { label }]) => ({
    label,
    value,
  }),
);
export const fetchRecordsSince = async (
  client: HttpClient,
  endpoint: string,
  since: string,
  pageSize: number,
): Promise<Record<string, unknown>[]> => {
  const records: Record<string, unknown>[] = [];
  let offset = 0;
  let hasMore = true;
  while (hasMore) {
    const { data } = await client.get<
      OracleHcmListResponse<Record<string, unknown>>
    >(endpoint, {
      params: {
        q: `LastUpdateDate>="${since}"`,
        offset,
        limit: pageSize,
      },
    });
    records.push(...(data.items ?? []));
    hasMore = data.hasMore ?? false;
    offset += pageSize;
  }
  return records;
};
export const resolveRestPollingRecordChanges = (
  data: HcmRestChangesObject | undefined,
): HcmRestRecordChange[] => {
  const changesObject = data ?? {};
  return (changesObject.records ?? []).map(
    (record): HcmRestRecordChange => ({ changeType: "updated", record }),
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
  return `${str}T00:00:00.000Z`;
};
