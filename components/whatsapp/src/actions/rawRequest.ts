import { action } from "@prismatic-io/spectral";
import { rawRequestInputs } from "../inputs/rawRequestInputs";
import { validateConnection } from "../utils";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { GRAPH_API_URL } from "../constants";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to WhatsApp Business API.",
  },
  inputs: rawRequestInputs,
  perform: async (context, { connection, ...httpClientInputs }) => {
    validateConnection(connection);
    const token = connection.fields.accessToken;

    const { data } = await sendRawRequest(GRAPH_API_URL, httpClientInputs, {
      Authorization: `Bearer ${token}`,
    });
    return { data };
  },
});
