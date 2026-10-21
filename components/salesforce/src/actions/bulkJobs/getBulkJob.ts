import { action, outputSchema } from "@prismatic-io/spectral";
import { getBulkJobOutputSchema } from "../../outputSchemas";
import { createSalesforceHttpClient } from "../../client";
import { getBulkJobInputs } from "../../inputs";
import { getBulkJobExamplePayload } from "../../examplePayloads";
export const getBulkJob = action({
  display: {
    label: "Get Bulk Job Information",
    description: "Retrieve information about a bulk ingest job.",
  },
  inputs: getBulkJobInputs,
  performSafety: "safe",
  perform: async (context, { version, connection, bulkJobId }) => {
    const salesforceClient = await createSalesforceHttpClient(
      version,
      connection,
      context.debug.enabled,
    );
    const { data } = await salesforceClient.get(`/jobs/ingest/${bulkJobId}`);
    return {
      data,
    };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getBulkJobOutputSchema,
  }),
  examplePayload: getBulkJobExamplePayload,
});
