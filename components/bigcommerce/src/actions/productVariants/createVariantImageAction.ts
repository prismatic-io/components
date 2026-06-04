import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { createVariantImageExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  getProductVariantId,
  productInputId,
  storeHash,
  variantImageURL,
} from "../../inputs";

export const createVariantImageAction = action({
  display: {
    label: "Create Variant Image",
    description: "Creates or updates an image for a specific product variant.",
  },
  examplePayload: createVariantImageExamplePayload,
  perform: async (
    context,
    { bigCommerceConnection, storeHash, product_id, variant_id, image_url },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );
    const endpoint = `/stores/${storeHash}/v3/catalog/products/${product_id}/variants/${variant_id}/image`;

    const data = {
      image_url,
    };

    try {
      const response = await client.post(endpoint, data);
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
    product_id: productInputId,
    variant_id: getProductVariantId,
    image_url: variantImageURL,
  },
});
