import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { cancelOrderInputs } from "../../inputs";
import { cancelOrderExamplePayload } from "../../payloadExamples";

export const cancelOrder = action({
  display: {
    label: "Cancel Order (Deprecated)",
    description:
      "Cancel an existing order. This version of the action is being deprecated. Please replace action with Cancel Order.",
  },
  perform: async (context, { orderId, shopifyConnection }) => {
    const client = getShopifyClient(shopifyConnection, undefined, context.debug.enabled);
    const { data } = await client.post(`/orders/${orderId}/cancel`);

    return {
      data,
    };
  },
  inputs: cancelOrderInputs,
  examplePayload: {
    data: cancelOrderExamplePayload,
  },
});
