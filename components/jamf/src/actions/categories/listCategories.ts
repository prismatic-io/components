import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listCategoriesExamplePayload } from "../../examplePayloads";
import { listCategoriesInputs } from "../../inputs";
import type { Category } from "../../types";
import { paginateResults } from "../../util";
export const listCategories = action({
  display: {
    label: "List Categories",
    description: "List all categories with optional filtering and pagination.",
  },
  inputs: listCategoriesInputs,
  perform: async (
    context,
    { connection, pagination, sort, filter, fetchAll },
  ) => {
    const client = await createClient(connection, context.debug.enabled);
    const data = await paginateResults<Category>(
      client,
      "/v1/categories",
      fetchAll,
      { page: pagination.page, "page-size": pagination.pageSize, sort, filter },
    );
    return { data };
  },
  examplePayload: listCategoriesExamplePayload,
});
