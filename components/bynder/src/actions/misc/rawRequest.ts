import { action, util } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { getBynderURL, validateConnection } from "../../client";
import { connection } from "../../inputs";

const { debugRequest: _, ...httpInputsWithoutDebug } = httpClientInputs;

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Bynder",
  },
  inputs: {
    connection,
    ...httpInputsWithoutDebug,
    url: {
      ...httpClientInputs.url,
      example:
        "Input the path only (/v4/media/), The base URL is already included (https://your-bynder-domain/api/). For example, to connect to https://your-bynder-domain/api/v4/media/, only /v4/media/ is entered in this field. e.g. /v4/media/",
      placeholder: "/v4/media/",
    },
  },
  perform: async (context, { connection, ...httpClientInputs }) => {
    validateConnection(connection);
    const url = getBynderURL(connection);
    const token = util.types.toString(connection.token?.access_token);
    const { data } = await sendRawRequest(
      `${url}/api`,
      { ...httpClientInputs, debugRequest: context.debug.enabled },
      {
        Authorization: `Bearer ${token}`,
      },
    );
    return { data };
  },
});
