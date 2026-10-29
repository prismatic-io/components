import querystring from "node:querystring";
import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { getAllProductsExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  productBrandId,
  productId,
  productLimit,
  productName,
  productPage,
  productPrice,
  productType,
  storeHash,
} from "../../inputs";

export const getAllProducts = action({
  display: {
    label: "List Products",
    description: "Returns a list of products with optional filter parameters.",
  },
  examplePayload: getAllProductsExamplePayload,
  perform: async (
    context,
    {
      bigCommerceConnection,
      storeHash,
      productId,
      productName,
      productPrice,
      productBrandId,
      productType,
      productPage,
      productLimit,
    },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );
    const endpoint = `/stores/${storeHash}/v3/catalog/products`;

    const queryParamsObj: Record<string, unknown> = {};

    if (productId) queryParamsObj.id = productId;
    if (productName) queryParamsObj.name = productName;
    if (productPrice) queryParamsObj.price = productPrice;
    if (productBrandId) queryParamsObj.brand_id = productBrandId;
    if (productType) queryParamsObj.type = productType;
    if (productPage) queryParamsObj.page = productPage;
    if (productLimit) queryParamsObj.limit = productLimit;

    const queryParams = querystring.stringify(
      queryParamsObj as Record<string, string>,
    );

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
    productId,
    productName,
    productPrice,
    productBrandId,
    productType,
    productPage,
    productLimit,
  },
});
