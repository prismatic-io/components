import { DEFAULT_PAGE_SIZE } from "../constants";
import type { PaginatedResponse, PaginateOptions } from "../interfaces";

export const paginateResults = async ({
  client,
  endpoint,
  params = {},
  pageSize,
  fetchAll,
  pageToken,
}: PaginateOptions) => {
  if (fetchAll) {
    const allResults: unknown[] = [];
    let nextToken: string | undefined = pageToken || undefined;

    do {
      const { data } = await client.get<PaginatedResponse>(endpoint, {
        params: {
          ...params,
          pageSize: pageSize || DEFAULT_PAGE_SIZE,
          pageToken: nextToken,
        },
      });
      allResults.push(...(data.results || []));
      nextToken = data.nextPageToken || undefined;
    } while (nextToken);

    return { data: allResults };
  }

  const { data } = await client.get(endpoint, {
    params: {
      ...params,
      pageSize,
      pageToken,
    },
  });

  return { data };
};
