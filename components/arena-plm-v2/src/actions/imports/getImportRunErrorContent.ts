import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getImportRunErrorContentExamplePayload } from "../../examplePayloads";
import { getImportRunErrorContentInputs } from "../../inputs";
import { getImportRunErrorContentOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const getImportRunErrorContent = action({
  display: {
    label: "Get Import Run Error Content",
    description: "Get the error content for an import run.",
  },
  inputs: getImportRunErrorContentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getImportRunErrorContentOutputSchema,
  }),
  examplePayload: getImportRunErrorContentExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      context.logger.info(
        `Fetching error content for import run ${params.importRunGuid}`,
      );
      const { data } = await client.get(
        `/imports/${params.importGuid}/runs/${params.importRunGuid}/errorContent`,
      );
      context.logger.info("Successfully retrieved import run error content");
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Get Import Run Error Content");
    }
  },
});
