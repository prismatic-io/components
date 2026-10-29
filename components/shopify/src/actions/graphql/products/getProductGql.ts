import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { getProductExamplePayload } from "../../../examplePayloads";
import { getProductInputs as inputs } from "../../../inputsGql";
import { getProductGqlOutputSchema } from "../../../outputSchemas";
import type { Product } from "../../../types";
import { productMapper } from "../mappers/productMapper";
import getProductQuery from "../queries/products/GetProduct.gql";

export const getProductGql = action({
  display: {
    label: "Get Product",
    description: "Retrieves a product by ID.",
  },
  performSafety: "safe",
  perform: async (context, { productId, shopifyConnection }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );

    const { product }: { product: Product } = await client.request(
      getProductQuery,
      {
        id: productId,
      },
    );

    return {
      data: { product: productMapper(product) },
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getProductGqlOutputSchema,
  }),
  examplePayload: getProductExamplePayload.restMap,
});
