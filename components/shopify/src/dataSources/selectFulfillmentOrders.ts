import { dataSource, util } from "@prismatic-io/spectral";
import listFulfillmentOrdersQuery from "../actions/graphql/queries/fulfillments/ListFulfillmentOrdersDataSource.gql";
import { getShopifyGraphQlClient } from "../client";
import { MAX_LIMIT, SHOPIFY_GID_PREFIX } from "../constants";
import { selectFulfillmentOrdersExamplePayload } from "../examplePayloads/dataSources";
import { selectFulfillmentOrdersInputs } from "../inputs";
import type { DataSourceRecord } from "../types";
import { fetchData, getNumericId } from "../util";

export const selectFulfillmentOrders = dataSource({
  display: {
    label: "Select Fulfillment Order",
    description:
      "Selects a fulfillment order from a list of fulfillment orders for the specified order.",
  },
  perform: async (context, { shopifyConnection, orderId }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, false, context.logger);
    const { fulfillmentOrders } = await fetchData<DataSourceRecord>(
      client,
      ["order", "fulfillmentOrders"],
      "fulfillmentOrders",
      true,
      listFulfillmentOrdersQuery,
      {
        orderId: `${SHOPIFY_GID_PREFIX}Order/${orderId}`,
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
  examplePayload: selectFulfillmentOrdersExamplePayload,
});
