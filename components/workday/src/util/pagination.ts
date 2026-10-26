import { PAGINATION_DEFAULT_LIMIT, PAGINATION_MAX_PAGES } from "../constants";
import type { PaginateOptions, WorkdayListResponse } from "../types";
export const paginateResults = async ({
  client,
  endpoint,
  params = {},
  fetchAll,
  limit,
  offset,
}: PaginateOptions): Promise<{
  data: unknown;
}> => {
  if (fetchAll) {
    const allResults: unknown[] = [];
    const pageLimit = limit || PAGINATION_DEFAULT_LIMIT;
    let offset = 0;
    let pages = 0;
    do {
      const { data } = await client.get<WorkdayListResponse>(endpoint, {
        params: { ...params, limit: pageLimit, offset },
      });
      const page = data.data ?? [];
      allResults.push(...page);
      const reachedTotal =
        typeof data.total === "number"
          ? allResults.length >= data.total
          : page.length < pageLimit;
      if (page.length === 0 || reachedTotal) break;
      offset += page.length;
      pages++;
    } while (pages < PAGINATION_MAX_PAGES);
    return { data: allResults };
  }
  const { data } = await client.get(endpoint, {
    params: { ...params, limit, offset },
  });
  return { data };
};
