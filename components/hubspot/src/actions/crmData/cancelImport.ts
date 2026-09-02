import { action } from "@prismatic-io/spectral";
import { getHubspotClient } from "../../client";
import { cancelImportExamplePayload } from "../../examplePayloads";
import { cancelImportInputs } from "../../inputs";
export const cancelImport = action({
  display: {
    label: "Cancel Import",
    description: "Cancels an active import.",
  },
  performSafety: "notAllowed",
  perform: async (context, { timeout, hubspotConnection, importId }) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
      headers: { "Content-Type": "application/json" },
    });
    const { data } = await client.post(`/crm/v3/imports/${importId}/cancel`);
    return { data };
  },
  inputs: cancelImportInputs,
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: cancelImportExamplePayload.data,
  }),
  examplePayload: cancelImportExamplePayload,
});
