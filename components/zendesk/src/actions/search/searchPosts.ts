import { action, outputSchema } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../auth";
import { searchPostsExamplePayload } from "../../examplePayloads";
import { searchPostsInputs } from "../../inputs";
import { searchPostsOutputSchema } from "../../outputSchemas";
import type { PaginatedResponse } from "../../types";
export const searchPosts = action({
  display: {
    label: "Search Posts",
    description: "Search posts in the Help Center.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { searchQuery, filters, dateRangeFilters, zendeskConnection },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const params = {
      query: searchQuery,
      sort_by: filters.sortBy,
      sort_order: filters.sortOrder,
      topic: filters.topicId,
      updated_after: dateRangeFilters.filterUpdatedAfter,
      updated_at: dateRangeFilters.filterUpdatedAt,
      updated_before: dateRangeFilters.filterUpdatedBefore,
      created_before: dateRangeFilters.filterCreatedBefore,
      created_after: dateRangeFilters.filterCreatedAfter,
      created_at: dateRangeFilters.filterCreatedAt,
    };
    const { data } = await client.get<
      PaginatedResponse<{
        results: unknown;
      }>
    >("/help_center/community_posts/search", { params });
    return { data };
  },
  examplePerform: async () => searchPostsExamplePayload,
  inputs: searchPostsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: searchPostsOutputSchema,
  }),
  examplePayload: searchPostsExamplePayload,
});
