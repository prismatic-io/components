import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { rawRequestInputs } from "../../inputs";
import { getBaseUrl, getHeaders } from "../../util";

const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Sends a raw HTTP request to the Smartsheet API.",
  },
  inputs: rawRequestInputs,
  perform: async (context, { connection, ...httpClientInputs }) => {
    const baseUrl = getBaseUrl(connection);
    const headers = getHeaders(connection);
    const { data } = await sendRawRequest(
      baseUrl,
      { ...httpClientInputs, debugRequest: context.debug.enabled },
      headers,
    );
    return { data };
  },
});

export default rawRequest;
