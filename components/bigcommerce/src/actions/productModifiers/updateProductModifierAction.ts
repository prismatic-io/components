import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { updateProductModifierExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  createModifierConfig,
  createModifierDisplayName,
  createModifierOptionValues,
  createModifierProductId,
  createModifierRequired,
  createModifierSortOrder,
  createModifierType,
  getModifierId,
  storeHash,
} from "../../inputs";

export const updateProductModifierAction = action({
  display: {
    label: "Update Product Modifier",
    description: "Updates a product modifier.",
  },
  examplePayload: updateProductModifierExamplePayload,
  perform: async (
    context,
    {
      bigCommerceConnection,
      storeHash,
      product_id,
      modifier_id,
      type,
      required,
      sort_order,
      config,
      option_values,
      display_name,
    },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );
    const endpoint = `/stores/${storeHash}/v3/catalog/products/${product_id}/modifiers/${modifier_id}`;
    const requestBody = {
      type,
      required,
      sort_order,
      config,
      option_values,
      display_name,
    };

    try {
      const response = await client.put(endpoint, requestBody);
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
    type: createModifierType,
    required: createModifierRequired,
    sort_order: createModifierSortOrder,
    config: createModifierConfig,
    option_values: createModifierOptionValues,
    display_name: createModifierDisplayName,
  },
});
