import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { REST_RESOURCE_CONFIG } from "../constants";
import type { OracleHcmListResponse } from "../types";
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
