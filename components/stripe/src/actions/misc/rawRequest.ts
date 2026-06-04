import { action, util } from "@prismatic-io/spectral";
import {
  handleErrors,
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { rawRequestExamplePayload } from "../../examplePayloads/misc";
import { connectionInput } from "../../inputs";
import { getStripeKey } from "../../util";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send a raw HTTP request to the Stripe API.",
  },
  inputs: {
    connection: connectionInput,
    ...httpClientInputs,
    url: {
      ...httpClientInputs.url,
      comments:
        "Input the path only (/products), The base URL is already included (https://api.stripe.com/v1). For example, to connect to https://api.stripe.com/v1/products, only /products is entered in this field.",
      example: "/products",
    },
  },
  perform: async (context, { connection, ...httpClientInputs }) => {
    const stripeKey = getStripeKey(connection);
    try {
      const { data } = await sendRawRequest("https://api.stripe.com/v1", httpClientInputs, {
        Authorization: `Bearer ${stripeKey}`,
      });
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  examplePayload: rawRequestExamplePayload,
});
