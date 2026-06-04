import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";

const MAX_PAGES = 100;
const DEFAULT_V1_LIMIT = 100;

interface V1PaginationParams {
  limit?: number;
  offset?: number;
  [key: string]: unknown;
}

interface V2PaginationParams {
  cursor?: string;
  order_by?: string;
  [key: string]: unknown;
}

interface V2Response<T = unknown> {
  data: T[];
  next_link: string | null;
}






export const paginateV1Results = async (
  client: HttpClient,
  endpoint: string,
  fetchAll: boolean,
  params: V1PaginationParams = {},
): Promise<{ data: unknown }> => {
  if (!fetchAll) {
    const { data } = await client.get(endpoint, { params });
    return { data };
  }

  const limit = params.limit || DEFAULT_V1_LIMIT;
  const allResults: unknown[] = [];
  let currentOffset = 0;
  let pagesFetched = 0;

  const { limit: _l, offset: _o, ...otherParams } = params;

  let hasMore = true;
  while (hasMore && pagesFetched < MAX_PAGES) {
    const { data } = await client.get(endpoint, {
      params: { ...otherParams, limit, offset: currentOffset },
    });

    pagesFetched++;

    if (!Array.isArray(data) || data.length === 0) {
      break;
    }

    allResults.push(...data);

    if (data.length < limit) {
      hasMore = false;
    } else {
      currentOffset += limit;
    }
  }

  return { data: allResults };
};






export const paginateV2Results = async (
  client: HttpClient,
  endpoint: string,
  fetchAll: boolean,
  params: V2PaginationParams = {},
): Promise<{ data: unknown }> => {
  if (!fetchAll) {
    const { data } = await client.get(endpoint, { params });
    return { data };
  }

  const allResults: unknown[] = [];
  let pagesFetched = 0;
  let currentCursor: string | undefined;

  const { cursor: _c, ...otherParams } = params;

  let hasMore = true;
  while (hasMore && pagesFetched < MAX_PAGES) {
    const requestParams: Record<string, unknown> = { ...otherParams };
    if (currentCursor) {
      requestParams.cursor = currentCursor;
    }

    const { data } = await client.get<V2Response>(endpoint, {
      params: requestParams,
    });

    pagesFetched++;

    const results = data?.data;
    if (Array.isArray(results)) {
      allResults.push(...results);
    }

    if (data?.next_link) {
      const url = new URL(data.next_link);
      currentCursor = url.searchParams.get("cursor") || undefined;
      if (!currentCursor) {
        hasMore = false;
      }
    } else {
      hasMore = false;
    }
  }

  return { data: { data: allResults, next_link: null } };
};






export const paginateV1CompanyActivity = async (
  client: HttpClient,
  endpoint: string,
  fetchAll: boolean,
  params: { next?: string; limit?: string; [key: string]: unknown } = {},
): Promise<{ data: unknown }> => {
  if (!fetchAll) {
    const { data } = await client.get(endpoint, { params });
    return { data };
  }

  const allResults: unknown[] = [];
  let pagesFetched = 0;
  let currentNext: string | undefined;

  const { next: _n, ...otherParams } = params;

  let hasMore = true;
  while (hasMore && pagesFetched < MAX_PAGES) {
    const requestParams: Record<string, unknown> = { ...otherParams };
    if (currentNext) {
      requestParams.next = currentNext;
    }

    const { data } = await client.get<{ results?: unknown[]; next?: string }>(
      endpoint,
      { params: requestParams },
    );

    pagesFetched++;

    if (Array.isArray(data?.results)) {
      allResults.push(...data.results);
    }

    if (data?.next) {
      currentNext = data.next;
    } else {
      hasMore = false;
    }
  }

  return { data: { results: allResults, next: null } };
};
