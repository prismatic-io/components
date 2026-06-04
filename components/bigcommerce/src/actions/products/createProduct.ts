import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { createProductExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  storeHash,
  uniqueCostPrice,
  uniqueProductDepth,
  uniqueProductDescription,
  uniqueProductHeight,
  uniqueProductName,
  uniqueProductPrice,
  uniqueProductSku,
  uniqueProductType,
  uniqueProductWeight,
  uniqueProductWidth,
  uniqueRetailPrice,
  uniqueSalePrice,
} from "../../inputs";

export const createProduct = action({
  display: {
    label: "Create Product",
    description: "Creates a new product in the store.",
  },
  examplePayload: createProductExamplePayload,
  perform: async (
    context,
    {
      bigCommerceConnection,
      storeHash,
      uniqueProductName,
      uniqueProductType,
      uniqueProductPrice,
      uniqueProductSku,
      uniqueProductDescription,
      uniqueProductWeight,
      uniqueProductWidth,
      uniqueProductDepth,
      uniqueProductHeight,
      uniqueCostPrice,
      uniqueRetailPrice,
      uniqueSalePrice,
    },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );
    const endpoint = `/stores/${storeHash}/v3/catalog/products`;

    const productData = {
      name: uniqueProductName,
      type: uniqueProductType,
      price: uniqueProductPrice,
      sku: uniqueProductSku,
      description: uniqueProductDescription,
      weight: uniqueProductWeight,
      width: uniqueProductWidth,
      depth: uniqueProductDepth,
      height: uniqueProductHeight,
      cost_price: uniqueCostPrice,
      retail_price: uniqueRetailPrice,
      sale_price: uniqueSalePrice,
    };

    try {
      const response = await client.post(endpoint, productData);
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
    uniqueProductName,
    uniqueProductType,
    uniqueProductPrice,
    uniqueProductSku,
    uniqueProductDescription,
    uniqueProductWeight,
    uniqueProductWidth,
    uniqueProductDepth,
    uniqueProductHeight,
    uniqueCostPrice,
    uniqueRetailPrice,
    uniqueSalePrice,
  },
});
