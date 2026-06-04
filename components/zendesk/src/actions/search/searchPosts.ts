import { action } from "@prismatic-io/spectral";
import {
  connectionInput,
  filterCreatedAfter,
  filterCreatedAt,
  filterCreatedBefore,
  filterUpdatedAfter,
  filterUpdatedAt,
  filterUpdatedBefore,
  searchQuery,
  sortBy,
  sortOrder,
  topicId,
} from "../../inputs";
import { rawHttpClient } from "../../auth";
import { searchPostsPayload } from "../../examplePayloads";
import type { PaginatedResponse } from "../../types";

export const searchPosts = action({
  display: {
    label: "Search Posts",
    description: "Search posts in the Help Center.",
  },
  perform: async (
    context,
    {
      searchQuery,
      sortBy,
      sortOrder,
      topicId,
      filterUpdatedAfter,
      filterUpdatedAt,
      filterUpdatedBefore,
      filterCreatedBefore,
      filterCreatedAfter,
      filterCreatedAt,
      zendeskConnection,
    },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const params = {
      query: searchQuery,
      sort_by: sortBy || undefined,
      sort_order: sortOrder || undefined,
      topic: topicId || undefined,
      updated_after: filterUpdatedAfter || undefined,
      updated_at: filterUpdatedAt || undefined,
      updated_before: filterUpdatedBefore || undefined,
      created_before: filterCreatedBefore || undefined,
      created_after: filterCreatedAfter || undefined,
      created_at: filterCreatedAt || undefined,
    };

    const { data } = await client.get<PaginatedResponse<{ results: unknown }>>(
      "/help_center/community_posts/search",
      { params },
    );

    return { data };
  },
  inputs: {
    zendeskConnection: connectionInput,
    topicId: {
      ...topicId,
      required: false,
      comments: "The ID of the topic to filter posts by.",
    },
    searchQuery,
    filterCreatedAt,
    filterCreatedBefore,
    filterCreatedAfter,
    sortBy: {
      ...sortBy,
      model: [
        {
          label: "Created At",
          value: "created_at",
        },
        {
          label: "Updated At",
          value: "updated_at",
        },
      ],
    },
    filterUpdatedAfter,
    filterUpdatedAt,
    filterUpdatedBefore,
    sortOrder,
  },
  examplePayload: {
    data: searchPostsPayload as unknown,
  },
});
