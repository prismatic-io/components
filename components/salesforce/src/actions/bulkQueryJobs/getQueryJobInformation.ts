import { action } from "@prismatic-io/spectral";
import { createSalesforceHttpClient } from "../../client";
import { getQueryJobInformationInputs } from "../../inputs";
import { getQueryJobInformationExamplePayload } from "../../examplePayloads";

export const getQueryJobInformation = action({
  display: {
    label: "Get Bulk Query Job Information",
    description: "Get information about a single bulk query job.",
  },
  inputs: getQueryJobInformationInputs,
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
  examplePayload: getQueryJobInformationExamplePayload,
});
