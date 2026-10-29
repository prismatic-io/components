import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { createProductVariantExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  productInputId,
  storeHash,
  variantDepth,
  variantHeight,
  variantOptionValues,
  variantPrice,
  variantSKU,
  variantWeight,
  variantWidth,
} from "../../inputs";

export const createProductVariantAction = action({
  display: {
    label: "Create Product Variant",
    description: "Creates a new product variant in BigCommerce.",
  },
  examplePayload: createProductVariantExamplePayload,
  perform: async (
    context,
    {
      bigCommerceConnection,
      storeHash,
      product_id,
      sku,
      option_values,
      price,
      weight,
      width,
      height,
      depth,
    },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );
    const endpoint = `/stores/${storeHash}/v3/catalog/products/${product_id}/variants`;

    const data = {
      sku,
      option_values,
      price,
      weight,
      width,
      height,
      depth,
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
    sku: variantSKU,
    option_values: variantOptionValues,
    price: variantPrice,
    weight: variantWeight,
    width: variantWidth,
    height: variantHeight,
    depth: variantDepth,
  },
});
