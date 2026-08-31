import { action, outputSchema } from "@prismatic-io/spectral";
import type Stripe from "stripe";
import { createStripeClient } from "../../client";
import { createProductExamplePayload } from "../../examplePayloads/products";
import { createProductInputs } from "../../inputs";
import { productOutputSchema } from "../../outputSchemas";
export const createProduct = action({
  display: {
    label: "Create Product",
    description: "Create a new product.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      productName,
      productType,
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
      data: await client.products.create({
        name: productName,
        active,
        description: description,
        images: productImages,
        ...(productType && {
          type: productType as Stripe.ProductCreateParams.Type,
        }),
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
      productName,
      productType,
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
    const product = createProductExamplePayload.data as Record<string, unknown>;
    return {
      data: {
        ...product,
        name: productName,
        active,
        description: description ?? product.description,
        images: productImages ?? product.images,
        type: productType ?? product.type,
        shippable,
        url: productUrl ?? product.url,
        metadata,
      },
    };
  },
  inputs: createProductInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: productOutputSchema,
  }),
  examplePayload: createProductExamplePayload,
});
