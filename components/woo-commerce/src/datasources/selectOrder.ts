import { dataSource, util } from "@prismatic-io/spectral";
import { getClient } from "../client";
import {
  after,
  before,
  connectionInput,
  resultsPerPage,
  search,
} from "../inputs";
import type { Order } from "../interfaces/Order";
import type { WooCommerceResponse } from "../interfaces/WooComerResponse";
import { paginateRecords } from "../util";

export const selectOrder = dataSource({
  display: {
    label: "Select Order",
    description: "Select an order from a list of WooCommerce orders.",
  },
  dataSourceType: "picklist",
  perform: async (
    context,
    { connection, resultsPerPage, search, before, after },
  ) => {
    const client = getClient(connection, false);
    const { data }: WooCommerceResponse<Order> = await paginateRecords(
      client,
      "/orders",
      {
        per_page: resultsPerPage,
        search,
        before,
        after,
      },
      true,
    );

    return {
      result: data.map(({ id, total, order_key }) => ({
        label: `${order_key} - ${total}`,
        key: util.types.toString(id),
      })),
    };
  },
  inputs: {
    connection: connectionInput,
    resultsPerPage,
    search,
    before,
    after,
  },
});
