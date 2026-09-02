import { action } from "@prismatic-io/spectral";
import { getHubspotClient } from "../../client";
import { getAnImportExamplePayload } from "../../examplePayloads";
import { getAnImportInputs } from "../../inputs";
export const getAnImport = action({
  display: {
    label: "Get Import",
    description:
      "Get a complete summary of an import record, including any updates.",
  },
  performSafety: "safe",
  perform: async (context, { timeout, hubspotConnection, importId }) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });
    const { data } = await client.get(`/crm/v3/imports/${importId}`);
    return { data };
  },
  inputs: getAnImportInputs,
  examplePayload: getAnImportExamplePayload,
});
