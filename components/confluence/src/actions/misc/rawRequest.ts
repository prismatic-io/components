import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { rawRequestInputs } from "../../inputs";
import { buildAuthHeaders, getHostBasedOnConnection } from "../../client";
export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Confluence.",
  },
  inputs: rawRequestInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, ...httpClientInputs }) => {
    const baseUrl = await getHostBasedOnConnection(connection);
    const authHeader = buildAuthHeaders(connection);
    const { data } = await sendRawRequest(
      baseUrl,
      { ...httpClientInputs, debugRequest: context.debug.enabled },
      {
        ...authHeader,
        Accept: "application/json",
      },
    );
    return { data: { data } };
  },
});
