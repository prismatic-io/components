import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { createProductImageExamplePayload as examplePayload } from "../../../examplePayloads";
import { createProductImageInputs as inputs } from "../../../inputsGql";
import createProductImageQuery from "../queries/productImage/CreateProductImage.gql";

export const createProductImageGql = action({
  display: {
    label: "Create Product Image",
    description: "Creates a new image for an existing product.",
  },
  perform: async (context, { productId, imageURL, imageAlt, shopifyConnection }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);

    const data: { productCreateMedia: Record<string, unknown> } = await client.request(
      createProductImageQuery,
      {
        id: productId,
        originalSource: imageURL,
        alt: imageAlt,
      },
    );

    return {
      data: data.productCreateMedia,
    };
  },
  inputs,
  examplePayload,
});
