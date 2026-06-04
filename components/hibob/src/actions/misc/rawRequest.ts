import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { rawRequestInputs } from "../../inputs";
import { getAuthHeaders, getBaseUrl } from "../../util";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Sends a raw HTTP request to the HiBob API.",
  },
  inputs: rawRequestInputs,
  perform: async (context, { connection, ...rawRequestInputs }) => {
    const { data } = await sendRawRequest(
      getBaseUrl(connection),
      {
        ...rawRequestInputs,
        debugRequest: context.debug.enabled,
      },
      getAuthHeaders(connection),
    );
    return { data };
  },
});
