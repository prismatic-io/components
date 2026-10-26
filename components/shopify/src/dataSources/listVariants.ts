import { dataSource, type Element, util } from "@prismatic-io/spectral";
import listVariantsDataSourceQuery from "../actions/graphql/queries/variants/ListVariantsDataSource.gql";
import { getShopifyGraphQlClient } from "../client";
import { MAX_LIMIT } from "../constants";
import { selectVariantsInputs } from "../inputs";
import type { DataSourceRecord } from "../types";
import { fetchData, getNumericId } from "../util";
export const listVariants = dataSource({
  display: {
    label: "Select Variant",
    description:
      "Selects a product variant from a list of variants for the specified product.",
  },
  inputs: selectVariantsInputs,
  perform: async (context, { shopifyConnection, productId }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      false,
      context.logger,
    );
    const numericProductId = productId.startsWith("gid://")
      ? getNumericId(productId)
      : productId;
    const { productVariants } = (await fetchData<
      DataSourceRecord & {
        displayName?: string;
      }
    >(
      client,
      ["productVariants"],
      "productVariants",
      true,
      listVariantsDataSourceQuery,
      {
        query: `product_id:${numericProductId}`,
        first: MAX_LIMIT,
      },
    )) as unknown as Record<
      "productVariants",
      (DataSourceRecord & {
        displayName?: string;
      })[]
    >;
    const result = productVariants
      .map<Element>((variant) => {
        const numericId = getNumericId(variant.id);
        return {
          label: variant.displayName || variant.title || variant.id,
          key: util.types.toString(numericId),
        };
      })
      .sort((a, b) => (a.label < b.label ? -1 : 1));
    return { result };
  },
  dataSourceType: "picklist",
});
