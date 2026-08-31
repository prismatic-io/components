import { action, util } from "@prismatic-io/spectral";
import {
  handleErrors,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { rawRequestExamplePayload } from "../../examplePayloads/misc";
import { rawRequestInputs } from "../../inputs";
import { getStripeKey } from "../../util";
export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send a raw HTTP request to the Stripe API.",
  },
  inputs: rawRequestInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, ...httpClientInputs }) => {
    const stripeKey = getStripeKey(connection);
    try {
      const { data } = await sendRawRequest(
        "https://api.stripe.com/v1",
        httpClientInputs,
        {
          Authorization: `Bearer ${stripeKey}`,
        },
      );
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  examplePayload: rawRequestExamplePayload,
});
