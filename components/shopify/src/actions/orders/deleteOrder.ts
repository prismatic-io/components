import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { deleteOrderInputs } from "../../inputs";

export const deleteOrder = action({
  display: {
    label: "Delete Order (Deprecated)",
    description:
      "Delete an existing order by Id. This version of the action is being deprecated. Please replace action with Delete Order.",
  },
  perform: async (context, { orderId, shopifyConnection }) => {
    const client = getShopifyClient(shopifyConnection, undefined, context.debug.enabled);
    const { data } = await client.delete(`/orders/${orderId}`);
    return {
      data,
    };
  },
  inputs: deleteOrderInputs,
  examplePayload: {
    data: {},
  },
});
