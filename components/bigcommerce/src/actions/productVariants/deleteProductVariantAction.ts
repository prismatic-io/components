import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { deleteProductVariantExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  getProductVariantId,
  productInputId,
  storeHash,
} from "../../inputs";

export const deleteProductVariantAction = action({
  display: {
    label: "Delete Product Variant",
    description: "Deletes a specific product variant.",
  },
  examplePayload: deleteProductVariantExamplePayload,
  perform: async (
    context,
    { bigCommerceConnection, storeHash, product_id, variant_id },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );
    const endpoint = `/stores/${storeHash}/v3/catalog/products/${product_id}/variants/${variant_id}`;

    try {
      const response = await client.delete(endpoint);
      return {
        data: response.data,
      };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },

  inputs: {
    bigCommerceConnection,
    storeHash: storeHash,
    product_id: productInputId,
    variant_id: getProductVariantId,
  },
});
