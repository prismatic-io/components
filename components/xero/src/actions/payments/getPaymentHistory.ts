import { action } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import { getPaymentHistoryInputs } from "../../inputs";
import { getPaymentHistoryExamplePayload } from "../../examplePayloads";

export const getPaymentHistory = action({
  display: {
    label: "Get Payment History",
    description:
      "Retrieve the information and metadata of a payment's history by ID.",
  },
  perform: async (context, params) => {
    const client = await getXeroClient(
      params.xeroConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/payments/${params.paymentId}/history`);
    return { data };
  },
  inputs: getPaymentHistoryInputs,
  examplePayload: getPaymentHistoryExamplePayload,
});
