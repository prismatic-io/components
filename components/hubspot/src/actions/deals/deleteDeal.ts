import { action } from "@prismatic-io/spectral";
import { getHubspotClient } from "../../client";
import { deleteDealExamplePayload } from "../../examplePayloads";
import { deleteDealInputs } from "../../inputs";
import { hubspotPaths } from "../../constants";

export const deleteDeal = action({
  display: {
    label: "Delete Deal",
    description: "Delete a deal by its Id.",
  },
  performSafety: "notAllowed",
  perform: async (context, { dealId, timeout, hubspotConnection }) => {
    const debugRequest = context.debug.enabled;

    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });

    const { data } = await client.delete(
      hubspotPaths.objects("deals", `/${dealId}`),
    );

    return { data };
  },
  inputs: deleteDealInputs,
  examplePerform: async () => ({
    data: deleteDealExamplePayload.data,
  }),
  examplePayload: deleteDealExamplePayload,
});
