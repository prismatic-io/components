import { action, ConnectionError } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { getClientConfig } from "../../client";
import { rawHttpRequestInputs } from "../../inputs";
import { isLegacyConnection } from "../../legacy";
import { validateConnection } from "../../util";

export const rawHttpRequest = action({
  display: {
    label: "Raw Request (API Key)",
    description:
      "Send a raw HTTP request to the Odoo JSON-2 API. Requires the API Key connection.",
  },
  inputs: rawHttpRequestInputs,
  perform: async (context, { connection: conn, ...httpInputs }) => {
    if (isLegacyConnection(conn)) {
      throw new ConnectionError(
        conn,
        "Raw Request (API Key) requires the API Key connection. Use the Raw Request (Basic Auth) action for the Basic Authentication (Deprecated) connection.",
      );
    }
    validateConnection(conn);
    const { baseUrl, authHeaders } = getClientConfig(conn);
    const { data } = await sendRawRequest(
      baseUrl,
      { ...httpInputs, debugRequest: context.debug.enabled },
      authHeaders,
    );
    return { data };
  },
});
