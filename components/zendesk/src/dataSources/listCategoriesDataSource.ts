import { dataSource, util } from "@prismatic-io/spectral";
import { rawHttpClient } from "../auth";
import { listCategoriesDataSourceExamplePayload } from "../examplePayloads";
import { listCategoriesDataSourceInputs } from "../inputs";
import type { Category } from "../types";
import { paginateResults } from "../util";
export const listCategoriesDataSource = dataSource({
  display: {
    label: "Select Categories",
    description: "Select a category from the Zendesk Help Center.",
  },
  perform: async (_context, { zendeskConnection, locale }) => {
    const client = rawHttpClient(zendeskConnection);
    const results = [] as Category[];
    const nextUrl = `/help_center/${locale}/categories`;
    const paginatedResults = await paginateResults<Category>(
      client,
      nextUrl,
      results,
      "categories",
    );
    return {
      result: paginatedResults.map((category) => ({
        label: category.name,
        key: util.types.toString(category.id),
      })),
    };
  },
  inputs: listCategoriesDataSourceInputs,
  dataSourceType: "picklist",
  examplePayload: listCategoriesDataSourceExamplePayload,
});
