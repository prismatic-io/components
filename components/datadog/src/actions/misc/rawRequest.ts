import { action } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { getAuthHeaders, getBaseUrl } from "../../client";
import { connection } from "../../inputs";
import { validateConnection } from "../../utils";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send a raw HTTP request to any Datadog API endpoint.",
  },
  inputs: {
    connection,
    ...httpClientInputs,
    url: {
      ...httpClientInputs.url,
      comments:
        "The URL path to send the request to. The base URL is determined by the Datadog Site configured in the connection. For example, to call the Submit Metrics endpoint, enter /api/v2/series.",
      example: "/api/v2/series",
    },
  },
  perform: async (context, { connection: conn, ...httpInputs }) => {
    validateConnection(conn);
    const { data } = await sendRawRequest(
      getBaseUrl(conn),
      { ...httpInputs, debugRequest: context.debug.enabled },
      getAuthHeaders(conn),
    );
    return { data };
  },
});
