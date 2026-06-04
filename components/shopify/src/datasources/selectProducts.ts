import { dataSource, util } from "@prismatic-io/spectral";
import listProductsQuery from "../actions/graphql/queries/products/ListProductsDataSource.gql";
import type { DataSourceRecord } from "../actions/interfaces/DataSourceRecord";
import { getShopifyGraphQlClient } from "../client";
import { MAX_LIMIT } from "../constants";
import { selectProductsInputs as inputs } from "../inputsGql";
import { fetchData, getNumericId } from "../util";

export const selectProducts = dataSource({
  display: {
    label: "Select Products",
    description: "A picklist of all products.",
  },
  perform: async (_context, { shopifyConnection }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, false);
    const { products } = await fetchData<DataSourceRecord>(
      client,
      ["products"],
      "products",
      true,
      listProductsQuery,
      {
        first: MAX_LIMIT,
      },
    );

    const result = products.map((product) => {
      const numericId = getNumericId(product.id);
      return {
        label: `${product.title}`,
        key: util.types.toString(numericId),
      };
    });

    return { result };
  },
  inputs,
  dataSourceType: "picklist",
});
