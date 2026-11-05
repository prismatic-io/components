import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { getPaymentRefundExamplePayload } from "../../examplePayloads";
import { getPaymentRefundInputs } from "../../inputs";

export const getPaymentRefund = action({
  display: {
    label: "Get Payment Refund",
    description: "Retrieves a specific refund using the refund_id.",
  },
  perform: async (context, { squareConnection, refundId }) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    const response = await client.get(`/v2/refunds/${refundId}`);

    return {
      data: response.data,
    };
  },
  inputs: getPaymentRefundInputs,
  examplePayload: getPaymentRefundExamplePayload,
});
