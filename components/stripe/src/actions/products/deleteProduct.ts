import { action, outputSchema } from "@prismatic-io/spectral";
import { createStripeClient } from "../../client";
import { deleteProductExamplePayload } from "../../examplePayloads/products";
import { deleteProductInputs } from "../../inputs";
import { deleteProductOutputSchema } from "../../outputSchemas";
export const deleteProduct = action({
  display: {
    label: "Delete Product",
    description: "Delete an existing product by ID.",
  },
  performSafety: "notAllowed",
  perform: async (context, { productId, timeout, stripeConnection }) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    return {
      data: await client.products.del(productId),
    };
  },
  examplePerform: async (
    _context,
    { productId },
  ): Promise<{
    data: unknown;
  }> => {
    const deleted = deleteProductExamplePayload.data as Record<string, unknown>;
    return {
      data: {
        ...deleted,
        id: productId,
      },
    };
  },
  inputs: deleteProductInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteProductOutputSchema,
  }),
  examplePayload: deleteProductExamplePayload,
});
