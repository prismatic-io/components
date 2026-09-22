import { util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { HttpMethod, MAX_PAGE_SIZE } from "../constants";
import type { HttpResponse, NotionPage, PollingRound } from "../types";
export const getPaginatedData = async (
  client: HttpClient,
  method: HttpMethod,
  url: string,
  fetchAll: boolean,
  data?: Record<string, unknown>,
  params?: Record<string, unknown>,
): Promise<HttpResponse> => {
  const config = {
    method,
    url,
    data,
    params,
  };
  let response = await client(config);
  if (!fetchAll) {
    return response;
  }
  const allResults: unknown[] = [...(response.data?.results ?? [])];
  let nextCursor = response.data?.next_cursor;
  while (nextCursor) {
    const nextPageConfig = params
      ? { ...config, params: { ...params, start_cursor: nextCursor } }
      : { ...config, data: { ...(data ?? {}), start_cursor: nextCursor } };
    const nextPageResponse = await client(nextPageConfig);
    allResults.push(...(nextPageResponse.data?.results ?? []));
    nextCursor = nextPageResponse.data?.next_cursor;
    response = {
      ...nextPageResponse,
      data: {
        ...nextPageResponse.data,
        results: allResults,
      },
    };
  }
  return response;
};
export const fetchSearchResultsRound = async (
  client: HttpClient,
  objectType: "page" | "data_source",
  since: string,
  startCursor: string | undefined,
  maxPages: number,
): Promise<PollingRound> => {
  const sinceMs = new Date(since).getTime();
  const records: NotionPage[] = [];
  let cursor = startCursor;
  for (let page = 0; page < maxPages; page++) {
    const { data } = await client({
      method: HttpMethod.POST,
      url: "/search",
      data: {
        filter: {
          value: objectType,
          property: "object",
        },
        sort: {
          timestamp: "last_edited_time",
          direction: "descending",
        },
        page_size: MAX_PAGE_SIZE,
        ...(cursor ? { start_cursor: cursor } : {}),
      },
    });
    for (const record of (data?.results ?? []) as NotionPage[]) {
      const editedMs = new Date(record.last_edited_time).getTime();
      if (!Number.isNaN(editedMs) && editedMs < sinceMs) {
        return { records, nextCursor: null };
      }
      records.push(record);
    }
    if (!data?.has_more || !data?.next_cursor) {
      return { records, nextCursor: null };
    }
    cursor = util.types.toString(data.next_cursor);
  }
  return { records, nextCursor: cursor ?? null };
};
export const fetchDataSourceItemsRound = async (
  client: HttpClient,
  dataSourceId: string,
  since: string,
  startCursor: string | undefined,
  maxPages: number,
): Promise<PollingRound> => {
  const records: NotionPage[] = [];
  let cursor = startCursor;
  for (let page = 0; page < maxPages; page++) {
    const { data } = await client({
      method: HttpMethod.POST,
      url: `/data_sources/${dataSourceId}/query`,
      data: {
        filter: {
          timestamp: "last_edited_time",
          last_edited_time: {
            on_or_after: since,
          },
        },
        sorts: [{ timestamp: "last_edited_time", direction: "ascending" }],
        page_size: MAX_PAGE_SIZE,
        ...(cursor ? { start_cursor: cursor } : {}),
      },
    });
    records.push(...((data?.results ?? []) as NotionPage[]));
    if (!data?.has_more || !data?.next_cursor) {
      return { records, nextCursor: null };
    }
    cursor = util.types.toString(data.next_cursor);
  }
  return { records, nextCursor: cursor ?? null };
};
