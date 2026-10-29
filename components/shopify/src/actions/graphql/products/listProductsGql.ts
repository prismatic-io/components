import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { MAX_LIMIT } from "../../../constants";
import { listProductsExamplePayload } from "../../../examplePayloads";
import { listProducstInputs as inputs } from "../../../inputsGql";
import { listProductsGqlOutputSchema } from "../../../outputSchemas";
import type { PageInfo, Product } from "../../../types";
import { fetchData } from "../../../util";
import { paginationMapper } from "../mappers/paginationMapper";
import { productMapper } from "../mappers/productMapper";
import listProductsQuery from "../queries/products/ListProducts.gql";

export const listProductsGql = action({
  display: {
    label: "List Products",
    description: "Lists all products.",
  },
  perform: async (
    context,
    { shopifyConnection, getAlldata, pagination = {} },
  ) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );

    const data = (await fetchData<Product>(
      client,
      ["products"],
      "products",
      getAlldata,
      listProductsQuery,
      {
        first: getAlldata ? MAX_LIMIT : pagination.limit,
        cursor: getAlldata ? undefined : pagination.endCursor,
      },
    )) as Record<"products", Product[]> & { pageInfo: PageInfo };

    return {
      data: {
        data: {
          products: data.products.map(productMapper),
        },
        ...paginationMapper(data.pageInfo),
      },
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listProductsGqlOutputSchema,
  }),
  examplePayload: listProductsExamplePayload.restMap,
});
