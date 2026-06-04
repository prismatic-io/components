import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { deleteProductImageExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  deleteProductImageImageId,
  deleteProductImageProductId,
  storeHash,
} from "../../inputs";

export const deleteProductImageAction = action({
  display: {
    label: "Delete Product Image",
    description: "Deletes a product image.",
  },
  examplePayload: deleteProductImageExamplePayload,
  perform: async (
    context,
    { bigCommerceConnection, storeHash, product_id, image_id },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );
    const endpoint = `/stores/${storeHash}/v3/catalog/products/${product_id}/images/${image_id}`;

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
    storeHash,
    product_id: deleteProductImageProductId,
    image_id: deleteProductImageImageId,
  },
});
