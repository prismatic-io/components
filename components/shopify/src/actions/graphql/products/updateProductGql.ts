import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { updateProductExamplePayload as examplePayload } from "../../../examplePayloads";
import { updateProductInputs as inputs } from "../../../inputsGql";
import { updateProductGqlOutputSchema } from "../../../outputSchemas";
import updateProductQuery from "../queries/products/UpdateProduct.gql";
export const updateProductGql = action({
  display: {
    label: "Update Product",
    description: "Updates an existing product by ID.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      shopifyConnection,
      productId,
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

    const data: { productUpdate: Record<string, unknown> } =
      await client.request(updateProductQuery, {
        input: {
          id: productId,
          title,
          descriptionHtml,
          vendor,
          productType,
          status: productStatus,
          tags,
          ...additionalFields,
        },
        media,
      });

    return {
      data: data.productUpdate,
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateProductGqlOutputSchema,
  }),
  examplePerform: async () => examplePayload,
  examplePayload,
});
