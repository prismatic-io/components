import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type { PaginatedResponse, PaginationOptions } from "../types";











export async function paginateResults(
  client: HttpClient,
  endpoint: string,
  fetchAll: boolean,
  params: Record<string, unknown> = {},
  options: PaginationOptions = {},
) {
  const { itemsField = "items", preserveFields = [] } = options;

  
  
  const queryParams = fetchAll
    ? { ...params, $page: 1, $pageSize: 500 }
    : params;

  
  const { data: firstPage } = await client.get<PaginatedResponse>(endpoint, {
    params: queryParams,
  });

  if (!fetchAll) {
    
    return firstPage;
  }

  
  const totalPages = Math.ceil(firstPage.count / firstPage.pageSize);

  if (totalPages === 1) {
    
    return firstPage;
  }

  
  const pagePromises: Promise<PaginatedResponse>[] = [];

  
  const batchSize = 10;

  for (let page = 2; page <= totalPages; page++) {
    const pagePromise = client
      .get<PaginatedResponse>(endpoint, {
        params: {
          ...queryParams,
          $page: page,
        },
      })
      .then((response) => response.data);

    pagePromises.push(pagePromise);
  }

  
  const allItems = [...(firstPage[itemsField] || [])];

  
  for (let i = 0; i < pagePromises.length; i += batchSize) {
    const batch = pagePromises.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch);

    
    for (const pageData of batchResults) {
      allItems.push(...(pageData[itemsField] || []));
    }
  }

  
  const response: PaginatedResponse = {
    count: firstPage.count,
    page: 1, 
    pageSize: firstPage.count, 
    [itemsField]: allItems,
  };

  
  for (const field of preserveFields) {
    if (field in firstPage) {
      response[field] = firstPage[field];
    }
  }

  return response;
}
