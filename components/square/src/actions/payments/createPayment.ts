import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { createPaymentExamplePayload } from "../../examplePayloads";
import { createPaymentInputs } from "../../inputs";

export const createPayment = action({
  display: {
    label: "Create Payment",
    description: "Creates a payment using the provided source.",
  },
  perform: async (context, { squareConnection, paymentData }) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    const response = await client.post("/v2/payments", paymentData);

    return {
      data: response.data,
    };
  },
  inputs: createPaymentInputs,
  examplePayload: createPaymentExamplePayload,
});
