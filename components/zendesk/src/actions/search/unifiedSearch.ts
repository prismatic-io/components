import { action, outputSchema } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../auth";
import { unifiedSearchExamplePayload } from "../../examplePayloads";
import { unifiedSearchInputs } from "../../inputs";
import { unifiedSearchOutputSchema } from "../../outputSchemas";
import type { PaginatedResponse } from "../../types";
export const unifiedSearch = action({
  display: {
    label: "Unified Search",
    description:
      "Search for knowledge base articles, community posts, and external records in the Help Center.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      zendeskConnection,
      searchQuery,
      pagination,
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
      "filter[brand_ids]": brandIds,
      "filter[category_ids]": categoryIds,
      "filter[content_types]": contentTypes,
      "filter[external_source_ids]": externalSourceIds,
      "filter[locales]": locales,
      "filter[section_ids]": sectionIds,
      "filter[topic_ids]": topicIds,
      "page[size]": pagination.pageLimit,
      "page[after]": pagination.cursor,
    };
    const { data } = await client.get<
      PaginatedResponse<{
        results: unknown[];
      }>
    >("/guide/search", {
      params,
    });
    return {
      data,
    };
  },
  examplePerform: async () => unifiedSearchExamplePayload,
  inputs: unifiedSearchInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: unifiedSearchOutputSchema,
  }),
  examplePayload: unifiedSearchExamplePayload,
});
