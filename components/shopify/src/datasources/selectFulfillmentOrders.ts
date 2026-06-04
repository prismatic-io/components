import { dataSource, util } from "@prismatic-io/spectral";
import listFulfillmentOrdersQuery from "../actions/graphql/queries/fulfillments/ListFulfillmentOrdersDataSource.gql";
import type { DataSourceRecord } from "../actions/interfaces/DataSourceRecord";
import { getShopifyGraphQlClient } from "../client";
import { MAX_LIMIT } from "../constants";
import { selectFulfillmentOrdersInputs as inputs } from "../inputsGql";
import { fetchData, getNumericId } from "../util";

export const selectFulfillmentOrders = dataSource({
  display: {
    label: "Select Fulfillment Orders",
    description: "A picklist of all fulfillment orders.",
  },
  perform: async (_context, { shopifyConnection, orderId }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, false);
    const { fulfillmentOrders } = await fetchData<DataSourceRecord>(
      client,
      ["order", "fulfillmentOrders"],
      "fulfillmentOrders",
      true,
      listFulfillmentOrdersQuery,
      {
        orderId,
        first: MAX_LIMIT,
      },
    );

    const result = fulfillmentOrders.map((order) => {
      const numericId = getNumericId(order.id);
      return {
        label: `${numericId}`,
        key: util.types.toString(numericId),
      };
    });
    return { result };
  },
  inputs,
  dataSourceType: "picklist",
});
