import { action, outputSchema } from "@prismatic-io/spectral";
import { getJobFailedRecordResultsOutputSchema } from "../../outputSchemas";
import { getJobFailedRecordResultsInputs } from "../../inputs";
import { createSalesforceHttpClient } from "../../client";
import { getJobFailedRecordResultsExamplePayload } from "../../examplePayloads";

export const getJobFailedRecordResults = action({
  display: {
    label: "Get Bulk Job Failed Record Results",
    description:
      "Retrieve a list of failed records for a completed insert, delete, update, or upsert bulk job.",
  },
  performSafety: "notAllowed",
  perform: async (context, { version, connection, bulkJobId }) => {
    const client = await createSalesforceHttpClient(
      version,
      connection,
      context.debug.enabled,
    );
    const { data } = await client.get(
      `/jobs/ingest/${bulkJobId}/failedResults`,
    );

    return { data };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    getJobFailedRecordResultsExamplePayload,
  inputs: getJobFailedRecordResultsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getJobFailedRecordResultsOutputSchema,
  }),
  examplePayload: getJobFailedRecordResultsExamplePayload,
});
