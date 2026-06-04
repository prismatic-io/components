import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { refundPaymentExamplePayload } from "../../examplePayloads";
import { refundPaymentInputs } from "../../inputs";

export const refundPayment = action({
  display: {
    label: "Refund Payment",
    description: "Refunds a payment. You can refund the entire payment amount or a portion of it.",
  },
  perform: async (
    context,
    { squareConnection, paymentId, idempotencyKey, refundAmount, reason },
  ) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);
    const body = {
      idempotency_key: idempotencyKey,
      payment_id: paymentId,
      amount_money: refundAmount,
      reason: reason,
    };

    const response = await client.post("/v2/refunds", body);

    return {
      data: response.data,
    };
  },
  inputs: refundPaymentInputs,
  examplePayload: refundPaymentExamplePayload,
});
