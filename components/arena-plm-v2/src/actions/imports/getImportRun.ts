import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getImportRunExamplePayload } from "../../examplePayloads";
import { getImportRunInputs } from "../../inputs";
import { runResponseWithGuidSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const getImportRun = action({
  display: {
    label: "Get Import Run",
    description: "Get details of a specific import run.",
  },
  inputs: getImportRunInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: runResponseWithGuidSchema,
  }),
  examplePayload: getImportRunExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      context.logger.info(
        `Fetching import run ${params.importRunGuid} for import ${params.importGuid}`,
      );
      const { data } = await client.get(
        `/imports/${params.importGuid}/runs/${params.importRunGuid}`,
      );
      context.logger.info(
        `Successfully retrieved import run ${params.importRunGuid}`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Get Import Run");
    }
  },
});
