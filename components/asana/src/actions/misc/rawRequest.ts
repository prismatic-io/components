import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { rawRequestInputs } from "../../inputs";
export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send a raw HTTP request to Asana.",
  },
  inputs: rawRequestInputs,
  perform: async (context, { connection, ...rawRequestInputs }) => {
    const asanaToken =
      connection?.token?.access_token || connection?.fields?.apiKey;
    const { data } = await sendRawRequest(
      "https://app.asana.com/api/1.0",
      { ...rawRequestInputs, debugRequest: context.debug.enabled },
      { Authorization: `Bearer ${asanaToken}` },
    );
    return { data };
  },
});
