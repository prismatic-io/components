import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { rerunImportExamplePayload } from "../../examplePayloads";
import { rerunImportInputs } from "../../inputs";
import { runResponseWithGuidSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const rerunImport = action({
  display: {
    label: "Rerun Import",
    description: "Re-execute an import run with updated data.",
  },
  inputs: rerunImportInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: runResponseWithGuidSchema,
  }),
  examplePayload: rerunImportExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      context.logger.info(
        `Rerunning import run ${params.importRunGuid} for import ${params.importGuid}`,
      );
      const { data } = await client.put(
        `/imports/${params.importGuid}/runs/${params.importRunGuid}`,
      );
      context.logger.info(
        `Successfully restarted import run ${params.importRunGuid}`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Rerun Import");
    }
  },
});
