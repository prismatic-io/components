import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../../client";
import { createOrderReturnExamplePayload } from "../../../../examplePayloads/v2_1";
import { createOrderReturnInputs } from "../../../../inputs/v2_1";
export const createOrderReturn = action({
  display: {
    label: "Create Order Return (Legacy v2.1)",
    description: "Creates a return in the Merchant Center account.",
  },
  inputs: createOrderReturnInputs,
  perform: async (
    context,
    {
      connectionInput,
      merchantId,
      orderId,
      operationId,
      lineItems,
      returnMethodType,
    },
  ) => {
    context.logger.warn(
      "'Create Order Return' is deprecated as Google is retiring the Orders endpoints in the Content API.",
    );
    const client = createClient(connectionInput);
    const { data } = await client.orderreturns.createorderreturn({
      merchantId,
      requestBody: {
        orderId,
        operationId,
        lineItems,
        returnMethodType,
      },
    });
    return {
      data,
    };
  },
  examplePayload: createOrderReturnExamplePayload,
});
