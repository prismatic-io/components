import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type { PaginatedResponse } from "./interfaces";
import util from "@prismatic-io/spectral/dist/util";
import type { ElementWithLabel } from "./types";

export async function fetchPaginatedData<T>(
  client: HttpClient,
  url: string,
  fetchAll: boolean,
  queryParams: Record<string, unknown>,
): Promise<PaginatedResponse<T>> {
  const params = { ...queryParams };

  if (fetchAll) {
    delete params.nextPageToken;
  }

  const { data: firstData } = await client.get(url, { params });

  if (!fetchAll) {
    return firstData;
  }

  let allResults: T[] = [...(firstData.result || [])];
  let nextPageToken = firstData.nextPageToken;
  let lastResponse = firstData;

  while (nextPageToken) {
    params.nextPageToken = nextPageToken;
    const { data } = await client.get(url, { params });

    allResults = allResults.concat(data.result || []);
    nextPageToken = data.nextPageToken;
    lastResponse = data;
  }

  return {
    ...lastResponse,
    result: allResults,
  };
}

export const filterAndSort = (
  items: ElementWithLabel[],
  searchQuery: string | undefined,
) => {
  return items
    .filter((item) =>
      searchQuery
        ? item.label.toLowerCase().includes(searchQuery.toLowerCase())
        : true,
    )
    .sort((a, b) => a.label.localeCompare(b.label));
};

export const toOptionalString = (value: unknown): string | undefined => {
  return value ? util.types.toString(value) : undefined;
};
