import { action } from "@prismatic-io/spectral";
import { createSalesforceHttpClient } from "../../client";
import { getQueryJobResultsInputs } from "../../inputs";
import { getQueryJobResultsExamplePayload } from "../../examplePayloads";

export const getQueryJobResults = action({
  display: {
    label: "Get Bulk Query Job Results",
    description: "Retrieve the results for a completed bulk query job.",
  },
  inputs: getQueryJobResultsInputs,
  perform: async (context, { version, connection, queryJobId, locator, maxRecords }) => {
    const salesforceClient = await createSalesforceHttpClient(
      version,
      connection,
      context.debug.enabled,
    );
    const { data } = await salesforceClient.get(`/jobs/query/${queryJobId}/results`, {
      params: {
        locator,
        maxRecords: maxRecords || undefined,
      },
    });
    return {
      data,
    };
  },
  examplePayload: getQueryJobResultsExamplePayload,
});
