import { action, outputSchema } from "@prismatic-io/spectral";
import { getQueryJobInformationOutputSchema } from "../../outputSchemas";
import { createSalesforceHttpClient } from "../../client";
import { getQueryJobInformationInputs } from "../../inputs";
import { getQueryJobInformationExamplePayload } from "../../examplePayloads";

export const getQueryJobInformation = action({
  display: {
    label: "Get Bulk Query Job Information",
    description: "Get information about a single bulk query job.",
  },
  inputs: getQueryJobInformationInputs,
  performSafety: "safe",
  perform: async (context, { version, connection, queryJobId }) => {
    const salesforceClient = await createSalesforceHttpClient(
      version,
      connection,
      context.debug.enabled,
    );
    const { data } = await salesforceClient.get(`/jobs/query/${queryJobId}`);
    return {
      data,
    };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getQueryJobInformationOutputSchema,
  }),
  examplePayload: getQueryJobInformationExamplePayload,
});
