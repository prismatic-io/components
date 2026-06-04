import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { getProductImageExamplePayload as examplePayload } from "../../../examplePayloads";
import { getProductImageInputs as inputs } from "../../../inputsGql";
import type { Nodes } from "../../interfaces/Nodes";
import getProductImageQuery from "../queries/productImage/GetProductImage.gql";

export const getProductImageGql = action({
  display: {
    label: "Get Product Image",
    description: "Retrieves a product image by ID.",
  },
  perform: async (context, { productId, imageId, shopifyConnection }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);

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
  examplePayload,
});
