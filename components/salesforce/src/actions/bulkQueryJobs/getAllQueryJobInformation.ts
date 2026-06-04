import { action } from "@prismatic-io/spectral";
import { createSalesforceHttpClient } from "../../client";
import { getAllQueryJobInformationInputs } from "../../inputs";
import { getAllQueryJobInformationExamplePayload } from "../../examplePayloads";

export const getAllQueryJobInformation = action({
  display: {
    label: "List All Bulk Query Job Information",
    description: "Retrieve information about all bulk query jobs in the org.",
  },
  inputs: getAllQueryJobInformationInputs,
  perform: async (
    context,
    { version, connection, isPkChunkingEnabled, jobType, queryLocator, concurrencyMode },
  ) => {
    const salesforceClient = await createSalesforceHttpClient(
      version,
      connection,
      context.debug.enabled,
    );
    const { data } = await salesforceClient.get("/jobs/query", {
      params: {
        isPkChunkingEnabled,
        jobType,
        queryLocator,
        concurrencyMode: concurrencyMode || "parallel",
      },
    });
    return {
      data,
    };
  },
  examplePayload: getAllQueryJobInformationExamplePayload,
});
