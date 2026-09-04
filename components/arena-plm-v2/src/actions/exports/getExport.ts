import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getExportExamplePayload } from "../../examplePayloads";
import { getExportInputs } from "../../inputs";
import { exportDefinitionSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const getExport = action({
  display: {
    label: "Get Export",
    description: "Get details of a specific export definition.",
  },
  inputs: getExportInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: exportDefinitionSchema,
  }),
  examplePayload: getExportExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      context.logger.info(`Fetching export ${params.exportGuid} from Arena`);
      const { data } = await client.get(`/exports/${params.exportGuid}`);
      context.logger.info(`Successfully retrieved export ${params.exportGuid}`);
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Get Export");
    }
  },
});
