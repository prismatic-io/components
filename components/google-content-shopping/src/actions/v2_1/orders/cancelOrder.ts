import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { cancelOrderExamplePayload } from "../../../examplePayloads/v2_1";
import { cancelOrderInputs } from "../../../inputs/v2_1";
export const cancelOrder = action({
  display: {
    label: "Cancel Order (Legacy v2.1)",
    description: "Cancels all line items in an order, making a full refund.",
  },
  inputs: cancelOrderInputs,
  perform: async (
    context,
    { connectionInput, orderId, merchantId, ...params },
  ) => {
    context.logger.warn(
      "'Cancel Order' is deprecated as Google is retiring the Orders endpoints in the Content API.",
    );
    const client = createClient(connectionInput);
    const { data } = await client.orders.cancel({
      orderId,
      merchantId,
      requestBody: {
        ...params,
      },
    });
    return {
      data,
    };
  },
  examplePayload: cancelOrderExamplePayload,
});
