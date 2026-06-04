import querystring from "node:querystring";
import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { getProductCustomFieldsExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  limit,
  page,
  productCustomFieldsProductId,
  storeHash,
} from "../../inputs";

export const getProductCustomFields = action({
  display: {
    label: "Get Product Custom Fields",
    description: "Returns a list of product custom fields.",
  },
  examplePayload: getProductCustomFieldsExamplePayload,
  perform: async (
    context,
    {
      bigCommerceConnection,
      storeHash,
      productCustomFieldsProductId,
      page,
      limit,
    },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );
    const endpoint = `/stores/${storeHash}/v3/catalog/products/${productCustomFieldsProductId}/custom-fields`;

    const queryParams = querystring.stringify({
      page: page as number,
      limit: limit as number,
    });

    try {
      const response = await client.get(`${endpoint}?${queryParams}`);

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
    productCustomFieldsProductId,
    page,
    limit,
  },
});
