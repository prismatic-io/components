import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getOrderExamplePayload } from "../../examplePayloads/orders";
import { connectionInput, orderId } from "../../inputs";

export const getOrder = action({
  display: {
    label: "Get Order",
    description: "Returns the order that you specify.",
  },
  examplePayload: getOrderExamplePayload,
  inputs: {
    connectionInput,
    orderId,
  },
  perform: async (context, { connectionInput, orderId }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get(`/orders/v0/orders/${orderId}`);
    return {
      data,
    };
  },
});
