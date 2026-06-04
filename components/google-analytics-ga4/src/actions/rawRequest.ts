import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { rawRequestInputs } from "../inputs";

const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Google Analytics GA4",
  },
  inputs: rawRequestInputs,
  perform: async (context, { connection, baseUrl, ...restInputs }) => {
    const { data } = await sendRawRequest(
      baseUrl,
      { ...restInputs, debugRequest: context.debug.enabled },
      {
        Authorization: `Bearer ${connection.token?.access_token}`,
      },
    );
    return { data };
  },
});

export default { rawRequest };
