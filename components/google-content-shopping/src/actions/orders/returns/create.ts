import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import {
  connectionInput,
  merchantId,
  orderId,
  operationId,
  lineItems,
  returnMethodType,
} from "../../../inputs";
import { createOrderReturnExamplePayload } from "../../../examplePayloads";

export const createOrderReturn = action({
  display: {
    label: "Create Order Return (Deprecated)",
    description:
      "Create return in your Merchant Center account. " +
      "This action is deprecated as Google is retiring the Orders endpoints in the Content API.",
  },
  inputs: {
    connectionInput,
    merchantId,
    orderId,
    operationId,
    lineItems,
    returnMethodType,
  },
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
      "'Create Order Return' is deprecated. Google is retiring the Orders endpoints in the Content API.",
    );

    const client = createClient(connectionInput);
    const { data } = await client.orderreturns.createorderreturn({
      merchantId,
      requestBody: {
        orderId: orderId || undefined,
        operationId: operationId || undefined,
        lineItems: lineItems || undefined,
        returnMethodType: returnMethodType || undefined,
      },
    });
    return {
      data,
    };
  },
  examplePayload: createOrderReturnExamplePayload,
});
