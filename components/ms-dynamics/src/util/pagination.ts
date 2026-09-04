const MAX_PAGES = 100;
export const paginateQueryEntities = async (
  retrieveFn: (nextPageId?: string) => Promise<Record<string, unknown>>,
  fetchAll: boolean,
  nextPageId?: string,
): Promise<{
  data: unknown;
}> => {
  const result = await retrieveFn(nextPageId);
  if (!fetchAll) {
    return { data: result };
  }
  const allValues: unknown[] = [];
  let currentResult = result;
  let pagesFetched = 0;
  while (pagesFetched < MAX_PAGES) {
    pagesFetched++;
    const values = currentResult?.value;
    if (Array.isArray(values)) {
      allValues.push(...values);
    }
    const nextLink = (currentResult?.oDataNextLink ||
      currentResult?.["@odata.nextLink"]) as string | undefined;
    if (!nextLink) break;
    currentResult = await retrieveFn(nextLink);
  }
  return { data: { value: allValues } };
};
export const paginateFetchXml = async (
  executeFn: (
    pageNumber?: number,
    pagingCookie?: string,
  ) => Promise<Record<string, unknown>>,
  fetchAll: boolean,
  pageNumber?: number,
  pagingCookie?: string,
): Promise<{
  data: unknown;
}> => {
  const result = await executeFn(pageNumber, pagingCookie);
  if (!fetchAll) {
    return { data: result };
  }
  const allValues: unknown[] = [];
  let currentResult = result;
  let currentPage = pageNumber || 1;
  let pagesFetched = 0;
  while (pagesFetched < MAX_PAGES) {
    pagesFetched++;
    const values = currentResult?.value;
    if (Array.isArray(values)) {
      allValues.push(...values);
    }
    const pagingInfo = currentResult?.PagingInfo as
      | {
          cookie?: string;
          nextPage?: boolean;
        }
      | undefined;
    const cookie = pagingInfo?.cookie;
    const hasMore = pagingInfo?.nextPage;
    if (!hasMore || !cookie) break;
    currentPage++;
    currentResult = await executeFn(currentPage, cookie);
  }
  return { data: { value: allValues } };
};
export const paginateListEntities = async (
  fetchPage: (url?: string) => Promise<{
    data: Record<string, unknown>;
  }>,
  fetchAll: boolean,
): Promise<{
  data: unknown;
}> => {
  const { data: firstPage } = await fetchPage();
  if (!fetchAll) {
    return { data: firstPage };
  }
  const allValues: unknown[] = [];
  let currentData = firstPage;
  let pagesFetched = 0;
  while (pagesFetched < MAX_PAGES) {
    pagesFetched++;
    const values = currentData?.value;
    if (Array.isArray(values)) {
      allValues.push(...values);
    }
    const nextLink = currentData?.["@odata.nextLink"] as string | undefined;
    if (!nextLink) break;
    const { data } = await fetchPage(nextLink);
    currentData = data;
  }
  return { data: { value: allValues } };
};
