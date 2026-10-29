import { action } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { getHeaders } from "../client";
import { connection } from "../inputs";

const { debugRequest: _, ...httpInputsWithoutDebug } = httpClientInputs;

const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Gong",
  },
  inputs: {
    connection,
    ...httpInputsWithoutDebug,
    url: {
      ...httpInputsWithoutDebug.url,
      example:
        "Input the path only (/v2/users), The base URL is already included (https://us-6852.app.gong.io/). For example, to connect to https://us-6852.app.gong.io/v2/users, only /v2/users is entered in this field.",
    },
  },
  perform: async (context, { connection, ...httpClientInputs }) => {
    const { baseUrl, headers } = getHeaders(connection);
    const { data } = await sendRawRequest(
      baseUrl,
      { ...httpClientInputs, debugRequest: context.debug.enabled },
      {
        ...headers,
      },
    );
    return { data };
  },
});

export default rawRequest;
