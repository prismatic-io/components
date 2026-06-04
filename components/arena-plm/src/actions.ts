import { action, input, util } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { getSessionId } from "./client";
import { rawRequestExamplePayload } from "./examplePayloads";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Arena PLM",
  },
  examplePayload: rawRequestExamplePayload,
  inputs: {
    connection: input({
      type: "connection",
      label: "Connection",
      required: true,
    }),
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments:
        "Input the path only (/v1/items), The base URL is already included (https://api.arenasolutions.com). For example, to connect to https://api.arenasolutions.com/v1/items, only /v1/items is entered in this field.",
      example: "/v1/items",
    },
  },
  perform: async (context, { connection, ...rawRequestInputs }) => {
    const sessionId = await getSessionId(connection, context.debug.enabled);
    const baseUrl = util.types.toString(connection.fields.region);

    const { data } = await sendRawRequest(
      baseUrl,
      { ...rawRequestInputs, debugRequest: context.debug.enabled },
      {
        Cookie: `arena_session_id=${sessionId}`,
      },
    );
    return { data };
  },
});

export default { rawRequest };
