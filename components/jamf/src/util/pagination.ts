import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { MAX_PAGE_SIZE } from "../constants";
import type { PagedResponse } from "../types";

export const paginateResults = async <
  T,
  R extends PagedResponse<T> = PagedResponse<T>,
>(
  client: HttpClient,
  endpoint: string,
  fetchAll: boolean,
  params: Record<string, unknown>,
): Promise<R> => {
  const results: T[] = [];
  let lastResponse = {} as R;
  let page = 0;
  let hasMore = true;

  while (hasMore) {
    const { data } = await client.get<R>(endpoint, {
      params: fetchAll
        ? { ...params, page, "page-size": MAX_PAGE_SIZE }
        : params,
      paramsSerializer: { indexes: null },
    });
    lastResponse = data;
    results.push(...data.results);
    page += 1;
    hasMore =
      fetchAll && data.results.length > 0 && results.length < data.totalCount;
  }

  return { ...lastResponse, results };
};
