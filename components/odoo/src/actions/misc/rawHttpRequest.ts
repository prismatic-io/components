import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { getClientConfig } from "../../client";
import { rawHttpRequestInputs } from "../../inputs";
export const rawHttpRequest = action({
  display: {
    label: "Raw Request (API Key)",
    description:
      "Send a raw HTTP request to the Odoo JSON-2 API. Requires the API Key connection.",
  },
  inputs: rawHttpRequestInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection: conn, ...httpInputs }) => {
    const { baseUrl, authHeaders } = getClientConfig(conn);
    const { data } = await sendRawRequest(
      baseUrl,
      { ...httpInputs, debugRequest: context.debug.enabled },
      authHeaders,
    );
    return { data };
  },
});
