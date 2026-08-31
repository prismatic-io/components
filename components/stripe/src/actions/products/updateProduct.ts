import { action, outputSchema } from "@prismatic-io/spectral";
import { createStripeClient } from "../../client";
import { updateProductExamplePayload } from "../../examplePayloads/products";
import { updateProductInputs } from "../../inputs";
import { productOutputSchema } from "../../outputSchemas";
export const updateProduct = action({
  display: {
    label: "Update Product",
    description: "Update an existing product.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      productId,
      updateProductName,
      productUrl,
      shippable,
      active,
      description,
      productImages,
      metadata,
      fieldValues,
      timeout,
      stripeConnection,
    },
  ) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    return {
      data: await client.products.update(productId, {
        name: updateProductName,
        active,
        description: description,
        images: productImages,
        ...fieldValues,
        shippable,
        url: productUrl,
        metadata,
      }),
    };
  },
  examplePerform: async (
    _context,
    {
      productId,
      updateProductName,
      productUrl,
      shippable,
      active,
      description,
      productImages,
      metadata,
    },
  ): Promise<{
    data: unknown;
  }> => {
    const product = updateProductExamplePayload.data as Record<string, unknown>;
    return {
      data: {
        ...product,
        id: productId,
        name: updateProductName ?? product.name,
        active,
        description: description ?? product.description,
        images: productImages ?? product.images,
        shippable,
        url: productUrl ?? product.url,
        metadata,
      },
    };
  },
  inputs: updateProductInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: productOutputSchema,
  }),
  examplePayload: updateProductExamplePayload,
});
