import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { updatePaymentExamplePayload } from "../../examplePayloads";
import { updatePaymentInputs } from "../../inputs";

export const updatePayment = action({
  display: {
    label: "Update Payment",
    description: "Updates a payment with the APPROVED status.",
  },
  perform: async (context, { squareConnection, paymentId, payment }) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    const response = await client.put(`/v2/payments/${paymentId}`, payment);

    return {
      data: response.data,
    };
  },
  inputs: updatePaymentInputs,
  examplePayload: updatePaymentExamplePayload,
});
