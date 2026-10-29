import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { rawRequestActionInputs } from "../../inputs";
import { getBaseUrl, getToken } from "../../util";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to System Surveyor.",
  },
  inputs: rawRequestActionInputs,
  perform: async (context, { connection, ...httpClientInputs }) => {
    const baseUrl = getBaseUrl(connection);
    const token = await getToken(connection, context.crossFlowState);

    const { data, headers } = await sendRawRequest(
      baseUrl,
      { ...httpClientInputs, debugRequest: context.debug.enabled },
      {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    );
    return { data: { data, headers } };
  },
});
