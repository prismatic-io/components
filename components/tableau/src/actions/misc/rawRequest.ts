import { action, util } from "@prismatic-io/spectral";
import {
  handleErrors,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { rawRequestExamplePayload } from "../../examplePayloads";
import { rawRequestInputs } from "../../inputs";
import { signIn } from "../../util";
export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Tableau.",
  },
  examplePayload: rawRequestExamplePayload,
  inputs: rawRequestInputs,
  perform: async (
    _context,
    { connection, apiVersion, ...httpClientInputs },
  ) => {
    const {
      credentials: {
        token,
        site: { id },
      },
    } = await signIn({ tableauConnection: connection });
    try {
      const baseUrl = `https://${connection.fields.hostName}/api/${apiVersion}/sites/${id}`;
      const { data } = await sendRawRequest(baseUrl, httpClientInputs, {
        "X-Tableau-Auth": token,
      });
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
});
