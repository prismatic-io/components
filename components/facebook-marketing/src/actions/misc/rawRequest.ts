import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { rawRequestInputs } from "../../inputs";
import { getAuthHeaders, getBaseUrl, validateConnection } from "../../util";
export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Meta Ads.",
  },
  perform: async (context, { connection, version, ...httpClientInputs }) => {
    validateConnection(connection);
    const baseUrl = getBaseUrl(version);
    const headers = getAuthHeaders(connection);
    const { data } = await sendRawRequest(
      baseUrl,
      {
        ...httpClientInputs,
        debugRequest: context.debug.enabled,
      },
      headers,
    );
    return { data };
  },
  inputs: rawRequestInputs,
});
