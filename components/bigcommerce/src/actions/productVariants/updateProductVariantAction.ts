import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { updateProductVariantExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  getProductVariantId,
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

export const updateProductVariantAction = action({
  display: {
    label: "Update Product Variant",
    description: "Updates a specific product variant.",
  },
  examplePayload: updateProductVariantExamplePayload,
  perform: async (
    context,
    {
      bigCommerceConnection,
      storeHash,
      product_id,
      variant_id,
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
    const endpoint = `/stores/${storeHash}/v3/catalog/products/${product_id}/variants/${variant_id}`;

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
      const response = await client.put(endpoint, data);
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
    sku: variantSKU,
    option_values: variantOptionValues,
    price: variantPrice,
    weight: variantWeight,
    width: variantWidth,
    height: variantHeight,
    depth: variantDepth,
  },
});
