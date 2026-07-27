import type { ODataResponse, PaginateOptions } from "../interfaces/pagination";
import { DEFAULT_PAGE_SIZE, MAX_PAGES } from "./constants";
export type { ODataResponse, PaginateOptions } from "../interfaces/pagination";
const getNextLink = (data: ODataResponse): string | undefined =>
  data["@odata.nextLink"] || data.nextLink || undefined;
export const paginateResults = async <T = unknown>({
  client,
  endpoint,
  params = {},
  fetchAll,
  pageSize,
  pageToken,
}: PaginateOptions): Promise<{
  data: ODataResponse<T>;
}> => {
  if (fetchAll) {
    const allResults: T[] = [];
    let nextLink: string | undefined;
    let pages = 0;
    const initialParams = {
      ...params,
      $top: pageSize || DEFAULT_PAGE_SIZE,
    };
    const { data: firstPage } = await client.get<ODataResponse<T>>(endpoint, {
      params: initialParams,
    });
    allResults.push(...(firstPage.value || []));
    nextLink = getNextLink(firstPage);
    pages++;
    while (nextLink && pages < MAX_PAGES) {
      const { data: page } = await client.get<ODataResponse<T>>(nextLink);
      allResults.push(...(page.value || []));
      nextLink = getNextLink(page);
      pages++;
    }
    return {
      data: {
        "@odata.context": firstPage["@odata.context"],
        value: allResults,
      },
    };
  }
  const { data } = await client.get<ODataResponse<T>>(endpoint, {
    params: {
      ...params,
      $top: pageSize || undefined,
      $skiptoken: pageToken || undefined,
    },
  });
  return { data };
};
