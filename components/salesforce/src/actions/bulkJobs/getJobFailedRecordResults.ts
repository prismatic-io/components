import { action } from "@prismatic-io/spectral";
import { getJobFailedRecordResultsInputs } from "../../inputs";
import { createSalesforceHttpClient } from "../../client";

export const getJobFailedRecordResults = action({
  display: {
    label: "Get Bulk Job Failed Record Results",
    description:
      "Retrieve a list of failed records for a completed insert, delete, update, or upsert bulk job.",
  },
  perform: async (context, { version, connection, bulkJobId }) => {
    const client = await createSalesforceHttpClient(version, connection, context.debug.enabled);
    const { data } = await client.get(`/jobs/ingest/${bulkJobId}/failedResults`);

    return { data };
  },
  inputs: getJobFailedRecordResultsInputs,
});
