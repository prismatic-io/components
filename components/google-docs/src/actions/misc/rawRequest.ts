import { action, util } from "@prismatic-io/spectral";
import { rawRequestInputs } from "../../inputs";
import { getToken } from "../../client";
import {
  handleErrors,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Google Docs",
  },
  inputs: rawRequestInputs,
  perform: async (context, { connection, ...httpClientInputs }) => {
    const token = getToken(connection);
    try {
      const { data } = await sendRawRequest(
        "https://docs.googleapis.com",
        httpClientInputs,
        { Authorization: `Bearer ${token}` },
      );
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
});
