import type { HttpClient } from "@prismatic-io/spectral/http";
import { MAX_FETCH_ALL_PAGES, MAX_PAGE_LIMIT } from "../constants";
import type { CursorPageResponse, PaginationParams } from "../types";

export const fetchCursorPages = async <T>(
  client: HttpClient,
  url: string,
  query: Record<string, unknown>,
  { fetchAll, cursor, limit }: PaginationParams,
): Promise<CursorPageResponse<T>> => {
  if (!fetchAll) {
    const { data } = await client.get<CursorPageResponse<T>>(url, {
      params: { ...query, cursor, limit },
    });
    return { items: data.items ?? [], cursor: data.cursor };
  }

  const items: T[] = [];
  let next: string | undefined = cursor;
  let pages = 0;
  do {
    const { data } = await client.get<CursorPageResponse<T>>(url, {
      params: { ...query, cursor: next, limit: MAX_PAGE_LIMIT },
    });
    items.push(...(data.items ?? []));
    next = data.cursor;
    pages++;
  } while (next && pages < MAX_FETCH_ALL_PAGES);
  return { items, cursor: next };
};
