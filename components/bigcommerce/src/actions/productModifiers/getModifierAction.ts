import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { getModifierExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  getModifierExcludeFields,
  getModifierId,
  getModifierIncludeFields,
  getModifierProductId,
  storeHash,
} from "../../inputs";

export const getModifierAction = action({
  display: {
    label: "Get Product Modifier",
    description: "Returns a single product modifier.",
  },
  examplePayload: getModifierExamplePayload,
  perform: async (
    context,
    {
      bigCommerceConnection,
      storeHash,
      product_id,
      modifier_id,
      include_fields,
      exclude_fields,
    },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );
    const endpoint = `/stores/${storeHash}/v3/catalog/products/${product_id}/modifiers/${modifier_id}?include_fields=${include_fields}&exclude_fields=${exclude_fields}`;

    try {
      const response = await client.get(endpoint);
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
    product_id: getModifierProductId,
    modifier_id: getModifierId,
    include_fields: getModifierIncludeFields,
    exclude_fields: getModifierExcludeFields,
  },
});
