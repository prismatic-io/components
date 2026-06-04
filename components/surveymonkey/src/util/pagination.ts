import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { MAX_PAGE_SIZE } from "../constants";
import type { PaginatedResponse } from "../types";

export const paginateResults = async <T>(
  client: HttpClient,
  endpoint: string,
  fetchAll: boolean = false,
  params: Record<string, unknown> = {},
): Promise<PaginatedResponse<T>> => {
  
  if (!fetchAll) {
    const response = await client.get<PaginatedResponse<T>>(endpoint, {
      params,
    });
    return response.data;
  }

  
  const fetchAllParams = { ...params };
  delete fetchAllParams.page;
  delete fetchAllParams.per_page;

  
  const firstResponse = await client.get<PaginatedResponse<T>>(endpoint, {
    params: {
      ...fetchAllParams,
      page: 1,
      per_page: MAX_PAGE_SIZE,
    },
  });

  
  const allData: T[] = [...(firstResponse.data.data || [])];
  let currentPage = 1;
  let lastResponse = firstResponse;

  
  while (lastResponse.data.links?.next != null) {
    currentPage++;
    const nextResponse = await client.get<PaginatedResponse<T>>(endpoint, {
      params: {
        ...fetchAllParams,
        page: currentPage,
        per_page: MAX_PAGE_SIZE,
      },
    });

    const pageData = nextResponse.data.data || [];
    allData.push(...pageData);
    lastResponse = nextResponse;
  }
  delete lastResponse.data.page;
  delete lastResponse.data.per_page;
  delete lastResponse.data.links;
  
  return {
    ...lastResponse.data,
    data: allData,
  };
};
