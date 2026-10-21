import { action, outputSchema } from "@prismatic-io/spectral";
import { abortBulkJobOutputSchema } from "../../outputSchemas";
import { createSalesforceHttpClient } from "../../client";
import { abortBulkJobInputs } from "../../inputs";
import { getBulkJobExamplePayload } from "../../examplePayloads";
export const abortBulkJob = action({
  display: {
    label: "Abort Bulk Job",
    description: "Abort a bulk ingest job.",
  },
  inputs: abortBulkJobInputs,
  performSafety: "notAllowed",
  perform: async (context, { version, connection, bulkJobId }) => {
    const salesforceClient = await createSalesforceHttpClient(
      version,
      connection,
      context.debug.enabled,
    );
    const { data } = await salesforceClient.patch(`/jobs/ingest/${bulkJobId}`, {
      state: "Aborted",
    });
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => getBulkJobExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: abortBulkJobOutputSchema,
  }),
  examplePayload: getBulkJobExamplePayload,
});
