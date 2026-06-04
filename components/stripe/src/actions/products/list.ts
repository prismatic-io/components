import { action, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import { listProductsExamplePayload } from "../../examplePayloads/products";
import { connectionInput, limit, startingAfter, timeout } from "../../inputs";

export const listProducts = action({
  display: {
    label: "List Products",
    description: "Return a list of products.",
  },
  perform: async (context, params) => {
    const client = createStripeClient({
      stripeConnection: params.stripeConnection,
      timeout: util.types.toInt(params.timeout),
    });
    return {
      data: await client.products.list({
        limit: util.types.toNumber(params.limit) || undefined,
        starting_after: util.types.toString(params.startingAfter) || undefined,
      }),
    };
  },
  inputs: { timeout, limit, startingAfter, stripeConnection: connectionInput },
  examplePayload: listProductsExamplePayload,
});
