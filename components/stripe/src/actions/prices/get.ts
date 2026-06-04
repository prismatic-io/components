import { action, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import { getPriceExamplePayload } from "../../examplePayloads/prices";
import { connectionInput, priceId, timeout } from "../../inputs";

export const getPrice = action({
  display: {
    label: "Get Price",
    description: "Retrieve the information and metadata of a price by ID.",
  },
  perform: async (context, { priceId, timeout, stripeConnection }) => {
    const client = createStripeClient({
      stripeConnection,
      timeout: util.types.toInt(timeout),
    });
    return {
      data: await client.prices.retrieve(util.types.toString(priceId)),
    };
  },
  inputs: { priceId, timeout, stripeConnection: connectionInput },
  examplePayload: getPriceExamplePayload,
});
