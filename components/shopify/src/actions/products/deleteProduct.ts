import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { deleteProductInputs } from "../../inputs";

export const deleteProduct = action({
  display: {
    label: "Delete Product (Deprecated)",
    description:
      "Delete an existing product. This version of the action is being deprecated. Please replace action with Delete Product.",
  },
  perform: async (context, { productId, shopifyConnection }) => {
    const client = getShopifyClient(shopifyConnection, undefined, context.debug.enabled);
    const { data } = await client.delete(`/products/${productId}`);
    return {
      data,
    };
  },
  inputs: deleteProductInputs,
  examplePayload: {
    data: {},
  },
});
