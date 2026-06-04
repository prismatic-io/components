import { action } from "@prismatic-io/spectral";
import { createSalesforceHttpClient } from "../../client";
import { deleteBulkJobInputs } from "../../inputs";
import { deleteBulkJobExamplePayload } from "../../examplePayloads";

export const deleteBulkJob = action({
  display: {
    label: "Delete Bulk Job",
    description: "Delete a bulk ingest job.",
  },
  inputs: deleteBulkJobInputs,
  perform: async (context, { version, connection, bulkJobId }) => {
    const salesforceClient = await createSalesforceHttpClient(
      version,
      connection,
      context.debug.enabled,
    );
    const { data } = await salesforceClient.delete(`/jobs/ingest/${bulkJobId}`);
    return {
      data,
    };
  },
  examplePayload: deleteBulkJobExamplePayload,
});
