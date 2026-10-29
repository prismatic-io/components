import { DEFAULT_COUNT, MAX_PAGES } from "../constants";
import type { PaginateOptions, SegmentListResponse } from "../types";

export type { PaginateOptions } from "../types";

export const paginateResults = async ({
  client,
  endpoint,
  params = {},
  fetchAll,
  count,
  cursor,
}: PaginateOptions) => {
  if (fetchAll) {
    const allResults: Record<string, unknown[]> = {};
    let nextCursor: string | undefined;
    let pages = 0;

    do {
      const { data } = await client.get<SegmentListResponse>(endpoint, {
        params: {
          ...params,
          pagination: {
            count: count || DEFAULT_COUNT,
            cursor: nextCursor,
          },
        },
      });

      for (const [key, value] of Object.entries(data)) {
        if (key !== "pagination" && Array.isArray(value)) {
          if (!allResults[key]) allResults[key] = [];
          allResults[key].push(...value);
        }
      }

      nextCursor = data.pagination?.next || undefined;
      pages++;
    } while (nextCursor && pages < MAX_PAGES);

    return { data: allResults };
  }

  const { data } = await client.get(endpoint, {
    params: {
      ...params,
      pagination: {
        count: count || undefined,
        cursor: cursor || undefined,
      },
    },
  });

  return { data };
};
