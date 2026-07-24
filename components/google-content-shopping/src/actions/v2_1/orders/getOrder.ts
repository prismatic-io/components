import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { getOrderExamplePayload } from "../../../examplePayloads/v2_1";
import { getOrderInputs } from "../../../inputs/v2_1";
export const getOrder = action({
  display: {
    label: "Get Order (Legacy v2.1)",
    description: "Retrieves an order from the Merchant Center account.",
  },
  inputs: getOrderInputs,
  perform: async (context, { connectionInput, orderId, merchantId }) => {
    context.logger.warn(
      "'Get Order' is deprecated as Google is retiring the Orders endpoints in the Content API.",
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
