import { action, outputSchema } from "@prismatic-io/spectral";
import { getQueryJobResultsOutputSchema } from "../../outputSchemas";
import { createSalesforceHttpClient } from "../../client";
import { getQueryJobResultsInputs } from "../../inputs";
import { getQueryJobResultsExamplePayload } from "../../examplePayloads";

export const getQueryJobResults = action({
  display: {
    label: "Get Bulk Query Job Results",
    description: "Retrieve the results for a completed bulk query job.",
  },
  inputs: getQueryJobResultsInputs,
  performSafety: "notAllowed",
  perform: async (context, { version, connection, queryJobId, pagination }) => {
    const salesforceClient = await createSalesforceHttpClient(
      version,
      connection,
      context.debug.enabled,
    );
    const { data } = await salesforceClient.get(
      `/jobs/query/${queryJobId}/results`,
      {
        headers: { Accept: "text/csv" },
        params: {
          locator: pagination.locator,
          maxRecords: pagination.maxRecords || undefined,
        },
      },
    );
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    getQueryJobResultsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getQueryJobResultsOutputSchema,
  }),
  examplePayload: getQueryJobResultsExamplePayload,
});
