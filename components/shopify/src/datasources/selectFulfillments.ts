import { dataSource, util } from "@prismatic-io/spectral";
import listFulfillmentsQuery from "../actions/graphql/queries/fulfillments/ListFulfillmentsDataSource.gql";
import type { DataSourceRecord } from "../actions/interfaces/DataSourceRecord";
import { getShopifyGraphQlClient } from "../client";
import { selectFulfillmentsInputs as inputs } from "../inputsGql";
import { getNumericId } from "../util";

export const selectFulfillments = dataSource({
  display: {
    label: "Select Fulfillments",
    description: "A picklist of all fulfillments.",
  },
  perform: async (_context, { shopifyConnection, orderId }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, false);
    
    const data: { order: { fulfillments: DataSourceRecord[] } } = await client.request(
      listFulfillmentsQuery,
      {
        orderId,
        first: 10000,
      },
    );
    const result = data.order.fulfillments.map((fulfillment) => {
      const numericId = getNumericId(fulfillment.id);
      return {
        label: `${fulfillment.name} - ${numericId}`,
        key: util.types.toString(numericId),
      };
    });

    return { result };
  },
  inputs,
  dataSourceType: "picklist",
});
