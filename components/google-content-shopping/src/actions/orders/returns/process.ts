import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import {
  connectionInput,
  merchantId,
  returnId,
  operationId,
  returnItems,
  fullChargeReturnShippingCost,
  refundShippingFee,
} from "../../../inputs";
import { processOrderReturnExamplePayload } from "../../../examplePayloads";

export const processOrderReturn = action({
  display: {
    label: "Process Order Return (Deprecated)",
    description:
      "Processes return in your Merchant Center account. " +
      "This action is deprecated as Google is retiring the Orders endpoints in the Content API.",
  },
  inputs: {
    connectionInput,
    merchantId,
    returnId,
    operationId,
    returnItems,
    fullChargeReturnShippingCost,
    refundShippingFee,
  },
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
      "'Process Order Return' is deprecated. Google is retiring the Orders endpoints in the Content API.",
    );

    const client = createClient(connectionInput);
    const { data } = await client.orderreturns.process({
      merchantId,
      returnId,
      requestBody: {
        operationId: operationId || undefined,
        returnItems: returnItems || undefined,
        fullChargeReturnShippingCost: fullChargeReturnShippingCost || undefined,
        refundShippingFee: refundShippingFee || undefined,
      },
    });
    return {
      data,
    };
  },
  examplePayload: processOrderReturnExamplePayload,
});
