import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { getProductImageExamplePayload as examplePayload } from "../../../examplePayloads";
import { getProductImageInputs as inputs } from "../../../inputsGql";
import { getProductImageGqlOutputSchema } from "../../../outputSchemas";
import type { Nodes } from "../../../types";
import getProductImageQuery from "../queries/productImage/GetProductImage.gql";

export const getProductImageGql = action({
  display: {
    label: "Get Product Image",
    description: "Retrieves a product image by ID.",
  },
  performSafety: "safe",
  perform: async (context, { productId, imageId, shopifyConnection }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );

    const data: { product: { media: { nodes: Nodes } } } = await client.request(
      getProductImageQuery,
      {
        productId,
        query: `id:${imageId}`,
      },
    );

    const image = data.product.media.nodes[0] || null;

    return {
      data: {
        image,
      },
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getProductImageGqlOutputSchema,
  }),
  examplePayload,
});
