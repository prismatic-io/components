import { action, outputSchema } from "@prismatic-io/spectral";
import { searchResponseSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { MAX_SEARCH_LIMIT } from "../../constants";
import { searchExamplePayload } from "../../examplePayloads";
import { searchInputs } from "../../inputs";
import type { SearchObjectParams, SearchResponse } from "../../types";
const searchPerform = async (
  context,
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
) => {
  const debugRequest = context.debug.enabled;
  const client = getHubspotClient({
    hubspotConnection,
    timeout,
    debugRequest,
    headers: { "Content-Type": "application/json" },
  });
  if (searchOnlyCustomObjects)
    searchEndpoint = "/crm/v3/objects/{objectType}/search";
  if (searchEndpoint === "/crm/v3/objects/{objectType}/search") {
    if (!objectType) {
      throw new Error("Object Type input is required");
    }
    searchEndpoint = searchEndpoint.replace("{objectType}", objectType);
  }
  const payload = {
    limit: fetchAll ? MAX_SEARCH_LIMIT : searchLimit,
    ...searchProperties,
  };
  const { data } = await client.post<SearchResponse>(searchEndpoint, payload);
  if (fetchAll) {
    while (data.paging?.next) {
      const { after } = data.paging.next;
      const nextPayload = {
        limit: MAX_SEARCH_LIMIT,
        after,
        ...searchProperties,
      };
      const { data: nextData } = await client.post<SearchResponse>(
        searchEndpoint,
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
export const search = action({
  display: {
    label: "Search Records",
    description:
      "Filter, sort, and search objects, records, and engagements across the CRM.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      timeout,
      hubspotConnection,
      searchEndpoint,
      searchProperties,
      objectType,
      fetchAll,
      searchLimit,
    },
  ) => {
    return searchPerform(context, {
      timeout,
      hubspotConnection,
      searchEndpoint,
      searchProperties,
      objectType,
      fetchAll,
      searchLimit,
    });
  },
  inputs: searchInputs,
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: searchExamplePayload.data,
  }),
  examplePayload: searchExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: searchResponseSchema,
  }),
});
