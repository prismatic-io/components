import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listCategoriesExamplePayload } from "../../examplePayloads";
import { listCategoriesInputs } from "../../inputs";
import { listCategoriesOutputSchema } from "../../outputSchemas";
import { paginateOffset } from "../../util";
export const listCategories = action({
  display: {
    label: "List Categories",
    description: "Lists categories with optional board filter and pagination.",
  },
  inputs: listCategoriesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listCategoriesOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, boardId, fetchAll, pagination }) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await paginateOffset(
      client.post,
      "/categories/list",
      "categories",
      { boardID: boardId, limit: pagination.limit, skip: pagination.skip },
      fetchAll,
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => listCategoriesExamplePayload,
  examplePayload: listCategoriesExamplePayload,
});
