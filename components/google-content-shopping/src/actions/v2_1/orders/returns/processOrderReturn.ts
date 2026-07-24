import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../../client";
import { processOrderReturnExamplePayload } from "../../../../examplePayloads/v2_1";
import { processOrderReturnInputs } from "../../../../inputs/v2_1";
export const processOrderReturn = action({
  display: {
    label: "Process Order Return (Legacy v2.1)",
    description: "Processes a return in the Merchant Center account.",
  },
  inputs: processOrderReturnInputs,
  perform: async (
    context,
    {
      connectionInput,
      merchantId,
      returnId,
      operationId,
      returnItems,
      fullChargeReturnShippingCost,
      refundShippingFee,
    },
  ) => {
    context.logger.warn(
      "'Process Order Return' is deprecated as Google is retiring the Orders endpoints in the Content API.",
    );
    const client = createClient(connectionInput);
    const { data } = await client.orderreturns.process({
      merchantId,
      returnId,
      requestBody: {
        operationId,
        returnItems,
        fullChargeReturnShippingCost: fullChargeReturnShippingCost || undefined,
        refundShippingFee,
      },
    });
    return {
      data,
    };
  },
  examplePayload: processOrderReturnExamplePayload,
});
