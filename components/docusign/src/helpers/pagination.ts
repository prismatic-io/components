import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";

const MAX_PAGES = 100;
const DEFAULT_COUNT = "100";

interface DocuSignListResponse {
  resultSetSize?: string;
  totalSetSize?: string;
  startPosition?: string;
  endPosition?: string;
  nextUri?: string;
  [key: string]: unknown;
}

export interface PaginateOptions {
  client: HttpClient;
  endpoint: string;
  params?: Record<string, unknown>;
  fetchAll: boolean;
  count?: string;
  startPosition?: string;
  itemsKey: string;
}

export const paginateResults = async ({
  client,
  endpoint,
  params = {},
  fetchAll,
  count,
  startPosition,
  itemsKey,
}: PaginateOptions) => {
  if (fetchAll) {
    const allResults: unknown[] = [];
    let startPosition = 0;
    const pageSize = Number(count) || Number(DEFAULT_COUNT);
    let pages = 0;

    do {
      const { data } = await client.get<DocuSignListResponse>(endpoint, {
        params: {
          ...params,
          count: String(pageSize),
          start_position: String(startPosition),
        },
      });

      const items = Array.isArray(data[itemsKey]) ? data[itemsKey] : [];
      allResults.push(...items);

      const resultSetSize = Number(data.resultSetSize) || 0;
      if (resultSetSize < pageSize) break;

      startPosition += pageSize;
      pages++;
    } while (pages < MAX_PAGES);

    return { data: allResults };
  }

  const { data } = await client.get(endpoint, {
    params: {
      ...params,
      count: count || undefined,
      start_position: startPosition || undefined,
    },
  });

  return { data };
};
