import { action } from "@prismatic-io/spectral";
import {
  connectionInput,
  fetchAll,
  locale,
  pageLimit,
  sortBy,
  sortOrder,
} from "../../inputs";
import { rawHttpClient } from "../../auth";
import type { Category, PaginatedResponse } from "../../types";
import { listCategoriesPayload } from "../../examplePayloads";
import { paginateResults } from "../../util";

export const listCategories = action({
  display: {
    label: "List Categories",
    description: "List all categories in the Help Center.",
  },
  perform: async (
    context,
    { locale, sortBy, sortOrder, zendeskConnection, fetchAll, pageLimit },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const url = `/help_center/${locale}/categories`;

    if (fetchAll) {
      const categories: Category[] = [];
      return {
        data: {
          categories: await paginateResults<Category>(
            client,
            url,
            categories,
            "categories",
            pageLimit || undefined,
          ),
        },
      };
    }

    const params = {
      sort_by: sortBy || undefined,
      sort_order: sortOrder || undefined,
    };

    const { data } = await client.get<
      PaginatedResponse<{ categories: Category[] }> | { categories: Category[] }
    >(`/help_center/${locale}/categories`, {
      params,
    });

    return {
      data,
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
    locale,
    sortBy: {
      ...sortBy,
      model: [
        {
          label: "Position",
          value: "position",
        },
        {
          label: "Created At",
          value: "created_at",
        },
        {
          label: "Updated At",
          value: "updated_at",
        },
      ].map((item) => {
        return {
          label: item.label,
          value: item.value,
        };
      }),
    },
    sortOrder,
    pageLimit,
    fetchAll,
  },
  examplePayload: { data: listCategoriesPayload },
});
