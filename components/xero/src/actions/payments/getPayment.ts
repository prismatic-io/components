import { action } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import { paymentId, connectionInput } from "../../inputs";
import { getPaymentExamplePayload } from "../../examplePayloads";

export const getPayment = action({
  display: {
    label: "Get Payment",
    description: "Get the information and metadata of a payment by id",
  },
  perform: async (context, params) => {
    const client = await getXeroClient(
      params.xeroConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/payments/${params.paymentId}`);
    return { data };
  },
  inputs: { paymentId, xeroConnection: connectionInput },
  examplePayload: getPaymentExamplePayload,
});
