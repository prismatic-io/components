import { action, outputSchema } from "@prismatic-io/spectral";
import { getJobSuccessfulRecordResultsOutputSchema } from "../../outputSchemas";
import { getJobSuccessfulRecordResultsInputs } from "../../inputs";
import { createSalesforceHttpClient } from "../../client";
import { getJobSuccessfulRecordResultsExamplePayload } from "../../examplePayloads";

export const getJobSuccessfulRecordResults = action({
  display: {
    label: "Get Bulk Job Successful Record Results",
    description:
      "Retrieve the successful record results for a bulk ingest job.",
  },
  performSafety: "notAllowed",
  perform: async (context, { version, connection, bulkJobId }) => {
    const client = await createSalesforceHttpClient(
      version,
      connection,
      context.debug.enabled,
    );
    const { data } = await client.get(
      `/jobs/ingest/${bulkJobId}/successfulResults`,
    );

    return { data };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    getJobSuccessfulRecordResultsExamplePayload,
  inputs: getJobSuccessfulRecordResultsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getJobSuccessfulRecordResultsOutputSchema,
  }),
  examplePayload: getJobSuccessfulRecordResultsExamplePayload,
});
