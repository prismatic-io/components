import { action, outputSchema } from "@prismatic-io/spectral";
import { completeUploadBulkJobOutputSchema } from "../../outputSchemas";
import { createSalesforceHttpClient } from "../../client";
import { completeUploadBulkJobInputs } from "../../inputs";
import { getBulkJobExamplePayload } from "../../examplePayloads";

export const completeUploadBulkJob = action({
  display: {
    label: "Complete Upload Bulk Job",
    description:
      "Notify Salesforce that the upload of job data is complete and ready for processing. No additional job data can be added after this call.",
  },
  inputs: completeUploadBulkJobInputs,
  performSafety: "notAllowed",
  perform: async (context, { version, connection, bulkJobId }) => {
    const salesforceClient = await createSalesforceHttpClient(
      version,
      connection,
      context.debug.enabled,
    );
    const { data } = await salesforceClient.patch(`/jobs/ingest/${bulkJobId}`, {
      state: "UploadComplete",
    });
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    getBulkJobExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: completeUploadBulkJobOutputSchema,
  }),
  examplePayload: getBulkJobExamplePayload,
});
