import { action } from "@prismatic-io/spectral";
import { createSalesforceHttpClient } from "../../client";
import { getBulkJobInputs } from "../../inputs";
import { getBulkJobExamplePayload } from "../../examplePayloads";

export const getBulkJob = action({
  display: {
    label: "Get Bulk Job Information",
    description: "Retrieve information about a bulk ingest job.",
  },
  inputs: getBulkJobInputs,
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
  examplePayload: getBulkJobExamplePayload,
});
