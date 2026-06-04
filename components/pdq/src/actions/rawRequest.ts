import { action } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { connection } from "../inputs/general";
import { getAuthHeaders, getBaseUrl, validateConnection } from "../util";

const { debugRequest, ...rawRequestInputs } = httpClientInputs;

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to the PDQ API",
  },
  inputs: {
    connection,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments:
        "Input the path only (/deployments), The base URL is already included (https://app.pdq.com/v1/api). For example, to connect to https://app.pdq.com/v1/api/deployments, only /deployments is entered in this field. e.g. /deployments",
      placeholder: "/deployments",
      example: "/deployments",
    },
  },
  perform: async (context, { connection, ...httpClientInputs }) => {
    validateConnection(connection);
    const baseUrl = getBaseUrl();
    const headers = getAuthHeaders(connection);
    const { data } = await sendRawRequest(
      baseUrl,
      { ...httpClientInputs, debugRequest: context.debug.enabled },
      headers,
    );
    return { data };
  },
});
