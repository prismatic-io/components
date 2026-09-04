import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { runExportExamplePayload } from "../../examplePayloads";
import { runExportInputs } from "../../inputs";
import { exportRunSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const runExport = action({
  display: {
    label: "Run Export",
    description: "Execute an export definition and create a new export run.",
  },
  inputs: runExportInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: exportRunSchema,
  }),
  examplePayload: runExportExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      context.logger.info(`Running export ${params.exportGuid}`);
      const { data } = await client.post(
        `/exports/${params.exportGuid}/runs`,
        params.runData || {},
      );
      context.logger.info(
        `Successfully started export run with GUID: ${data?.guid}`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Run Export");
    }
  },
});
