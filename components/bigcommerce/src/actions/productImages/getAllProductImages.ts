import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { getAllProductImagesExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  productImagesProductId,
  storeHash,
} from "../../inputs";

export const getAllProductImages = action({
  display: {
    label: "List Product Images",
    description:
      "Returns a list of product images with optional filter parameters.",
  },
  examplePayload: getAllProductImagesExamplePayload,
  perform: async (
    context,
    { bigCommerceConnection, storeHash, productImagesProductId },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );
    const endpoint = `/stores/${storeHash}/v3/catalog/products/${productImagesProductId}/images`;

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
    productImagesProductId,
  },
});
