import { action } from "@prismatic-io/spectral";
import { cleanReturnData, getBaseUrl, validateConnection } from "../../util";
import { rawRequestInputs } from "../../inputs/misc";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Bill.",
  },
  inputs: rawRequestInputs,
  perform: async (context, { connection, ...httpClientInputs }) => {
    validateConnection(connection);

    const { data } = await sendRawRequest(getBaseUrl(connection), {
      ...httpClientInputs,
      debugRequest: context.debug.enabled,
    });
    return { data: cleanReturnData(data) };
  },
});
