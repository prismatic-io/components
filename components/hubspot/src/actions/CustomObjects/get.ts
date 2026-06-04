import { action } from "@prismatic-io/spectral";
import { getHubspotClient } from "../../client";
import { getCustomObjectPayload } from "../../examplePayloads";
import { connectionInput, objectType, timeout } from "../../inputs";

export const getCustomObject = action({
  display: {
    label: "Get Custom Object",
    description: "Retrieves a specific custom object",
  },
  perform: async (context, { hubspotConnection, timeout, objectType }) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });

    const { data } = await client.get(`/crm/v3/schemas/${objectType}`);

    return {
      data,
    };
  },
  inputs: {
    hubspotConnection: connectionInput,
    timeout,
    objectType,
  },
  examplePayload: getCustomObjectPayload,
});
