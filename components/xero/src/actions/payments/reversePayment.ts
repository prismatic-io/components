import { action } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import { reversePaymentInputs } from "../../inputs";
import { reversePaymentExamplePayload } from "../../examplePayloads";

export const reversePayment = action({
  display: {
    label: "Reverse Payment",
    description: "Reverse a payment by ID.",
  },
  perform: async (context, params) => {
    const client = await getXeroClient(
      params.xeroConnection,
      context.debug.enabled,
    );
    const { data } = await client.post(`/payments/${params.paymentId}`, {
      Status: "DELETED",
    });
    return { data };
  },
  inputs: reversePaymentInputs,
  examplePayload: reversePaymentExamplePayload,
});
