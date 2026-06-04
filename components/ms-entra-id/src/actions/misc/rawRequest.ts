import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { API_URL } from "../../constants";
import { rawRequestInputs as inputs } from "../../inputs/misc";
import { validateConnection } from "../../util";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Microsoft Entra ID.",
  },
  perform: async (_context, { connection, ...httpClientInputs }) => {
    validateConnection(connection);
    const token = connection?.token?.access_token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const { data } = await sendRawRequest(API_URL, httpClientInputs, headers);
    return { data };
  },
  inputs,
});
