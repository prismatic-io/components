const MAX_PAGES = 100;





export const paginateResults = async (
  // biome-ignore lint/suspicious/noExplicitAny: BigQuery SDK schema types lack index signatures
  listFn: (params: any) => Promise<{ data: any }>,
  params: Record<string, unknown>,
  fetchAll: boolean,
  dataField: string,
): Promise<{ data: unknown }> => {
  if (!fetchAll) {
    const { data } = await listFn(params);
    return { data };
  }

  const allResults: unknown[] = [];
  let pagesFetched = 0;
  let currentPageToken: string | undefined;

  
  const { pageToken: _pt, ...otherParams } = params;

  let hasMore = true;
  while (hasMore && pagesFetched < MAX_PAGES) {
    const requestParams: Record<string, unknown> = { ...otherParams };
    if (currentPageToken) {
      requestParams.pageToken = currentPageToken;
    }

    const { data } = await listFn(requestParams);
    pagesFetched++;

    const results = data?.[dataField];
    if (Array.isArray(results)) {
      allResults.push(...results);
    }

    
    const nextToken = (data?.nextPageToken || data?.pageToken) as
      | string
      | undefined;
    if (nextToken) {
      currentPageToken = nextToken;
    } else {
      hasMore = false;
    }
  }

  return { data: { [dataField]: allResults } };
};
