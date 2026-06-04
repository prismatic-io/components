import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { createProductImageExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  createProductImageImageFile,
  createProductImageImageUrl,
  createProductImageProductId,
  storeHash,
} from "../../inputs";

export const createProductImageAction = action({
  display: {
    label: "Create Product Image",
    description: "Creates a product image.",
  },
  examplePayload: createProductImageExamplePayload,
  perform: async (
    context,
    { bigCommerceConnection, storeHash, product_id, image_file, image_url },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );
    const endpoint = `/stores/${storeHash}/v3/catalog/products/${product_id}/images`;
    const requestBody = {
      product_id,
      image_file,
      image_url,
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
    storeHash,
    product_id: createProductImageProductId,
    image_file: createProductImageImageFile,
    image_url: createProductImageImageUrl,
  },
});
