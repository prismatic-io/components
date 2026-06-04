import { action } from "@prismatic-io/spectral";
import { getHubspotClient } from "../client";
import { listPropertiesPayload } from "../examplePayloads";
import { connectionInput, objectType, timeout } from "../inputs";

export const listProperties = action({
  display: {
    label: "List Properties",
    description: "Retrieve a list of all configured object properties.",
  },
  perform: async (context, { timeout, objectType, hubspotConnection }) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });
    
    return {
      data: (await client.get(`/crm/v3/properties/${objectType}`)).data,
    };
  },
  inputs: {
    hubspotConnection: connectionInput,
    objectType,
    timeout,
  },
  examplePayload: listPropertiesPayload,
});

export default listProperties;
