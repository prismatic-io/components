import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { rawRequestInputs } from "../../inputs";
import { rawRequestExamplePayload } from "../../examplePayloads";
import { getBaseUrl, getAccessToken, validateConnection } from "../../util";







export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to SurveyMonkey API.",
  },
  inputs: rawRequestInputs,
  perform: async (context, { connection, ...restInputs }) => {
    validateConnection(connection);
    const baseUrl = getBaseUrl(connection);
    const accessToken = getAccessToken(connection);

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    const { data } = await sendRawRequest(
      baseUrl,
      {
        ...restInputs,
        debugRequest: context.debug.enabled,
      },
      headers,
    );

    return { data };
  },
  examplePayload: rawRequestExamplePayload,
});
