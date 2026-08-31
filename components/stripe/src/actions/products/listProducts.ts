import { action, outputSchema } from "@prismatic-io/spectral";
import { createStripeClient } from "../../client";
import { listProductsExamplePayload } from "../../examplePayloads/products";
import { listProductsInputs } from "../../inputs";
import { listProductsOutputSchema } from "../../outputSchemas";
export const listProducts = action({
  display: {
    label: "List Products",
    description: "Return a list of products.",
  },
  performSafety: "safe",
  perform: async (context, params) => {
    const client = createStripeClient({
      stripeConnection: params.stripeConnection,
      timeout: params.timeout,
    });
    return {
      data: await client.products.list({
        limit: params.pagination.limit,
        starting_after: params.pagination.startingAfter,
      }),
    };
  },
  inputs: listProductsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listProductsOutputSchema,
  }),
  examplePayload: listProductsExamplePayload,
});
