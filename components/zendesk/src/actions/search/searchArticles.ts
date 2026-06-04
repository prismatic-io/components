import { action } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../auth";
import { searchArticlesPayload } from "../../examplePayloads";
import type { PaginatedResponse } from "../../types";
import {
  brandIds,
  categoryIds,
  connectionInput,
  filterCreatedAfter,
  filterCreatedAt,
  filterCreatedBefore,
  filterLabelNames,
  filterSectionId,
  filterUpdatedAfter,
  filterUpdatedAt,
  filterUpdatedBefore,
  locales,
  searchQuery,
  shouldFilterMultibrand,
  sortBy,
  sortOrder,
} from "../../inputs";

export const searchArticles = action({
  display: {
    label: "Search Articles",
    description: "Search for articles in the Help Center.",
  },
  perform: async (
    context,
    {
      zendeskConnection,
      searchQuery,
      brandIds,
      categoryIds,
      filterCreatedAfter,
      filterCreatedAt,
      filterCreatedBefore,
      filterLabelNames,
      filterSectionId,
      filterUpdatedAfter,
      filterUpdatedAt,
      filterUpdatedBefore,
      shouldFilterMultibrand,
      sortOrder,
      sortBy,
      filterLocale,
    },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const params = {
      query: searchQuery,
      brand_ids: brandIds || undefined,
      category_id: categoryIds || undefined,
      filter: filterCreatedAfter || undefined,
      created_at: filterCreatedAt || undefined,
      created_before: filterCreatedBefore || undefined,
      label_names: filterLabelNames || undefined,
      section_id: filterSectionId || undefined,
      updated_at: filterUpdatedAt || undefined,
      updated_before: filterUpdatedBefore || undefined,
      updated_after: filterUpdatedAfter || undefined,
      should_filter_multibrand: shouldFilterMultibrand,
      sort_order: sortOrder || undefined,
      sort_by: sortBy || undefined,
      locale: filterLocale || undefined,
    };

    const { data } = await client.get<PaginatedResponse<{ results: unknown }>>(
      "/help_center/articles/search",
      {
        params,
      },
    );

    return {
      data,
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
    filterLocale: {
      ...locales,
      required: false,
      comments: "The locale to filter the results by.",
    },
    searchQuery,
    brandIds,
    categoryIds,
    filterSectionId,
    filterCreatedAfter,
    filterCreatedAt,
    filterCreatedBefore,
    filterLabelNames,
    filterUpdatedAt,
    filterUpdatedBefore,
    filterUpdatedAfter,
    shouldFilterMultibrand,
    sortOrder,
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
  },
  examplePayload: {
    data: searchArticlesPayload as unknown,
  },
});
