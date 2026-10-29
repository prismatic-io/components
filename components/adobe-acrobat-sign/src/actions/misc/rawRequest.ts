import { action, util } from "@prismatic-io/spectral";
import { rawRequestInputs } from "../../inputs";
import {
  handleErrors,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { getClientProps } from "../../client";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Sends a raw HTTP request to Adobe Acrobat Sign.",
  },
  inputs: rawRequestInputs,
  perform: async (context, { connection, ...rawRequestInputs }) => {
    try {
      const { baseUrl, token } = getClientProps(connection);
      const { data, headers } = await sendRawRequest(
        `${baseUrl + "api/rest/v6"}`,
        { ...rawRequestInputs, debugRequest: context.debug.enabled },
        {
          Authorization: token,
          "Content-Type": "Application/JSON",
        },
      );

      return {
        data: { data, headers },
      };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
});
