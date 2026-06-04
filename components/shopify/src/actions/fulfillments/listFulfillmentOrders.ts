import { action } from "@prismatic-io/spectral";
import { MAX_LIMIT } from "../../constants";
import { listFulfillmentOrdersExamplePayload } from "../../examplePayloads";
import { listFulfillmentOrdersInputs } from "../../inputs";
import { listFulfillmentOrdersGql } from "../graphql/fulfillments/listFulfillmentOrders";

export const listFulfillmentOrders = action({
  display: {
    label: "List Fulfillment Orders",
    description: "Lists all fulfillment orders for a specific order.",
  },
  inputs: listFulfillmentOrdersInputs,
  perform: async (context, params) => {
    const { data } = await listFulfillmentOrdersGql.perform(context, {
      shopifyConnection: params.shopifyConnection,
      orderId: `gid://shopify/Order/${params.orderId}`,
      limit: MAX_LIMIT,
      getAlldata: true,
      endCursor: undefined,
    });
    return { data };
  },
  examplePayload: listFulfillmentOrdersExamplePayload.restMap,
});
