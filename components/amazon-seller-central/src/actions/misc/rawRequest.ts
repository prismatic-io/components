import { action, PerformSafety } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/http";
import { validateConnection } from "../../client";
import { rawRequestInputs } from "../../inputs";
import { getAccessToken, getBaseUrl, getHeaders } from "../../util";

const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Sends a raw HTTP request to Amazon Seller Central.",
  },
  inputs: rawRequestInputs,
  performSafety: PerformSafety.NOT_ALLOWED,
  perform: async (_context, { connection, ...httpClientInputs }) => {
    validateConnection(connection);
    const accessToken = getAccessToken(connection);
    const baseUrl = getBaseUrl(connection);
    const { data } = await sendRawRequest(
      `https://${baseUrl}`,
      httpClientInputs,
      getHeaders(baseUrl, accessToken),
    );
    return { data };
  },
});

export default rawRequest;
