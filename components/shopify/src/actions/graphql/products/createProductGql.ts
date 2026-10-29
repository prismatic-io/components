import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { createProductExamplePayload } from "../../../examplePayloads";
import { createProductInputs as inputs } from "../../../inputsGql";
import { createProductGqlOutputSchema } from "../../../outputSchemas";
import type { Product } from "../../../types";
import { productMapper } from "../mappers/productMapper";
import createProductQuery from "../queries/products/CreateProduct.gql";

export const createProductGql = action({
  display: {
    label: "Create Product",
    description: "Creates a new product.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      shopifyConnection,
      title,
      descriptionHtml,
      productType,
      productStatus,
      vendor,
      imageUrl,
      imageAlt,
      tags,
      additionalFields,
    },
  ) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );

    const media = imageUrl
      ? [
          {
            originalSource: imageUrl,
            alt: imageAlt,
            mediaContentType: "IMAGE",
          },
        ]
      : undefined;

    const { productCreate }: { productCreate: { product: Product } } =
      await client.request(createProductQuery, {
        input: {
          title,
          descriptionHtml,
          vendor,
          productType,
          tags,
          status: productStatus,
          ...additionalFields,
        },
        media,
      });

    return {
      data: {
        product: productMapper(productCreate.product),
      },
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createProductGqlOutputSchema,
  }),
  examplePerform: async () => createProductExamplePayload.restMap,
  examplePayload: createProductExamplePayload.restMap,
});
