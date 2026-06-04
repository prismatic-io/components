import { action, util } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { rawRequestExamplePayload } from "../../examplePayloads";
import { connectionInput } from "../../inputs";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Sends a raw HTTP request to Adobe Analytics.",
  },
  inputs: {
    connection: connectionInput,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments:
        "Input the path only (/discovery/me), The base URL is already included (https://analytics.adobe.io). For example, to connect to https://analytics.adobe.io/discovery/me, only /discovery/me is entered in this field.",
      example: "/discovery/me",
    },
  },
  perform: async (context, { connection, ...rawRequestInputs }) => {
    const { data, headers } = await sendRawRequest(
      "https://analytics.adobe.io",
      { ...rawRequestInputs, debugRequest: context.debug.enabled },
      {
        "x-api-key": util.types.toString(connection.fields.clientId),
        Authorization: `Bearer ${connection.token?.access_token}`,
      },
    );
    return { data: { data, headers } };
  },
  examplePayload: rawRequestExamplePayload,
});
