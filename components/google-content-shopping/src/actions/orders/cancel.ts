import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  merchantId,
  orderId,
  operationId,
  reason,
  reasonText,
} from "../../inputs";
import { cancelOrderExamplePayload } from "../../examplePayloads";

export const cancelOrder = action({
  display: {
    label: "Cancel Order (Deprecated)",
    description:
      "Cancels all line items in an order, making a full refund. " +
      "This action is deprecated as Google is retiring the Orders endpoints in the Content API.",
  },
  inputs: {
    connectionInput,
    merchantId,
    orderId,
    operationId,
    reason,
    reasonText,
  },
  perform: async (
    context,
    { connectionInput, orderId, merchantId, ...params },
  ) => {
    context.logger.warn(
      "'Cancel Order' is deprecated. Google is retiring the Orders endpoints in the Content API.",
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
