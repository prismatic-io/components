import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { getProductImageExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  productImageImageId,
  productImageProductId,
  storeHash,
} from "../../inputs";

export const getProductImage = action({
  display: {
    label: "Get Product Image",
    description: "Returns a single product image.",
  },
  examplePayload: getProductImageExamplePayload,
  perform: async (
    context,
    {
      bigCommerceConnection,
      storeHash,
      productImageProductId,
      productImageImageId,
    },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );
    const endpoint = `/stores/${storeHash}/v3/catalog/products/${productImageProductId}/images/${productImageImageId}`;

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
    storeHash,
    productImageProductId,
    productImageImageId,
  },
});
