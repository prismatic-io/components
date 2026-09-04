import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listExportRunsExamplePayload } from "../../examplePayloads";
import { listExportRunsInputs } from "../../inputs";
import { listExportRunsOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
import { fetchArenaList } from "../../util/pagination";
export const listExportRuns = action({
  display: {
    label: "List Export Runs",
    description: "Get export runs for a specific export definition.",
  },
  inputs: listExportRunsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listExportRunsOutputSchema,
  }),
  examplePayload: listExportRunsExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const queryParams = {
        number: params.number,
        status: params.status,
        latestCompleted: params.latestCompleted,
        offset: params.pagination?.offset,
        limit: params.pagination?.limit,
      };
      const endpoint = `/exports/${params.exportGuid}/runs`;
      context.logger.info(
        `Fetching export runs for export ${params.exportGuid}`,
      );
      const data = await fetchArenaList(
        client,
        endpoint,
        queryParams,
        params.fetchAll,
      );
      context.logger.info(
        `Successfully retrieved ${data?.count || 0} export runs`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "List Export Runs");
    }
  },
});
