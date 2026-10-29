import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { action } from "@prismatic-io/spectral";
import { rawRequestInputs } from "../../inputs";
import { getHeaders } from "../../util";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send a raw HTTP request to Xero.",
  },
  inputs: rawRequestInputs,
  perform: async (context, { connection, ...rawRequestInputs }) => {
    const headers = await getHeaders(connection, context.debug.enabled);
    const { data } = await sendRawRequest(
      "https://api.xero.com/api.xro/2.0",
      {
        debugRequest: context.debug.enabled,
        ...rawRequestInputs,
      },
      headers,
    );
    return { data };
  },
});
