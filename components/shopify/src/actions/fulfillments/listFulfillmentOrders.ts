import { action, outputSchema } from "@prismatic-io/spectral";
import { MAX_LIMIT } from "../../constants";
import { listFulfillmentOrdersExamplePayload } from "../../examplePayloads";
import { listFulfillmentOrdersInputs } from "../../inputs";
import { listFulfillmentOrdersOutputSchema } from "../../outputSchemas";
import { listFulfillmentOrdersGql } from "../graphql/fulfillments/listFulfillmentOrdersGql";
export const listFulfillmentOrders = action({
  display: {
    label: "List Fulfillment Orders",
    description: "Lists all fulfillment orders for a specific order.",
  },
  inputs: listFulfillmentOrdersInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listFulfillmentOrdersOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, params) => {
    const { data } = await listFulfillmentOrdersGql.perform(context, {
      shopifyConnection: params.shopifyConnection,
      orderId: `gid://shopify/Order/${params.orderId}`,
      pagination: {
        limit: MAX_LIMIT,
        endCursor: undefined,
      },
      getAlldata: true,
    });
    return { data };
  },
  examplePayload: listFulfillmentOrdersExamplePayload.restMap,
});
