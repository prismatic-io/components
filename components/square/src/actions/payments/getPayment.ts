import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { getPaymentExamplePayload } from "../../examplePayloads";
import { getPaymentInputs } from "../../inputs";

export const getPayment = action({
  display: {
    label: "Get Payment",
    description: "Retrieves details for a specific payment.",
  },
  perform: async (context, { squareConnection, paymentId }) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    const response = await client.get(`/v2/payments/${paymentId}`);

    return {
      data: response.data,
    };
  },
  inputs: getPaymentInputs,
  examplePayload: getPaymentExamplePayload,
});
