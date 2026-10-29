import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getOrderItemsExamplePayload } from "../../examplePayloads/orders";
import { connectionInput, NextToken, orderId } from "../../inputs";

export const getOrderItems = action({
  display: {
    label: "Get Order Items",
    description:
      "Returns detailed order item information for the order that you specify.",
  },
  examplePayload: getOrderItemsExamplePayload,
  inputs: {
    connectionInput,
    orderId,
    NextToken,
  },
  perform: async (context, { connectionInput, orderId, NextToken }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get(
      `/orders/v0/orders/${orderId}/orderItems`,
      {
        params: {
          NextToken: NextToken || undefined,
        },
      },
    );
    return {
      data,
    };
  },
});
