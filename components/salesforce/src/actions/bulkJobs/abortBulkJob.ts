import { action } from "@prismatic-io/spectral";
import { createSalesforceHttpClient } from "../../client";
import { abortBulkJobInputs } from "../../inputs";
import { getBulkJobExamplePayload } from "../../examplePayloads";

export const abortBulkJob = action({
  display: {
    label: "Abort Bulk Job",
    description: "Abort a bulk ingest job.",
  },
  inputs: abortBulkJobInputs,
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
  examplePayload: getBulkJobExamplePayload,
});
