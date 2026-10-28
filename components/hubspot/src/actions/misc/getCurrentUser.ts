import { action, outputSchema } from "@prismatic-io/spectral";
import { getHubspotClient } from "../../client";
import { hubspotOAuth, privateAppAccessToken } from "../../connections";
import {
  hubspotPaths,
  TOKEN_WITHOUT_BEARER_PREFIX_INDEX_START,
} from "../../constants";
import { getCurrentUserExamplePayload } from "../../examplePayloads";
import { getCurrentUserInputs } from "../../inputs";
import { getCurrentUserOutputSchema } from "../../outputSchemas";
export const getCurrentUser = action({
  display: {
    label: "Get Current User",
    description: "Return information about the current session's user.",
  },
  performSafety: "safe",
  perform: async (context, { timeout, hubspotConnection }) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });
    const { data: details } = await client.get(hubspotPaths.accountDetails);
    const userData = { ...details, currency: details.companyCurrency };
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
        hubspotPaths.oauthIntrospect,
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
  inputs: getCurrentUserInputs,
  examplePayload: getCurrentUserExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getCurrentUserOutputSchema,
  }),
});
export default getCurrentUser;
