import { type ActionContext, action } from "@prismatic-io/spectral";
import { getHubspotClient } from "../client";
import { MAX_SEARCH_LIMIT } from "../constants";
import { searchPayload } from "../examplePayloads";
import {
  connectionInput,
  fetchAll,
  objectType,
  searchEndpoint,
  searchLimit,
  searchProperties,
  timeout,
} from "../inputs";
import type { SearchObjectParams } from "../types/PollingTriggerObject";
import type { SearchResponse } from "../types/SearchResponse";
import { setSearchFilterGroups } from "../util";

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

  if (searchOnlyCustomObjects) searchEndpoint = "/crm/v3/objects/{objectType}/search";

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
      const { data: nextData } = await client.post<SearchResponse>(searchEndpoint, nextPayload);
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
    description: "Filter, sort, and search objects, records, and engagements across the CRM.",
  },
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
  inputs: {
    hubspotConnection: connectionInput,
    searchEndpoint,
    searchProperties,
    objectType: {
      ...objectType,
      required: false,
      comments:
        "The type of custom object to search for. Required for the Custom objects search endpoint.",
    },
    searchLimit,
    fetchAll: {
      ...fetchAll,
      comments: `Turn this ON to get more than ${MAX_SEARCH_LIMIT} results. Note that this can be a large amount of data.`,
    },
    timeout,
  },
  examplePayload: searchPayload,
});

export const searchNoCustomObjects = async (context: ActionContext, params) => {
  const lastPolledAt = params.lastPolledAt as string | undefined;
  setSearchFilterGroups(params, lastPolledAt);
  return searchPerform(context, params);
};

export const searchOnlyCustomObjects = async (context: ActionContext, params) => {
  const lastPolledAt = params.lastPolledAt as string | undefined;
  setSearchFilterGroups(params, lastPolledAt);
  return searchPerform(context, params, true);
};
