import { action } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import { paymentId, connectionInput } from "../../inputs";
import { getPaymentHistoryExamplePayload } from "../../examplePayloads";

export const getPaymentHistory = action({
  display: {
    label: "Get Payment History",
    description:
      "Get the information and metadata of a payment's history by Id",
  },
  perform: async (context, params) => {
    const client = await getXeroClient(
      params.xeroConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/payments/${params.paymentId}/history`);
    return { data };
  },
  inputs: { paymentId, xeroConnection: connectionInput },
  examplePayload: getPaymentHistoryExamplePayload,
});
