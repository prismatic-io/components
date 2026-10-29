import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { getProductVariantExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  createModifierProductId,
  getProductVariantId,
  getProductVariantsExcludeFields,
  getProductVariantsIncludeFields,
  storeHash,
} from "../../inputs";

export const getProductVariantAction = action({
  display: {
    label: "Get Product Variant",
    description: "Returns a specific product variant.",
  },
  examplePayload: getProductVariantExamplePayload,
  perform: async (
    context,
    {
      bigCommerceConnection,
      storeHash,
      product_id,
      variant_id,
      include_fields,
      exclude_fields,
    },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );
    const endpoint = `/stores/${storeHash}/v3/catalog/products/${product_id}/variants/${variant_id}`;

    const params = {
      include_fields,
      exclude_fields,
    };

    try {
      const response = await client.get(endpoint, { params });
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
    variant_id: getProductVariantId,
    include_fields: getProductVariantsIncludeFields,
    exclude_fields: getProductVariantsExcludeFields,
  },
});
