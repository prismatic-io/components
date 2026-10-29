import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { deleteProductModifierExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  createModifierProductId,
  getModifierId,
  storeHash,
} from "../../inputs";

export const deleteProductModifierAction = action({
  display: {
    label: "Delete Product Modifier",
    description: "Deletes a product modifier.",
  },
  examplePayload: deleteProductModifierExamplePayload,
  perform: async (
    context,
    { bigCommerceConnection, storeHash, product_id, modifier_id },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );
    const endpoint = `/stores/${storeHash}/v3/catalog/products/${product_id}/modifiers/${modifier_id}`;

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
    product_id: createModifierProductId,
    modifier_id: getModifierId,
  },
});
