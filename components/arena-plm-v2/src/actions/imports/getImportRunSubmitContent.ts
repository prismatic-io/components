import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getImportRunSubmitContentExamplePayload } from "../../examplePayloads";
import { getImportRunSubmitContentInputs } from "../../inputs";
import { getImportRunSubmitContentOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const getImportRunSubmitContent = action({
  display: {
    label: "Get Import Run Submit Content",
    description: "Get the submitted content for an import run.",
  },
  inputs: getImportRunSubmitContentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getImportRunSubmitContentOutputSchema,
  }),
  examplePayload: getImportRunSubmitContentExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      context.logger.info(
        `Fetching submit content for import run ${params.importRunGuid}`,
      );
      const { data } = await client.get(
        `/imports/${params.importGuid}/runs/${params.importRunGuid}/submitContent`,
      );
      context.logger.info("Successfully retrieved import run submit content");
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Get Import Run Submit Content");
    }
  },
});
