import { util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { DEFAULT_PAGE_SIZE } from "../constants";
import type { PaginationOptions } from "../types";










export const fetchPaginatedResults = async (
  client: HttpClient,
  url: string,
  options: PaginationOptions = {},
) => {
  const {
    fetchAll = false,
    pageNumber,
    pageSize,
    dataKey,
    additionalParams,
  } = options;
  const size = pageSize || DEFAULT_PAGE_SIZE;

  if (!fetchAll) {
    const { data } = await client.get(url, {
      params: {
        ...(pageNumber ? { "page[number]": pageNumber } : {}),
        ...(pageSize ? { "page[size]": size } : {}),
        ...additionalParams,
      },
    });
    return data;
  }

  const allResults: Record<string, unknown>[] = [];
  let currentPage = 1;
  let firstResponse: Record<string, unknown> | null = null;
  let keepFetching = true;

  while (keepFetching) {
    const { data } = await client.get(url, {
      params: {
        "page[number]": currentPage,
        "page[size]": size,
        ...additionalParams,
      },
    });

    if (!firstResponse) {
      firstResponse = data;
    }

    const pageResults = dataKey ? data[dataKey] : data;

    if (!Array.isArray(pageResults) || pageResults.length === 0) {
      keepFetching = false;
    }

    allResults.push(...pageResults);

    if (pageResults.length < util.types.toNumber(size)) {
      keepFetching = false;
    }

    currentPage++;
  }

  if (dataKey && firstResponse) {
    return { ...firstResponse, [dataKey]: allResults };
  }

  return allResults;
};
