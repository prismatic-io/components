import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getExportRunExamplePayload } from "../../examplePayloads";
import { getExportRunInputs } from "../../inputs";
import { exportRunSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const getExportRun = action({
  display: {
    label: "Get Export Run",
    description: "Get details of a specific export run.",
  },
  inputs: getExportRunInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: exportRunSchema,
  }),
  examplePayload: getExportRunExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      context.logger.info(
        `Fetching export run ${params.exportRunGuid} for export ${params.exportGuid}`,
      );
      const { data } = await client.get(
        `/exports/${params.exportGuid}/runs/${params.exportRunGuid}`,
      );
      context.logger.info(
        `Successfully retrieved export run ${params.exportRunGuid}`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Get Export Run");
    }
  },
});
