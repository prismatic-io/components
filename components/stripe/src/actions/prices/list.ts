import { action, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import { listPricesExamplePayload } from "../../examplePayloads/prices";
import { connectionInput, limit, startingAfter, timeout } from "../../inputs";

export const listPrices = action({
  display: {
    label: "List Prices",
    description: "Return a list of all available prices.",
  },
  perform: async (context, params) => {
    const client = createStripeClient({
      stripeConnection: params.stripeConnection,
      timeout: util.types.toInt(params.timeout),
    });
    return {
      data: await client.prices.list({
        limit: util.types.toNumber(params.limit) || undefined,
        starting_after: util.types.toString(params.startingAfter) || undefined,
      }),
    };
  },
  inputs: { timeout, limit, startingAfter, stripeConnection: connectionInput },
  examplePayload: listPricesExamplePayload,
});
