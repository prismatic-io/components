import { action, outputSchema } from "@prismatic-io/spectral";
import { createStripeClient } from "../../client";
import { getProductExamplePayload } from "../../examplePayloads/products";
import { getProductInputs } from "../../inputs";
import { productOutputSchema } from "../../outputSchemas";
export const getProduct = action({
  display: {
    label: "Get Product",
    description: "Retrieve the information and metadata of a product by ID.",
  },
  performSafety: "safe",
  perform: async (context, { productId, timeout, stripeConnection }) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    return {
      data: await client.products.retrieve(productId),
    };
  },
  inputs: getProductInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: productOutputSchema,
  }),
  examplePayload: getProductExamplePayload,
});
