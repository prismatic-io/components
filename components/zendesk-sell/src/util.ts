import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type { ZendeskSellResponse } from "./types";

export const fetchAllPages = async (
  client: HttpClient,
  endpoint: string,
  fetchAll: boolean,
  params: Record<string, unknown> = {},
): Promise<ZendeskSellResponse> => {
  if (!fetchAll) {
    const { data } = await client.get<ZendeskSellResponse>(endpoint, {
      params,
      headers: { Accept: "application/json" },
    });
    return data;
  }

  const allItems: unknown[] = [];
  let currentPage = 1;
  let hasMore = true;

  do {
    const { data } = await client.get<ZendeskSellResponse>(endpoint, {
      params: { ...params, page: currentPage, per_page: 100 },
      headers: { Accept: "application/json" },
    });
    const items = data?.items || [];
    allItems.push(...items);

    hasMore = !!data?.meta?.links?.next_page;
    currentPage += 1;
  } while (hasMore);

  return {
    items: allItems,
    meta: { links: {} },
  };
};
