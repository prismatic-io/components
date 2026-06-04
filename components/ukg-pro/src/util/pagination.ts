import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { DEFAULT_PAGE_SIZE, MAX_PAGES } from "../constants";
import type { FetchAllPagesOptions, PaginatedResponse } from "../types/utils";




const extractItems = <T>(response: PaginatedResponse<T> | T[], itemsKey?: string): T[] => {
  
  if (Array.isArray(response)) {
    return response;
  }

  if (itemsKey && response[itemsKey as keyof PaginatedResponse<T>]) {
    return response[itemsKey as keyof PaginatedResponse<T>] as T[];
  }

  
  return (
    response.data ||
    response.items ||
    response.results ||
    response.employees ||
    response.newHires ||
    response.jobs ||
    response.locations ||
    response.positions ||
    []
  );
};























export const fetchAllPages = async <T>(
  client: HttpClient,
  endpoint: string,
  options: FetchAllPagesOptions = {},
): Promise<T[]> => {
  const { params = {}, pageSize = DEFAULT_PAGE_SIZE, itemsKey } = options;

  const allItems: T[] = [];
  let currentPage = 1;
  let hasMore = true;

  while (hasMore && currentPage <= MAX_PAGES) {
    const requestParams = {
      ...params,
      page: currentPage,
      per_page: pageSize,
    };

    const { data } = await client.get<PaginatedResponse<T>>(endpoint, { params: requestParams });

    const items = extractItems(data, itemsKey);
    allItems.push(...items);

    
    
    hasMore = items.length === pageSize;
    currentPage++;
  }

  return allItems;
};











export const fetchWithPagination = async <T>(
  client: HttpClient,
  endpoint: string,
  params: Record<string, unknown>,
  fetchAll: boolean | undefined,
  itemsKey?: string,
): Promise<{ data: T[] | PaginatedResponse<T> }> => {
  if (fetchAll) {
    const allItems = await fetchAllPages<T>(client, endpoint, { params, itemsKey });
    return { data: allItems };
  }

  const { data } = await client.get<PaginatedResponse<T>>(endpoint, { params });
  return { data };
};
