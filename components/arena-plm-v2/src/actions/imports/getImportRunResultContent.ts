import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getImportRunResultContentExamplePayload } from "../../examplePayloads";
import { getImportRunResultContentInputs } from "../../inputs";
import { getImportRunResultContentOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const getImportRunResultContent = action({
  display: {
    label: "Get Import Run Result Content",
    description: "Get the result content for an import run.",
  },
  inputs: getImportRunResultContentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getImportRunResultContentOutputSchema,
  }),
  examplePayload: getImportRunResultContentExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      context.logger.info(
        `Fetching result content for import run ${params.importRunGuid}`,
      );
      const { data } = await client.get(
        `/imports/${params.importGuid}/runs/${params.importRunGuid}/resultContent`,
      );
      context.logger.info("Successfully retrieved import run result content");
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Get Import Run Result Content");
    }
  },
});
