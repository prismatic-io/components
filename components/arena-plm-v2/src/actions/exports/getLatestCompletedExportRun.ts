import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getLatestCompletedExportRunExamplePayload } from "../../examplePayloads";
import { getLatestCompletedExportRunInputs } from "../../inputs";
import { exportRunSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const getLatestCompletedExportRun = action({
  display: {
    label: "Get Latest Completed Export Run",
    description:
      "Get the most recently completed export run for an export definition.",
  },
  inputs: getLatestCompletedExportRunInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: exportRunSchema,
  }),
  examplePayload: getLatestCompletedExportRunExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      let url = `/exports/${params.exportGuid}/runs/latestCompleted`;
      if (params.view) {
        url += `?view=${params.view}`;
      }
      context.logger.info(
        `Fetching latest completed export run for export ${params.exportGuid}`,
      );
      const { data } = await client.get(url);
      context.logger.info("Successfully retrieved latest completed export run");
      return { data };
    } catch (error: unknown) {
      handleArenaError(
        error,
        context.logger,
        "Get Latest Completed Export Run",
      );
    }
  },
});
