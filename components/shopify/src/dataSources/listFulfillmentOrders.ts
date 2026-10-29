import { dataSource, util } from "@prismatic-io/spectral";
import listFulfillmentOrdersQuery from "../actions/graphql/queries/fulfillments/ListFulfillmentOrdersDataSource.gql";
import { getShopifyGraphQlClient } from "../client";
import { MAX_LIMIT } from "../constants";
import { selectFulfillmentOrdersInputs } from "../inputs";
import type { DataSourceRecord } from "../types";
import { fetchData, getNumericId } from "../util";

export const listFulfillmentOrders = dataSource({
  display: {
    label: "Select Fulfillment Order",
    description:
      "Selects a fulfillment order from a list of all fulfillment orders.",
  },
  perform: async (context, { shopifyConnection, orderId }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      false,
      context.logger,
    );
    const { fulfillmentOrders } = await fetchData<DataSourceRecord>(
      client,
      ["order", "fulfillmentOrders"],
      "fulfillmentOrders",
      true,
      listFulfillmentOrdersQuery,
      {
        orderId: `gid://shopify/Order/${orderId}`,
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
  inputs: selectFulfillmentOrdersInputs,
  dataSourceType: "picklist",
});
