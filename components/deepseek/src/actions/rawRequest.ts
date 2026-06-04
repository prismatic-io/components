import { action, Connection } from "@prismatic-io/spectral";
import {
  sendRawRequest,
  inputs as httpClientInputs,
} from "@prismatic-io/spectral/dist/clients/http";
import { validateConnection } from "../client";
import { connection } from "../inputs/general";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send a Raw Request to the DeepSeek API.",
  },
  inputs: {
    connection,
    ...httpClientInputs,
  },
  perform: async (context, { connection, ...httpClientInputs }) => {
    const { baseUrl, apiKey } = validateConnection(connection as Connection);
    const { data } = await sendRawRequest(
      baseUrl,
      {
        ...httpClientInputs,
        debugRequest: context.debug.enabled,
      },
      {
        Authorization: `Bearer ${apiKey}`,
      }
    );

    return { data };
  },
});
