import { dataSource, util } from "@prismatic-io/spectral";
import listFulfillmentsQuery from "../actions/graphql/queries/fulfillments/ListFulfillmentsDataSource.gql";
import { getShopifyGraphQlClient } from "../client";
import { MAX_FULFILLMENTS_PER_ORDER, SHOPIFY_GID_PREFIX } from "../constants";
import { selectFulfillmentsExamplePayload } from "../examplePayloads/dataSources";
import { selectFulfillmentsInputs } from "../inputs";
import type { DataSourceRecord } from "../types";
import { getNumericId } from "../util";

export const selectFulfillments = dataSource({
  display: {
    label: "Select Fulfillment",
    description:
      "Selects a fulfillment from a list of fulfillments for the specified order.",
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
        orderId: `${SHOPIFY_GID_PREFIX}Order/${orderId}`,
        first: MAX_FULFILLMENTS_PER_ORDER,
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
  examplePayload: selectFulfillmentsExamplePayload,
});
