import { action } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../auth";
import { unifiedSearchPayload } from "../../examplePayloads";
import {
  connectionInput,
  pageLimit,
  cursor,
  brandIds,
  categoryIds,
  contentTypes,
  externalSourceIds,
  sectionIds,
  topicIds,
  locales,
  searchQuery,
} from "../../inputs";
import type { PaginatedResponse } from "../../types";

export const unifiedSearch = action({
  display: {
    label: "Unified Search",
    description:
      "Search for knowledge base articles, community posts, and external records in the Help Center.",
  },
  perform: async (
    context,
    {
      zendeskConnection,
      searchQuery,
      pageLimit,
      cursor,
      brandIds,
      categoryIds,
      contentTypes,
      externalSourceIds,
      sectionIds,
      topicIds,
      locales,
    },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const params = {
      query: searchQuery,
      "filter[brand_ids]": brandIds || undefined,
      "filter[category_ids]": categoryIds || undefined,
      "filter[content_types]": contentTypes || undefined,
      "filter[external_source_ids]": externalSourceIds || undefined,
      "filter[locales]": locales || undefined,
      "filter[section_ids]": sectionIds || undefined,
      "filter[topic_ids]": topicIds || undefined,
      "page[size]": pageLimit || undefined,
      "page[after]": cursor || undefined,
    };

    const { data } = await client.get<
      PaginatedResponse<{ results: unknown[] }>
    >("/guide/search", {
      params,
    });

    return {
      data,
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
    locales,
    searchQuery,
    brandIds,
    categoryIds,
    contentTypes,
    externalSourceIds,
    sectionIds,
    topicIds,
    cursor,
    pageLimit,
  },
  examplePayload: {
    data: unifiedSearchPayload as unknown,
  },
});
