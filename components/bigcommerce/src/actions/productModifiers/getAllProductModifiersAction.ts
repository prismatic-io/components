import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { getAllProductModifiersExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  getAllProductModifiersExcludeFields,
  getAllProductModifiersIncludeFields,
  getAllProductModifiersLimit,
  getAllProductModifiersPage,
  getAllProductModifiersProductId,
  storeHash,
} from "../../inputs";

export const getAllProductModifiersAction = action({
  display: {
    label: "List Product Modifiers",
    description: "Returns a list of all product modifiers.",
  },
  examplePayload: getAllProductModifiersExamplePayload,
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
    const endpoint = `/stores/${storeHash}/v3/catalog/products/${product_id}/modifiers?page=${page}&limit=${limit}&include_fields=${include_fields}&exclude_fields=${exclude_fields}`;

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
    product_id: getAllProductModifiersProductId,
    page: getAllProductModifiersPage,
    limit: getAllProductModifiersLimit,
    include_fields: getAllProductModifiersIncludeFields,
    exclude_fields: getAllProductModifiersExcludeFields,
  },
});
