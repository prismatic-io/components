import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { rawRequestInputs as inputs } from "../../inputs/misc";
import { getClientConfig } from "../../util";

const { debugRequest: _, ...rawRequestInputs } = inputs;

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Sends a raw HTTP request to the Freshservice API.",
  },
  inputs: rawRequestInputs,
  perform: async (context, { connection, ...httpClientInputs }) => {
    const { baseUrl, authorization } = getClientConfig(connection);

    const { data } = await sendRawRequest(
      baseUrl,
      { ...httpClientInputs, debugRequest: context.debug.enabled },
      { Authorization: authorization },
    );
    return { data };
  },
});
