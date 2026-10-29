import { action } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import { getPaymentInputs } from "../../inputs";
import { getPaymentExamplePayload } from "../../examplePayloads";

export const getPayment = action({
  display: {
    label: "Get Payment",
    description: "Retrieve the information and metadata of a payment by ID.",
  },
  perform: async (context, params) => {
    const client = await getXeroClient(
      params.xeroConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/payments/${params.paymentId}`);
    return { data };
  },
  inputs: getPaymentInputs,
  examplePayload: getPaymentExamplePayload,
});
