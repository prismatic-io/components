import { dataSource, util } from "@prismatic-io/spectral";
import listOrdersQuery from "../actions/graphql/queries/orders/ListOrdersDataSource.gql";
import type { DataSourceRecord } from "../actions/interfaces/DataSourceRecord";
import { getShopifyGraphQlClient } from "../client";
import { MAX_LIMIT } from "../constants";
import { selectOrdersInputs as inputs } from "../inputsGql";
import { fetchData, getNumericId } from "../util";

export const selectOrders = dataSource({
  display: {
    label: "Select Orders",
    description: "A picklist of all orders.",
  },
  perform: async (_context, { shopifyConnection }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, false);

    const { orders } = await fetchData<DataSourceRecord>(
      client,
      ["orders"],
      "orders",
      true,
      listOrdersQuery,
      {
        first: MAX_LIMIT,
      },
    );

    const result = orders.map((order) => {
      const numericId = getNumericId(order.id);
      return {
        label: `${order.name} - ${numericId}`,
        key: util.types.toString(numericId),
      };
    });
    return { result };
  },
  inputs,
  dataSourceType: "picklist",
});
