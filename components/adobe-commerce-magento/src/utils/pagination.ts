import { DEFAULT_PAGE_SIZE, MAX_PAGES } from "../constants";
import type { MagentoListResponse, PaginateOptions } from "../types";
export const removeUndefinedValuesFromObject = (
  obj: Record<string, unknown>,
): Record<string, unknown> => {
  const newObj: Record<string, unknown> = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] !== undefined) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};
export const paginateResults = async ({
  client,
  endpoint,
  queryParams = {},
  fetchAll,
}: PaginateOptions): Promise<{
  data: unknown;
}> => {
  if (fetchAll) {
    const allItems: unknown[] = [];
    const limit =
      (queryParams["searchCriteria[pageSize]"] as string) || DEFAULT_PAGE_SIZE;
    const {
      "searchCriteria[pageSize]": _ps,
      "searchCriteria[currentPage]": _cp,
      ...filterParams
    } = queryParams;
    let page = 1;
    do {
      const params = {
        ...filterParams,
        "searchCriteria[pageSize]": limit,
        "searchCriteria[currentPage]": String(page),
      };
      const { data } = await client.get<MagentoListResponse>(endpoint, {
        params,
      });
      const items = Array.isArray(data?.items) ? data.items : [];
      allItems.push(...items);
      if (items.length < Number(limit)) break;
      page++;
    } while (page <= MAX_PAGES);
    return { data: allItems };
  }
  const { data } = await client.get(endpoint, {
    params: Object.keys(queryParams).length > 0 ? queryParams : undefined,
  });
  return { data };
};
