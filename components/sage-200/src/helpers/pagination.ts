import { DEFAULT_PAGE_SIZE, MAX_PAGES } from "../constants";
import type { PaginateOptions } from "../types";

export type { PaginateOptions } from "../types";

export const paginateResults = async ({
  client,
  endpoint,
  fetchAll,
  pageSize,
}: PaginateOptions) => {
  if (fetchAll) {
    const allResults: unknown[] = [];
    const limit = pageSize || DEFAULT_PAGE_SIZE;
    let skip = 0;
    let pages = 0;

    do {
      const { data } = await client.get<unknown[]>(endpoint, {
        params: {
          $top: limit,
          $skip: skip,
          $orderby: "id",
        },
      });
      allResults.push(...(data || []));
      if (!data || data.length < limit) break;
      skip += limit;
      pages++;
    } while (pages < MAX_PAGES);

    return { data: allResults };
  }

  const { data } = await client.get(endpoint, {
    params: {
      $top: pageSize || undefined,
      $orderby: "id",
    },
  });
  return { data };
};
