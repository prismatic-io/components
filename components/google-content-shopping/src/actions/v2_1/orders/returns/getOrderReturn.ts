import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../../client";
import { getOrderReturnExamplePayload } from "../../../../examplePayloads/v2_1";
import { getOrderReturnInputs } from "../../../../inputs/v2_1";
export const getOrderReturn = action({
  display: {
    label: "Get Order Return (Legacy v2.1)",
    description: "Retrieves an order return from the Merchant Center account.",
  },
  inputs: getOrderReturnInputs,
  perform: async (context, { connectionInput, returnId, merchantId }) => {
    context.logger.warn(
      "'Get Order Return' is deprecated as Google is retiring the Orders endpoints in the Content API.",
    );
    const client = createClient(connectionInput);
    const { data } = await client.orderreturns.get({
      merchantId,
      returnId,
    });
    return {
      data,
    };
  },
  examplePayload: getOrderReturnExamplePayload,
});
