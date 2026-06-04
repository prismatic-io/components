import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { getOrderInputs } from "../../inputs";
import { orderExamplePayload } from "../../payloadExamples";

export const getOrder = action({
  display: {
    label: "Get Order (Deprecated)",
    description:
      "Get the information and metadata about an order. This version of the action is being deprecated. Please replace action with Get Order.",
  },
  perform: async (context, { orderId, shopifyConnection }) => {
    const client = getShopifyClient(shopifyConnection, undefined, context.debug.enabled);
    const { data } = await client.get(`/orders/${orderId}`);
    return {
      data,
    };
  },
  inputs: getOrderInputs,
  examplePayload: {
    data: { order: orderExamplePayload.order.orders[0] },
  },
});
