import { dataSource, util } from "@prismatic-io/spectral";
import listFulfillmentsQuery from "../actions/graphql/queries/fulfillments/ListFulfillmentsDataSource.gql";
import { getShopifyGraphQlClient } from "../client";
import { selectFulfillmentsInputs } from "../inputs";
import type { DataSourceRecord } from "../types";
import { getNumericId } from "../util";

export const listFulfillments = dataSource({
  display: {
    label: "Select Fulfillment",
    description: "Selects a fulfillment from a list of all fulfillments.",
  },
  perform: async (context, { shopifyConnection, orderId }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      false,
      context.logger,
    );
    const data: { order: { fulfillments: DataSourceRecord[] } } =
      await client.request(listFulfillmentsQuery, {
        orderId: `gid://shopify/Order/${orderId}`,
        first: 10000,
      });
    const result = data.order.fulfillments.map((fulfillment) => {
      const numericId = getNumericId(fulfillment.id);
      return {
        label: `${fulfillment.name} - ${numericId}`,
        key: util.types.toString(numericId),
      };
    });

    return { result };
  },
  inputs: selectFulfillmentsInputs,
  dataSourceType: "picklist",
});
