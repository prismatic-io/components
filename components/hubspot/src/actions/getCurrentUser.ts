import { action } from "@prismatic-io/spectral";
import { getHubspotClient } from "../client";
import { hubspotOAuth, privateAppAccessToken } from "../connections";
import { getCurrentUserPayload } from "../examplePayloads";
import { connectionInput, timeout } from "../inputs";

export const getCurrentUser = action({
  display: {
    label: "Get Current User",
    description: "Return information about the current session's user.",
  },
  perform: async (context, { timeout, hubspotConnection }) => {
    const debugRequest = context.debug.enabled;
    const TOKEN_WITHOUT_BEARER_PREFIX_INDEX_START = 7;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });

    const { data: userData } = await client.get("/integrations/v1/me");

    if (hubspotConnection.key === hubspotOAuth.key) {
      const token = (client.defaults.headers.Authorization as string).slice(
        TOKEN_WITHOUT_BEARER_PREFIX_INDEX_START,
      );
      const clientId = hubspotConnection.fields.clientId as string;
      const clientSecret = hubspotConnection.fields.clientSecret as string;
      const data = {
        client_id: clientId,
        client_secret: clientSecret,
        token,
      };
      
      const { data: tokenData } = await client.post(
        "/oauth/v3/token/introspect",
        new URLSearchParams(data).toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      return {
        data: {
          ...userData,
          user_id: tokenData.user_id,
          user: tokenData.user,
        },
      };
    }
    if (hubspotConnection.key === privateAppAccessToken.key) {
      return {
        data: userData,
      };
    }
  },
  inputs: {
    timeout,
    hubspotConnection: connectionInput,
  },
  examplePayload: getCurrentUserPayload,
});

export default getCurrentUser;
