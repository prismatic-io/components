import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { updateProductExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  productId,
  storeHash,
  uniqueCostPrice,
  uniqueProductDepth,
  uniqueProductHeight,
  uniqueProductName,
  uniqueProductPrice,
  uniqueProductType,
  uniqueProductWeight,
  uniqueProductWidth,
  uniqueRetailPrice,
  uniqueSalePrice,
} from "../../inputs";

export const updateProduct = action({
  display: {
    label: "Update Product",
    description: "Updates a product in the catalog.",
  },
  examplePayload: updateProductExamplePayload,
  perform: async (
    context,
    {
      bigCommerceConnection,
      storeHash,
      productId,
      uniqueProductName,
      uniqueProductType,
      uniqueProductWeight,
      uniqueProductWidth,
      uniqueProductDepth,
      uniqueProductHeight,
      uniqueProductPrice,
      uniqueCostPrice,
      uniqueRetailPrice,
      uniqueSalePrice,
    },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );
    const endpoint = `/stores/${storeHash}/v3/catalog/products/${productId}`;
    const body = {
      name: uniqueProductName,
      type: uniqueProductType,
      weight: uniqueProductWeight,
      width: uniqueProductWidth,
      depth: uniqueProductDepth,
      height: uniqueProductHeight,
      price: uniqueProductPrice,
      cost_price: uniqueCostPrice,
      retail_price: uniqueRetailPrice,
      sale_price: uniqueSalePrice,
    };

    try {
      const response = await client.put(endpoint, body);
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
    productId,
    uniqueProductName,
    uniqueProductType,
    uniqueProductWeight,
    uniqueProductWidth,
    uniqueProductDepth,
    uniqueProductHeight,
    uniqueProductPrice,
    uniqueCostPrice,
    uniqueRetailPrice,
    uniqueSalePrice,
  },
});
