import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listChangeCategoryRoutingsExamplePayload } from "../../examplePayloads";
import { listChangeCategoryRoutingsInputs } from "../../inputs";
import { listChangeCategoryRoutingsOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listChangeCategoryRoutings = action({
  display: {
    label: "List Change Category Routings",
    description:
      "List all routings for a specific change category in Arena PLM system.",
  },
  inputs: listChangeCategoryRoutingsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listChangeCategoryRoutingsOutputSchema,
  }),
  examplePayload: listChangeCategoryRoutingsExamplePayload,
  perform: async (context, { connection, categoryGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info(
        `Fetching routings for change category: ${categoryGuid}`,
      );
      const { data } = await client.get(
        `/settings/changes/categories/${categoryGuid}/routings`,
      );
      context.logger.info(
        `Successfully retrieved ${data?.count || 0} routings for category ${categoryGuid}`,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "List Change Category Routings");
    }
  },
});
