import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { cancelPaymentExamplePayload } from "../../examplePayloads";
import { cancelPaymentInputs } from "../../inputs";

export const cancelPayment = action({
  display: {
    label: "Cancel Payment",
    description: "Cancels (voids) a payment.",
  },
  perform: async (context, { squareConnection, paymentId }) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    const response = await client.post(`/v2/payments/${paymentId}/cancel`);

    return {
      data: response.data,
    };
  },
  inputs: cancelPaymentInputs,
  examplePayload: cancelPaymentExamplePayload,
});
