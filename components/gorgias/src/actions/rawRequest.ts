import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { rawRequestInputs as inputs } from "../inputs/rawRequest";
import { getBaseUrl } from "../utils/getBaseUrl";
import { getConnectionHeaders } from "../utils/getConnectionHeaders";
import { validateConnection } from "../utils/validateConnection";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Gorgias API.",
  },
  perform: async (context, { connection, ...configVars }) => {
    validateConnection(connection);
    const { data } = await sendRawRequest(
      getBaseUrl(connection.fields.domain),
      configVars,
      getConnectionHeaders(connection),
    );

    return {
      data,
    };
  },
  inputs,
});
