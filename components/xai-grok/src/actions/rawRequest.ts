import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { API_BASE_URL } from "../constants";
import { rawRequestInputs } from "../inputs";
import { getToken, validateConnection } from "../util";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to xAI",
  },
  inputs: rawRequestInputs,
  perform: async (context, { connection, ...rawRequestInputs }) => {
    validateConnection(connection);
    const token = getToken(connection);
    const { data } = await sendRawRequest(
      API_BASE_URL,
      {
        ...rawRequestInputs,
        debugRequest: context.debug.enabled,
      },
      {
        Authorization: `Bearer ${token}`,
      },
    );
    return { data };
  },
});
