import type { CannyClient, CursorResult, OffsetResult } from "../types";
import { DEFAULT_PAGE_SIZE } from "./constants";

export const paginateOffset = async <K extends string, T = unknown>(
  post: CannyClient["post"],
  path: string,
  resourceKey: K,
  params: Record<string, unknown>,
  fetchAll: boolean,
): Promise<OffsetResult<K, T>> => {
  if (!fetchAll) {
    return post<OffsetResult<K, T>>(path, params);
  }

  const allItems: T[] = [];
  let hasMore = true;
  let skipCount = 0;

  while (hasMore) {
    const page = await post<OffsetResult<K, T>>(path, {
      ...params,
      skip: skipCount,
      limit: DEFAULT_PAGE_SIZE,
    });
    const items = page[resourceKey];
    allItems.push(...items);
    hasMore = page.hasMore;
    skipCount += items.length;
  }

  return { [resourceKey]: allItems, hasMore: false } as OffsetResult<K, T>;
};

export const paginateCursor = async <K extends string, T = unknown>(
  postV2: CannyClient["postV2"],
  path: string,
  resourceKey: K,
  params: Record<string, unknown>,
  fetchAll: boolean,
): Promise<CursorResult<K, T>> => {
  if (!fetchAll) {
    return postV2<CursorResult<K, T>>(path, params);
  }

  const allItems: T[] = [];
  let hasNextPage = true;
  let currentCursor: string | undefined;

  while (hasNextPage) {
    const page = await postV2<CursorResult<K, T>>(path, {
      ...params,
      cursor: currentCursor,
      limit: DEFAULT_PAGE_SIZE,
    });
    const items = page[resourceKey];
    allItems.push(...items);
    hasNextPage = page.hasNextPage;
    currentCursor = page.cursor;
  }

  return {
    [resourceKey]: allItems,
    hasNextPage: false,
    cursor: currentCursor ?? "",
  } as CursorResult<K, T>;
};
