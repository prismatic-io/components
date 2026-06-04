import { action } from "@prismatic-io/spectral";
import { getJobSuccessfulRecordResultsInputs } from "../../inputs";
import { createSalesforceHttpClient } from "../../client";

export const getJobSuccessfulRecordResults = action({
  display: {
    label: "Get Bulk Job Successful Record Results",
    description: "Retrieve the successful record results for a bulk ingest job.",
  },
  perform: async (context, { version, connection, bulkJobId }) => {
    const client = await createSalesforceHttpClient(version, connection, context.debug.enabled);
    const { data } = await client.get(`/jobs/ingest/${bulkJobId}/successfulResults`);

    return { data };
  },
  inputs: getJobSuccessfulRecordResultsInputs,
});
