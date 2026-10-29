import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getOrderAddressExamplePayload } from "../../examplePayloads/orders";
import { connectionInput, orderId } from "../../inputs";

export const getOrderAddress = action({
  display: {
    label: "Get Order Address",
    description: "Returns the shipping address for the order that you specify.",
  },
  examplePayload: getOrderAddressExamplePayload,
  inputs: {
    connectionInput,
    orderId,
  },
  perform: async (context, { connectionInput, orderId }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get(`/orders/v0/orders/${orderId}/address`);
    return {
      data,
    };
  },
});
