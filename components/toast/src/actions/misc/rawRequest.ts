import { action, util } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { rawRequestInputs as inputs } from "../../inputs/misc";
import { getToastToken, validateConnection } from "../../utils";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Toast.",
  },
  inputs,
  perform: async (_context, { connection, ...httpClientInputs }) => {
    validateConnection(connection);
    const token = await getToastToken(
      connection,
      httpClientInputs.debugRequest,
    );
    const { data } = await sendRawRequest(
      util.types.toString(connection.fields.apiUrl),
      httpClientInputs,
      {
        Authorization: token,
      },
    );
    return { data };
  },
});
