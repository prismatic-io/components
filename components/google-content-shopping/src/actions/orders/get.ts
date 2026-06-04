import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, merchantId, orderId } from "../../inputs";
import { getOrderExamplePayload } from "../../examplePayloads";

export const getOrder = action({
  display: {
    label: "Get Order (Deprecated)",
    description:
      "Retrieves an order from your Merchant Center account. " +
      "This action is deprecated as Google is retiring the Orders endpoints in the Content API.",
  },
  inputs: {
    connectionInput,
    merchantId,
    orderId,
  },
  perform: async (context, { connectionInput, orderId, merchantId }) => {
    context.logger.warn(
      "'Get Order' is deprecated. Google is retiring the Orders endpoints in the Content API.",
    );

    const client = createClient(connectionInput);
    const { data } = await client.orders.get({
      merchantId,
      orderId,
    });
    return {
      data,
    };
  },
  examplePayload: getOrderExamplePayload,
});
