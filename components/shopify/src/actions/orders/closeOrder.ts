import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { closeOrderInputs } from "../../inputs";

export const closeOrder = action({
  display: {
    label: "Close Order (Deprecated)",
    description:
      "Closes a completed order. This version of the action is being deprecated. Please replace action with Close Order.",
  },
  perform: async (context, { orderId, shopifyConnection }) => {
    const client = getShopifyClient(shopifyConnection, undefined, context.debug.enabled);
    const { data } = await client.post(`/orders/${orderId}/close`);

    return {
      data,
    };
  },
  inputs: closeOrderInputs,
});
