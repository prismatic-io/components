import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getOrderItemsBuyerInfoExamplePayload } from "../../examplePayloads/orders";
import { connectionInput, orderId } from "../../inputs";

export const getOrderItemsBuyerInfo = action({
  display: {
    label: "Get Order Items Buyer Info",
    description:
      "Returns buyer information for the order items in the order that you specify.",
  },
  examplePayload: getOrderItemsBuyerInfoExamplePayload,
  inputs: {
    connectionInput,
    orderId,
  },
  perform: async (context, { connectionInput, orderId }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get(
      `/orders/v0/orders/${orderId}/orderItems/buyerInfo`,
    );
    return {
      data,
    };
  },
});
