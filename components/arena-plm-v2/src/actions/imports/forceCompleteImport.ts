import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { forceCompleteImportExamplePayload } from "../../examplePayloads";
import { forceCompleteImportInputs } from "../../inputs";
import { runResponseWithGuidSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const forceCompleteImport = action({
  display: {
    label: "Force Complete Import",
    description: "Force an import run to complete, even if there are errors.",
  },
  inputs: forceCompleteImportInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: runResponseWithGuidSchema,
  }),
  examplePayload: forceCompleteImportExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      context.logger.info(
        `Force completing import run ${params.importRunGuid} for import ${params.importGuid}`,
      );
      const { data } = await client.put(
        `/imports/${params.importGuid}/runs/${params.importRunGuid}/complete`,
      );
      context.logger.info(
        `Successfully force completed import run ${params.importRunGuid}`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Force Complete Import");
    }
  },
});
