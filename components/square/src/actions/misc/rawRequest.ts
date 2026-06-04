import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { getVersionFromConnection } from "../../client";
import { rawRequestExamplePayload } from "../../examplePayloads";
import { rawRequestInputs } from "../../inputs";
import { getAuthHeaders, getBaseUrl, validateConnection } from "../../util";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Sends a raw HTTP request to the Square API.",
  },
  inputs: rawRequestInputs,
  perform: async (context, { squareConnection, ...httpClientInputs }) => {
    validateConnection(squareConnection);
    const baseUrl = getBaseUrl(squareConnection);
    const version = getVersionFromConnection(squareConnection);
    const headers = getAuthHeaders(squareConnection, version);
    const { data } = await sendRawRequest(
      baseUrl,
      { ...httpClientInputs, debugRequest: context.debug.enabled },
      headers,
    );
    return { data };
  },
  examplePayload: rawRequestExamplePayload,
});
