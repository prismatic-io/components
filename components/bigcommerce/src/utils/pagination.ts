import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";

const MAX_PAGES = 100;






export const paginateResults = async (
  client: HttpClient,
  endpoint: string,
  fetchAll: boolean,
  params: Record<string, unknown> = {},
): Promise<{ data: unknown }> => {
  if (!fetchAll) {
    const { data } = await client.get(endpoint, { params });
    return { data };
  }

  const allResults: unknown[] = [];
  let pagesFetched = 0;
  let currentPage = 1;
  let totalPages = 1;

  
  const { page: _p, ...otherParams } = params;

  while (currentPage <= totalPages && pagesFetched < MAX_PAGES) {
    const { data } = await client.get(endpoint, {
      params: { ...otherParams, page: currentPage },
    });

    pagesFetched++;

    
    if (data?.data && Array.isArray(data.data)) {
      allResults.push(...data.data);
      if (data?.meta?.pagination?.total_pages) {
        totalPages = data.meta.pagination.total_pages;
      }
    } else if (Array.isArray(data)) {
      
      allResults.push(...data);
      if (data.length === 0) break;
    } else {
      
      return { data };
    }

    currentPage++;
  }

  return { data: allResults };
};
