import { action, util } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { ANTHROPIC_VERSION, BASE_URL } from "../constants";
import { rawRequestInputs } from "../inputs/rawRequestInputs";
export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Anthropic",
  },
  inputs: rawRequestInputs,
  perform: async (context, { connection, ...httpClientInputs }) => {
    const { data } = await sendRawRequest(
      BASE_URL,
      {
        ...httpClientInputs,
        debugRequest: context.debug.enabled,
      },
      {
        "x-api-key": util.types.toString(connection.fields.apiKey),
        "anthropic-version": ANTHROPIC_VERSION,
      },
    );
    return { data };
  },
});
