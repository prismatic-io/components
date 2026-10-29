import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { rawRequestInputs } from "../../inputs";
import { getBaseURL, getProtocol, getToken } from "../../util";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to the SAP SuccessFactors API.",
  },
  inputs: rawRequestInputs,
  perform: async (context, { connection, ...rawRequestInputs }) => {
    const protocol = getProtocol(connection);
    const baseUrl = getBaseURL(connection);
    const token = await getToken(connection, baseUrl);
    const { data } = await sendRawRequest(
      `${baseUrl}${protocol}`,
      { ...rawRequestInputs, debugRequest: context.debug.enabled },
      {
        Authorization: `Bearer ${token}`,
      },
    );
    return { data };
  },
});
