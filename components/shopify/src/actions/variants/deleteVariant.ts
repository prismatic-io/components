import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { deleteVariantInputs } from "../../inputs";

export const deleteVariant = action({
  display: {
    label: "Delete Variant",
    description: "Deletes an existing variant by ID.",
  },
  perform: async (context, { productId, variantId, shopifyConnection }) => {
    const client = getShopifyClient(shopifyConnection, undefined, context.debug.enabled);
    return {
      data: (await client.delete(`/products/${productId}/variants/${variantId}`)).data,
    };
  },
  examplePayload: {
    data: {},
  },
  inputs: deleteVariantInputs,
});
