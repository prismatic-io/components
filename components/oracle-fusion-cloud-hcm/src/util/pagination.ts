import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { FETCH_ALL_PAGE_SIZE } from "../constants";
import type { OracleHcmListResponse } from "../types";
export const paginateResults = async <T>(
  client: HttpClient,
  endpoint: string,
  fetchAll: boolean,
  params: Record<string, unknown> = {},
): Promise<OracleHcmListResponse<T>> => {
  if (!fetchAll) {
    const { data } = await client.get<OracleHcmListResponse<T>>(endpoint, {
      params,
    });
    return data;
  }
  const { offset: _offset, limit: _limit, ...rest } = params;
  const items: T[] = [];
  let offset = 0;
  let hasMore = true;
  while (hasMore) {
    const { data } = await client.get<OracleHcmListResponse<T>>(endpoint, {
      params: { ...rest, offset, limit: FETCH_ALL_PAGE_SIZE },
    });
    items.push(...(data.items ?? []));
    hasMore = data.hasMore ?? false;
    offset += FETCH_ALL_PAGE_SIZE;
  }
  return {
    items,
    count: items.length,
    hasMore: false,
    limit: items.length,
    offset: 0,
  };
};
