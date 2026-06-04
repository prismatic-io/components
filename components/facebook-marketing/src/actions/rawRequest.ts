import { action } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { myConnectionField, version } from "../inputs";
import { getAuthHeaders, getBaseUrl, validateConnection } from "../util";

const { debugRequest, ...restHttpClientInputs } = httpClientInputs;

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
  inputs: {
    connection: myConnectionField,
    version,
    ...restHttpClientInputs,
    url: {
      ...httpClientInputs.url,
      comments:
        "Input the path only (/me/adaccounts), The base URL is already included (https://graph.facebook.com/v<INPUT_VERSION>.0). For example, to connect to https://graph.facebook.com/v<INPUT_VERSION>.0/me/adaccounts, only /me/adaccounts is entered in this field.",
      example: "/me/adaccounts",
    },
  },
});
