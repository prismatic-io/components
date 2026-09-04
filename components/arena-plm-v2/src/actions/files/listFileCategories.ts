import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listFileCategoriesExamplePayload } from "../../examplePayloads";
import { listFileCategoriesInputs } from "../../inputs";
import { listFileCategoriesOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listFileCategories = action({
  display: {
    label: "List File Categories",
    description: "Get all categories for files in Arena PLM system.",
  },
  inputs: listFileCategoriesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listFileCategoriesOutputSchema,
  }),
  examplePayload: listFileCategoriesExamplePayload,
  perform: async (
    context,
    { connection, path, includeDeleted, assignable, user, action },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const queryParams = {
        path,
        includeDeleted,
        assignable,
        user,
        action,
      };
      context.logger.info("Fetching file categories from Arena", {
        queryParamNames: Object.keys(queryParams),
      });
      const { data } = await client.get("/settings/files/categories", {
        params: queryParams,
      });
      context.logger.info(
        `Successfully retrieved ${data?.count || 0} file categories`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "List File Categories");
    }
  },
});
