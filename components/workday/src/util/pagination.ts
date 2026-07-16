import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
const MAX_PAGES = 100;
const DEFAULT_LIMIT = 100;
interface WorkdayListResponse {
  data: unknown[];
  total: number;
}
export interface PaginateOptions {
  client: HttpClient;
  endpoint: string;
  params?: Record<string, unknown>;
  fetchAll: boolean;
  limit?: number;
  offset?: number;
}
export const paginateResults = async ({
  client,
  endpoint,
  params = {},
  fetchAll,
  limit,
  offset,
}: PaginateOptions) => {
  if (fetchAll) {
    const allResults: unknown[] = [];
    const pageLimit = limit || DEFAULT_LIMIT;
    let offset = 0;
    let pages = 0;
    do {
      const { data } = await client.get<WorkdayListResponse>(endpoint, {
        params: { ...params, limit: pageLimit, offset },
      });
      allResults.push(...(data.data || []));
      if (!data.data || data.data.length < pageLimit) break;
      offset += pageLimit;
      pages++;
    } while (pages < MAX_PAGES);
    return { data: allResults };
  }
  const { data } = await client.get(endpoint, {
    params: { ...params, limit, offset },
  });
  return { data };
};
