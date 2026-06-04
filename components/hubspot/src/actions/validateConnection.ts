import { action } from "@prismatic-io/spectral";
import { getHubspotClient } from "../client";
import { validateConnectionPayload } from "../examplePayloads";
import { connectionInput, timeout } from "../inputs";

export const validateConnection = action({
  display: {
    label: "Validate Connection",
    description: "Returns a boolean value that specifies whether the provided Connection is valid",
  },
  inputs: { timeout, hubspotConnection: connectionInput },
  perform: async (context, { timeout, hubspotConnection }) => {
    try {
      const debugRequest = context.debug.enabled;
      
      const client = getHubspotClient({
        hubspotConnection,
        timeout,
        debugRequest,
      });

      
      await client.get("/integrations/v1/me");

      
      return {
        data: true,
      };
    } catch {
      
      return { data: false };
    }
  },
  examplePayload: validateConnectionPayload,
});

export default validateConnection;
