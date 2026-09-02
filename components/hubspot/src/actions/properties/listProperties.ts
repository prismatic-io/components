import { action } from "@prismatic-io/spectral";
import { getHubspotClient } from "../../client";
import { listPropertiesExamplePayload } from "../../examplePayloads";
import { listPropertiesInputs } from "../../inputs";
export const listProperties = action({
  display: {
    label: "List Properties",
    description: "Retrieve a list of all configured object properties.",
  },
  performSafety: "safe",
  perform: async (context, { timeout, objectType, hubspotConnection }) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });
    const { data } = await client.get(`/crm/v3/properties/${objectType}`);
    return { data };
  },
  inputs: listPropertiesInputs,
  examplePayload: listPropertiesExamplePayload,
});
export default listProperties;
