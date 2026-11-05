import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { completePaymentExamplePayload } from "../../examplePayloads";
import { completePaymentInputs } from "../../inputs";

export const completePayment = action({
  display: {
    label: "Complete Payment",
    description: "Completes (captures) a payment.",
  },
  perform: async (context, { squareConnection, paymentId, versionToken }) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    const response = await client.post(`/v2/payments/${paymentId}/complete`, {
      version_token: versionToken,
    });

    return {
      data: response.data,
    };
  },
  inputs: completePaymentInputs,
  examplePayload: completePaymentExamplePayload,
});
