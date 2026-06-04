import { action } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { BASE_URL } from "../../constants";
import { connection, excludeAuthorization } from "../../inputs/shared";
import { getAuthorizationHeader, validateConnection } from "../../utils";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Klaviyo.",
  },
  inputs: {
    connection,
    excludeAuthorization,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments: `Input the path only (/api/accounts), The base URL is already included (${BASE_URL}). For example, to connect to ${BASE_URL}/api/accounts, only /api/accounts is entered in this field.`,
      example: "/api/accounts",
    },
  },
  perform: async (
    context,
    { connection, excludeAuthorization, ...rawRequestInputs },
  ) => {
    validateConnection(connection);
    const authorizationHeader = getAuthorizationHeader(connection);

    const { data } = await sendRawRequest(
      BASE_URL,
      {
        ...rawRequestInputs,
        debugRequest: context.debug.enabled,
      },
      excludeAuthorization ? {} : authorizationHeader,
    );
    return { data };
  },
});
