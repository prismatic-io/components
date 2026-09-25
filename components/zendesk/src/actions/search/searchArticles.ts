import { action, outputSchema } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../auth";
import { searchArticlesExamplePayload } from "../../examplePayloads";
import { searchArticlesInputs } from "../../inputs";
import { searchArticlesOutputSchema } from "../../outputSchemas";
import type { PaginatedResponse } from "../../types";
export const searchArticles = action({
  display: {
    label: "Search Articles",
    description: "Search for articles in the Help Center.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      zendeskConnection,
      searchQuery,
      brandIds,
      categoryIds,
      dateRangeFilters,
      filterLabelNames,
      filters,
      filterLocale,
    },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const params = {
      query: searchQuery,
      brand_ids: brandIds,
      category_id: categoryIds,
      created_after: dateRangeFilters.filterCreatedAfter,
      created_at: dateRangeFilters.filterCreatedAt,
      created_before: dateRangeFilters.filterCreatedBefore,
      label_names: filterLabelNames,
      section_id: filters.filterSectionId,
      updated_at: dateRangeFilters.filterUpdatedAt,
      updated_before: dateRangeFilters.filterUpdatedBefore,
      updated_after: dateRangeFilters.filterUpdatedAfter,
      should_filter_multibrand: filters.shouldFilterMultibrand,
      sort_order: filters.sortOrder,
      sort_by: filters.sortBy,
      locale: filterLocale,
    };
    const { data } = await client.get<
      PaginatedResponse<{
        results: unknown;
      }>
    >("/help_center/articles/search", {
      params,
    });
    return {
      data,
    };
  },
  examplePerform: async () => searchArticlesExamplePayload,
  inputs: searchArticlesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: searchArticlesOutputSchema,
  }),
  examplePayload: searchArticlesExamplePayload,
});
