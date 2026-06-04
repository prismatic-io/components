import { action, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import { deleteProductExamplePayload } from "../../examplePayloads/products";
import { connectionInput, productId, timeout } from "../../inputs";

export const deleteProduct = action({
  display: {
    label: "Delete Product",
    description: "Delete an existing product by ID.",
  },
  perform: async (context, { productId, timeout, stripeConnection }) => {
    const client = createStripeClient({
      stripeConnection,
      timeout: util.types.toInt(timeout),
    });
    return {
      data: await client.products.del(util.types.toString(productId)),
    };
  },
  inputs: { productId, timeout, stripeConnection: connectionInput },
  examplePayload: deleteProductExamplePayload,
});
