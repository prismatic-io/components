import { dataSource, util } from "@prismatic-io/spectral";
import listOrdersQuery from "../actions/graphql/queries/orders/ListOrdersDataSource.gql";
import { getShopifyGraphQlClient } from "../client";
import { MAX_LIMIT } from "../constants";
import { selectOrdersInputs } from "../inputs";
import type { DataSourceRecord } from "../types";
import { fetchData, getNumericId } from "../util";

export const listOrders = dataSource({
  display: {
    label: "Select Order",
    description: "Selects an order from a list of all orders.",
  },
  perform: async (context, { shopifyConnection }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      false,
      context.logger,
    );

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
  inputs: selectOrdersInputs,
  dataSourceType: "picklist",
});
