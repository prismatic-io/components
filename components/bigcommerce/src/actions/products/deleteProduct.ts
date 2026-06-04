import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { deleteProductExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  productIdToDelete,
  storeHash,
} from "../../inputs";

export const deleteProduct = action({
  display: {
    label: "Delete Product",
    description: "Deletes a product.",
  },
  examplePayload: deleteProductExamplePayload,
  perform: async (
    context,
    { bigCommerceConnection, storeHash, productIdToDelete },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );
    const endpoint = `/stores/${storeHash}/v3/catalog/products/${productIdToDelete}`;

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
    productIdToDelete,
  },
});
