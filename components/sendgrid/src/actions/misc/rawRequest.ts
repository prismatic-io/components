import { action, util } from "@prismatic-io/spectral";
import {
  handleErrors,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { API_VERSION, BASE_URL } from "../../constants";
import { rawRequestInputs } from "../../inputs";
import { validateConnection } from "../../util";
export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Sends a raw HTTP request to SendGrid.",
  },
  inputs: rawRequestInputs,
  perform: async (context, { connection, ...httpInputs }) => {
    validateConnection(connection);
    const apiKey = util.types.toString(connection.fields.apiKey);
    try {
      const { data } = await sendRawRequest(
        `${BASE_URL}/${API_VERSION}`,
        { ...httpInputs, debugRequest: context.debug.enabled },
        {
          Authorization: `Bearer ${apiKey}`,
        },
      );
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
});
