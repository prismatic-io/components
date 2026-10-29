import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getOrderBuyerInfoExamplePayload } from "../../examplePayloads/orders";
import { connectionInput, orderId } from "../../inputs";

export const getOrderBuyerInfo = action({
  display: {
    label: "Get Order Buyer Info",
    description: "Returns buyer information for the order that you specify.",
  },
  examplePayload: getOrderBuyerInfoExamplePayload,
  inputs: {
    connectionInput,
    orderId,
  },
  perform: async (context, { connectionInput, orderId }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get(`/orders/v0/orders/${orderId}/buyerInfo`);
    return {
      data,
    };
  },
});
