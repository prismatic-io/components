import { action } from "@prismatic-io/spectral";
import { createSalesforceHttpClient } from "../../client";
import { listBulkJobsInputs } from "../../inputs";
import { listBulkQueryJobsExamplePayload } from "../../examplePayloads";

export const listBulkJobs = action({
  display: {
    label: "List Bulk Jobs",
    description: "List all bulk ingest jobs in the org.",
  },
  inputs: listBulkJobsInputs,
  perform: async (context, { version, connection, isPkChunkingEnabled, jobType, queryLocator }) => {
    const salesforceClient = await createSalesforceHttpClient(
      version,
      connection,
      context.debug.enabled,
    );
    const { data } = await salesforceClient.get("/jobs/ingest", {
      params: {
        isPkChunkingEnabled,
        jobType,
        queryLocator,
      },
    });
    return {
      data,
    };
  },
  examplePayload: listBulkQueryJobsExamplePayload,
});
