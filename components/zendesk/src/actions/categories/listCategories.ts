import { action, outputSchema } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../auth";
import { listCategoriesExamplePayload } from "../../examplePayloads";
import { listCategoriesInputs } from "../../inputs";
import { listCategoriesOutputSchema } from "../../outputSchemas";
import type { Category, PaginatedResponse } from "../../types";
import { paginateResults } from "../../util";
export const listCategories = action({
  display: {
    label: "List Categories",
    description: "List all categories in the Help Center.",
  },
  performSafety: "notAllowed",
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
            pageLimit,
          ),
        },
      };
    }
    const params = {
      sort_by: sortBy,
      sort_order: sortOrder,
    };
    const { data } = await client.get<
      | PaginatedResponse<{
          categories: Category[];
        }>
      | {
          categories: Category[];
        }
    >(`/help_center/${locale}/categories`, {
      params,
    });
    return {
      data,
    };
  },
  examplePerform: async (_context, { fetchAll }) =>
    fetchAll
      ? { data: { categories: listCategoriesExamplePayload.data.categories } }
      : { data: listCategoriesExamplePayload.data },
  inputs: listCategoriesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listCategoriesOutputSchema,
  }),
  examplePayload: listCategoriesExamplePayload,
});
