import { action } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { connection } from "../inputs";
import { getAuthHeaders, getBaseUrl, validConnection } from "../util";

const { debugRequest, ...rawRequestInputs } = httpClientInputs;

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Ramp API",
  },
  inputs: {
    connection,
    ...rawRequestInputs,
    url: {
      ...httpClientInputs.url,
      comments:
        "Input the path only (/departments), The base URL is already included (https://api.ramp.com/developer/v1/). For example, to connect to https://api.ramp.com/developer/v1/departments, only /departments is entered in this field. e.g. /departments",
      placeholder: "/departments",
      example: "/departments",
    },
  },
  perform: async (context, { connection, ...httpClientInputs }) => {
    validConnection(connection);
    const headers = getAuthHeaders(connection);
    const baseUrl = getBaseUrl(connection);
    const { data } = await sendRawRequest(
      baseUrl,
      { ...httpClientInputs, debugRequest: context.debug.enabled },
      headers,
    );
    return { data };
  },
});
