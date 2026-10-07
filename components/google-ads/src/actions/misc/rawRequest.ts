import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { validateConnection } from "../../client";
import { GOOGLE_ADS_BASE_URL } from "../../constants";
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
    const { accessToken } = validateConnection(connection);
    const authorizationHeaders: Record<string, string> = {
      Authorization: `Bearer ${accessToken}`,
    };
    const { data } = await sendRawRequest(
      GOOGLE_ADS_BASE_URL,
      { ...rawRequestInputs, debugRequest: context.debug.enabled },
      authorizationHeaders,
    );
    return { data };
  },
  examplePayload: rawRequestExamplePayload,
});
