import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { getAllProductVariantsExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  createModifierProductId,
  getProductVariantsExcludeFields,
  getProductVariantsIncludeFields,
  getProductVariantsLimit,
  getProductVariantsPage,
  storeHash,
} from "../../inputs";

export const getAllProductVariantsAction = action({
  display: {
    label: "List Product Variants",
    description: "Returns a list of product variants.",
  },
  examplePayload: getAllProductVariantsExamplePayload,
  perform: async (
    context,
    {
      bigCommerceConnection,
      storeHash,
      product_id,
      page,
      limit,
      include_fields,
      exclude_fields,
    },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );
    const endpoint = `/stores/${storeHash}/v3/catalog/products/${product_id}/variants`;

    const params = {
      page,
      limit,
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
    page: getProductVariantsPage,
    limit: getProductVariantsLimit,
    include_fields: getProductVariantsIncludeFields,
    exclude_fields: getProductVariantsExcludeFields,
  },
});
