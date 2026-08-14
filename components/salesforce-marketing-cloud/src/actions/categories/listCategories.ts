import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { CATEGORIES_PATH } from "../../constants";
import { listCategoriesExamplePayload } from "../../examplePayloads/categories";
import { listCategoriesInputs } from "../../inputs/categories";
import { listCategoriesOutputSchema } from "../../outputSchemas";
import { paginateResults } from "../../util/pagination";
export const listCategories = action({
  examplePayload: listCategoriesExamplePayload,
  display: {
    label: "List Categories",
    description: "List Content Builder categories (folders).",
  },
  inputs: listCategoriesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listCategoriesOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, fetchAll, pagination }) => {
    const client = createClient(connection, context.debug.enabled);
    const params = {
      $pageSize: pagination.pageSize,
      $page: pagination.page,
    };
    const data = await paginateResults(
      client,
      CATEGORIES_PATH,
      fetchAll,
      params,
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: listCategoriesExamplePayload.data,
  }),
});
