import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { MAX_LIMIT } from "../../../constants";
import { listProductsExamplePayload } from "../../../examplePayloads";
import { listProducstInputs as inputs } from "../../../inputsGql";
import { fetchData } from "../../../util";
import type { PageInfo } from "../../interfaces/PageInfo";
import type { Product } from "../../interfaces/Product";
import { paginationMapper } from "../mappers/paginationMapper";
import { productMapper } from "../mappers/productMapper";
import listProductsQuery from "../queries/products/ListProducts.gql";

export const listProductsGql = action({
  display: {
    label: "List Products",
    description: "Lists all products.",
  },
  perform: async (context, { shopifyConnection, limit, getAlldata, endCursor }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);

    const data = (await fetchData<Product>(
      client,
      ["products"],
      "products",
      getAlldata,
      listProductsQuery,
      {
        first: getAlldata ? MAX_LIMIT : limit,
        cursor: getAlldata ? undefined : endCursor,
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
  examplePayload: listProductsExamplePayload.restMap,
});
