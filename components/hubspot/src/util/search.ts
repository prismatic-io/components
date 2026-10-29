import type { ActionContext } from "@prismatic-io/spectral";
import { getHubspotClient } from "../client";
import { MAX_SEARCH_LIMIT } from "../constants";
import type { SearchObjectParams, SearchResponse } from "../types";
import { resolveEndpoint } from "./polling";

export const searchPerform = async (
  context: ActionContext,
  {
    timeout,
    hubspotConnection,
    searchEndpoint,
    searchProperties,
    objectType,
    fetchAll,
    searchLimit,
  }: SearchObjectParams,
  searchOnlyCustomObjects = false,
): Promise<{ data: SearchResponse }> => {
  const debugRequest = context.debug.enabled;
  const client = getHubspotClient({
    hubspotConnection,
    timeout,
    debugRequest,
    headers: { "Content-Type": "application/json" },
  });

  const endpoint = resolveEndpoint(
    searchEndpoint,
    objectType,
    searchOnlyCustomObjects,
  );

  const payload = {
    limit: fetchAll ? MAX_SEARCH_LIMIT : searchLimit,
    ...searchProperties,
  };

  const { data } = await client.post<SearchResponse>(endpoint, payload);

  if (fetchAll) {
    while (data.paging?.next) {
      const { after } = data.paging.next;
      const nextPayload = {
        limit: MAX_SEARCH_LIMIT,
        after,
        ...searchProperties,
      };
      const { data: nextData } = await client.post<SearchResponse>(
        endpoint,
        nextPayload,
      );
      data.results.push(...nextData.results);
      data.paging = nextData.paging;
    }
  }

  return {
    data,
  };
};
