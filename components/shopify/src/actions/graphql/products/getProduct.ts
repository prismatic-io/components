import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { getProductExamplePayload } from "../../../examplePayloads";
import { getProductInputs as inputs } from "../../../inputsGql";
import type { Product } from "../../interfaces/Product";
import { productMapper } from "../mappers/productMapper";
import getProductQuery from "../queries/products/GetProduct.gql";

export const getProductGql = action({
  display: {
    label: "Get Product",
    description: "Retrieves a product by ID.",
  },
  perform: async (context, { productId, shopifyConnection }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);

    const { product }: { product: Product } = await client.request(getProductQuery, {
      id: productId,
    });

    return {
      data: { product: productMapper(product) },
    };
  },
  inputs,
  examplePayload: getProductExamplePayload.restMap,
});
