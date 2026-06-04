import { action, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import { getProductExamplePayload } from "../../examplePayloads/products";
import { connectionInput, productId, timeout } from "../../inputs";

export const getProduct = action({
  display: {
    label: "Get Product",
    description: "Retrieve the information and metadata of a product by ID.",
  },
  perform: async (context, { productId, timeout, stripeConnection }) => {
    const client = createStripeClient({
      stripeConnection,
      timeout: util.types.toInt(timeout),
    });
    return {
      data: await client.products.retrieve(util.types.toString(productId)),
    };
  },
  inputs: { productId, timeout, stripeConnection: connectionInput },
  examplePayload: getProductExamplePayload,
});
