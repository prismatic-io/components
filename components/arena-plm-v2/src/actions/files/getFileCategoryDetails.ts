import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getFileCategoryDetailsExamplePayload } from "../../examplePayloads";
import { getFileCategoryDetailsInputs } from "../../inputs";
import { categorySchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const getFileCategoryDetails = action({
  display: {
    label: "Get File Category Details",
    description: "Get details of a specific file category in Arena PLM system.",
  },
  inputs: getFileCategoryDetailsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: categorySchema,
  }),
  examplePayload: getFileCategoryDetailsExamplePayload,
  perform: async (context, { connection, categoryGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info("Fetching file category details from Arena", {
        categoryGuid,
      });
      const { data } = await client.get(
        `/settings/files/categories/${categoryGuid}`,
      );
      context.logger.info("Successfully retrieved file category details");
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Get File Category Details");
    }
  },
});
