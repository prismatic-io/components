import { action } from "@prismatic-io/spectral";
import { createSalesforceHttpClient } from "../../client";
import { abortBulkQueryJobInputs } from "../../inputs";
import { abortBulkQueryJobExamplePayload } from "../../examplePayloads";

export const abortBulkQueryJob = action({
  display: {
    label: "Abort Bulk Query Job",
    description: "Abort a bulk query job.",
  },
  inputs: abortBulkQueryJobInputs,
  perform: async (context, { version, connection, queryJobId }) => {
    const salesforceClient = await createSalesforceHttpClient(
      version,
      connection,
      context.debug.enabled,
    );
    const { data } = await salesforceClient.patch(`/jobs/query/${queryJobId}`, {
      state: "Aborted",
    });
    return {
      data,
    };
  },
  examplePayload: abortBulkQueryJobExamplePayload,
});
