import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { validateConnection } from "../../client";
import { rawRequestExamplePayload } from "../../examplePayloads";
import { rawRequestInputs } from "../../inputs";
export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Sends a raw HTTP request to the Google Ads API.",
  },
  inputs: rawRequestInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, ...rawRequestInputs }) => {
    const { accessToken, developerToken } = validateConnection(connection);
    const authorizationHeaders: Record<string, string> = {
      Authorization: `Bearer ${accessToken}`,
      "developer-token": developerToken,
    };
    const { data } = await sendRawRequest(
      "https://googleads.googleapis.com",
      { ...rawRequestInputs, debugRequest: context.debug.enabled },
      authorizationHeaders,
    );
    return { data };
  },
  examplePayload: rawRequestExamplePayload,
});
