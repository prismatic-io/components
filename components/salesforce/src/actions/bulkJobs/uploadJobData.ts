import { action } from "@prismatic-io/spectral";
import { createSalesforceHttpClient } from "../../client";
import { uploadJobDataInputs } from "../../inputs";
import { getQueryJobInformationExamplePayload } from "../../examplePayloads";

export const uploadJobData = action({
  display: {
    label: "Upload Bulk Job Data",
    description: "Upload CSV data for a bulk ingest job.",
  },
  inputs: uploadJobDataInputs,
  perform: async (context, { version, connection, bulkJobId, file }) => {
    const salesforceClient = await createSalesforceHttpClient(
      version,
      connection,
      context.debug.enabled,
    );

    const { data: fileData } = file;
    const { data } = await salesforceClient.put(`/jobs/ingest/${bulkJobId}/batches`, fileData, {
      headers: { "Content-Type": "text/csv" },
    });
    return {
      data,
    };
  },
  examplePayload: getQueryJobInformationExamplePayload,
});
