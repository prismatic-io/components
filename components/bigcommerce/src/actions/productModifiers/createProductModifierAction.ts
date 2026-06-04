import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { createProductModifierExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  createModifierConfig,
  createModifierDisplayName,
  createModifierOptionValues,
  createModifierProductId,
  createModifierRequired,
  createModifierSortOrder,
  createModifierType,
  storeHash,
} from "../../inputs";

export const createProductModifierAction = action({
  display: {
    label: "Create Product Modifier",
    description: "Creates a product modifier.",
  },
  examplePayload: createProductModifierExamplePayload,
  perform: async (
    context,
    {
      bigCommerceConnection,
      storeHash,
      product_id,
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
    const endpoint = `/stores/${storeHash}/v3/catalog/products/${product_id}/modifiers`;
    const requestBody = {
      type,
      required,
      sort_order,
      config,
      option_values,
      display_name,
    };

    try {
      const response = await client.post(endpoint, requestBody);
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
    type: createModifierType,
    required: createModifierRequired,
    sort_order: createModifierSortOrder,
    config: createModifierConfig,
    option_values: createModifierOptionValues,
    display_name: createModifierDisplayName,
  },
});
