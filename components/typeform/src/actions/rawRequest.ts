import { action } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { connection } from "../inputs";
import { getAuthorizationHeaders } from "../util";
import { BASE_URL } from "../constants";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Typeform API",
  },
  inputs: {
    connection,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments:
        "Input the path only (/forms), The base URL is already included (https://api.typeform.com). For example, to connect to https://api.typeform.com/api/v3/forms, only /forms is entered in this field. e.g. /forms",
      example: "/forms",
      placeholder: "/forms",
    },
  },
  perform: async (context, { connection, ...rawRequestInputs }) => {
    const headers = getAuthorizationHeaders(connection);

    const { data } = await sendRawRequest(
      BASE_URL,
      {
        ...rawRequestInputs,
        debugRequest: context.debug.enabled,
      },
      {
        ...headers,
      },
    );
    return { data };
  },
});
