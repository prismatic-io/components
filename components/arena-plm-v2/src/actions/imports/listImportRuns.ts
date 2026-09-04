import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listImportRunsExamplePayload } from "../../examplePayloads";
import { listImportRunsInputs } from "../../inputs";
import { listImportRunsOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
import { fetchArenaList } from "../../util/pagination";
export const listImportRuns = action({
  display: {
    label: "List Import Runs",
    description: "Get import runs for a specific import definition.",
  },
  inputs: listImportRunsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listImportRunsOutputSchema,
  }),
  examplePayload: listImportRunsExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const queryParams = {
        number: params.number,
        status: params.status,
        "creator.guid": params.creatorGuid,
        "creator.fullName": params.creatorFullName,
        "creator.email": params.creatorEmail,
        offset: params.pagination?.offset,
        limit: params.pagination?.limit,
      };
      const endpoint = `/imports/${params.importGuid}/runs`;
      context.logger.info(
        `Fetching import runs for import ${params.importGuid}`,
      );
      const data = await fetchArenaList(
        client,
        endpoint,
        queryParams,
        params.fetchAll,
      );
      context.logger.info(
        `Successfully retrieved ${data?.count || 0} import runs`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "List Import Runs");
    }
  },
});
