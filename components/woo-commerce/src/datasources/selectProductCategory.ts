
import { dataSource, util } from "@prismatic-io/spectral";
import { getClient } from "../client";
import {
  after,
  before,
  connectionInput,
  resultsPerPage,
  search,
} from "../inputs";
import type { ProductCategory } from "../interfaces/ProductCategory";
import type { WooCommerceResponse } from "../interfaces/WooComerResponse";
import { paginateRecords } from "../util";

export const selectProductCategory = dataSource({
  display: {
    label: "Select Product Category",
    description:
      "Select a product category from a list of WooCommerce product categories.",
  },
  dataSourceType: "picklist",
  inputs: {
    connection: connectionInput,
    resultsPerPage,
    search,
    before,
    after,
  },
  perform: async (
    context,
    { connection, resultsPerPage, search, before, after },
  ) => {
    const client = getClient(connection, false);
    const { data }: WooCommerceResponse<ProductCategory> =
      await paginateRecords(
        client,
        "/products/categories",
        {
          per_page: resultsPerPage,
          search,
          before,
          after,
        },
        true,
      );

    return {
      result: data.map(({ id, name }) => ({
        label: name,
        key: util.types.toString(id),
      })),
    };
  },
});
