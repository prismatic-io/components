import { action, util } from "@prismatic-io/spectral";
import {
  handleErrors,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { rawRequestInputs } from "../../inputs";
import { getBasicAuthString } from "../../util";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send a raw HTTP request to Twilio.",
  },
  inputs: rawRequestInputs,
  perform: async (context, { twilioConnection, ...rawRequestParams }) => {
    const authorization: string = getBasicAuthString(twilioConnection);

    try {
      const { data } = await sendRawRequest(
        "https://api.twilio.com/2010-04-01",
        {
          ...rawRequestParams,
          debugRequest: context.debug.enabled,
        },
        { Authorization: authorization },
      );
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
});
