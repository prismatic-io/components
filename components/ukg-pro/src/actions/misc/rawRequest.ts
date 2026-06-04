import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { rawRequestActionInputs } from "../../inputs";
import { getAuthHeaders, getBaseUrl } from "../../util/connection";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to UKG Pro API.",
  },
  inputs: rawRequestActionInputs,
  perform: async (context, { connection, ...httpInputs }) => {
    const baseUrl = getBaseUrl(connection);
    const headers = await getAuthHeaders(connection);

    const { data } = await sendRawRequest(
      baseUrl,
      {
        ...httpInputs,
        debugRequest: context.debug.enabled,
      },
      headers,
    );

    return { data };
  },
});
