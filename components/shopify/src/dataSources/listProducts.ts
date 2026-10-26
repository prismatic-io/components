import { dataSource, util } from "@prismatic-io/spectral";
import listProductsQuery from "../actions/graphql/queries/products/ListProductsDataSource.gql";
import { getShopifyGraphQlClient } from "../client";
import { MAX_LIMIT } from "../constants";
import { selectProductsInputs } from "../inputs";
import type { DataSourceRecord } from "../types";
import { fetchData, getNumericId } from "../util";
export const listProducts = dataSource({
  display: {
    label: "Select Product",
    description: "Selects a product from a list of all products.",
  },
  perform: async (context, { shopifyConnection }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      false,
      context.logger,
    );
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
  inputs: selectProductsInputs,
  dataSourceType: "picklist",
});
