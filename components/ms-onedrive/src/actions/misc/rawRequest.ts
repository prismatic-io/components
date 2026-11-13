import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/http";
import { BASE_URL } from "../../constants";
import { rawRequestExamplePayload } from "../../examplePayloads";
import { rawRequestInputs } from "../../inputs";
import { getAuthHeaders, validateConnection } from "../../util";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Sends a raw HTTP request to Microsoft OneDrive.",
  },
  inputs: rawRequestInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, ...rawRequestInputs }) => {
    validateConnection(connection);
    const headers = getAuthHeaders(connection);
    const { data } = await sendRawRequest(
      BASE_URL,
      { ...rawRequestInputs, debugRequest: context.debug.enabled },
      headers,
    );
    return { data };
  },
  examplePayload: rawRequestExamplePayload,
});
