import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { createClient, getBaseUrl } from "../../client";
import { rawRequestInputs } from "../../inputs";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description:
      "Send a raw HTTP request to the Jamf Pro API or the Classic API.",
  },
  inputs: rawRequestInputs,
  perform: async (context, { connection, apiType, ...httpInputs }) => {
    const client = await createClient(connection, context.debug.enabled);
    const baseUrl = `${getBaseUrl(connection)}/${apiType}`;
    const { data } = await sendRawRequest(
      baseUrl,
      { ...httpInputs, debugRequest: context.debug.enabled },
      (client.defaults?.headers as Record<string, string>) ?? {},
    );
    return { data };
  },
});
