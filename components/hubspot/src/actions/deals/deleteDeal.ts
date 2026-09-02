import { action } from "@prismatic-io/spectral";
import { getHubspotClient } from "../../client";
import { deleteDealExamplePayload } from "../../examplePayloads";
import { deleteDealInputs } from "../../inputs";
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
    const { data } = await client.delete(`/crm/v3/objects/deals/${dealId}`);
    return { data };
  },
  inputs: deleteDealInputs,
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: deleteDealExamplePayload.data,
  }),
  examplePayload: deleteDealExamplePayload,
});
