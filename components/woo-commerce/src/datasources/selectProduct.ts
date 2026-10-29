import { dataSource, util } from "@prismatic-io/spectral";
import { getClient } from "../client";
import {
  after,
  before,
  connectionInput,
  resultsPerPage,
  search,
} from "../inputs";
import type { Product } from "../interfaces/Product";
import type { WooCommerceResponse } from "../interfaces/WooComerResponse";
import { paginateRecords } from "../util";

export const selectProduct = dataSource({
  display: {
    label: "Select Product",
    description: "Select a product from a list of WooCommerce products.",
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
    const { data }: WooCommerceResponse<Product> = await paginateRecords(
      client,
      "/products",
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
