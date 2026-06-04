import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { updateProductInputs } from "../../inputs";
import { updateProductExamplePayload } from "../../payloadExamples";

export const updateProduct = action({
  display: {
    label: "Update Product (Deprecated)",
    description:
      "Update the information and metadata of an existing product by Id. This version of the action is being deprecated. Please replace action with Update Product.",
  },
  perform: async (
    context,
    { productId, title, productStatus, tags, imageUrl, fieldValues, shopifyConnection },
  ) => {
    const client = getShopifyClient(shopifyConnection, undefined, context.debug.enabled);
    return {
      data: (
        await client.put(`/products/${productId}`, {
          product: {
            id: productId || undefined,
            title: title || undefined,
            status: productStatus || undefined,
            tags: tags || undefined,
            images: [{ src: imageUrl }],
            ...((fieldValues as Record<string, unknown>) || {}),
          },
        })
      ).data,
    };
  },
  inputs: updateProductInputs,
  examplePayload: {
    data: updateProductExamplePayload,
  },
});
