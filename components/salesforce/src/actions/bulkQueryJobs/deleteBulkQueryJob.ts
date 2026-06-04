import { action } from "@prismatic-io/spectral";
import { createSalesforceHttpClient } from "../../client";
import { deleteBulkQueryJobInputs } from "../../inputs";
import { deleteBulkQueryJobExamplePayload } from "../../examplePayloads";

export const deleteBulkQueryJob = action({
  display: {
    label: "Delete Bulk Query Job",
    description: "Delete a bulk query job.",
  },
  inputs: deleteBulkQueryJobInputs,
  perform: async (context, { version, connection, queryJobId }) => {
    const salesforceClient = await createSalesforceHttpClient(
      version,
      connection,
      context.debug.enabled,
    );
    const { data } = await salesforceClient.delete(`/jobs/query/${queryJobId}`);
    return {
      data,
    };
  },
  examplePayload: deleteBulkQueryJobExamplePayload,
});
