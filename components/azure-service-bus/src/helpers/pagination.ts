import { MAX_PAGES } from "../constants";
import type { ArmListResponse, PaginateOptions } from "../types/pagination";

export type { PaginateOptions } from "../types/pagination";

export const paginateResults = async ({
  client,
  endpoint,
  params = {},
  fetchAll,
}: PaginateOptions) => {
  if (fetchAll) {
    const allResults: unknown[] = [];
    let nextLink: string | undefined;
    let pages = 0;

    const { data: firstPage } = await client.get<ArmListResponse>(endpoint, {
      params,
    });
    allResults.push(...(firstPage.value || []));
    nextLink = firstPage.nextLink || undefined;
    pages++;

    while (nextLink && pages < MAX_PAGES) {
      const { data: page } = await client.get<ArmListResponse>(nextLink);
      allResults.push(...(page.value || []));
      nextLink = page.nextLink || undefined;
      pages++;
    }

    return { data: allResults };
  }

  const { data } = await client.get(endpoint, {
    params: Object.keys(params).length > 0 ? params : undefined,
  });
  return { data };
};
