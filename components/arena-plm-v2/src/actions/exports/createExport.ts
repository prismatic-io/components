import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { createExportExamplePayload } from "../../examplePayloads";
import { createExportInputs } from "../../inputs";
import { exportDefinitionSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const createExport = action({
  display: {
    label: "Create Export",
    description: "Create a new export definition.",
  },
  inputs: createExportInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: exportDefinitionSchema,
  }),
  examplePayload: createExportExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      context.logger.info("Creating new export in Arena");
      const { data } = await client.post("/exports", params.exportData);
      context.logger.info(
        `Successfully created export with GUID: ${data?.guid}`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Create Export");
    }
  },
});
