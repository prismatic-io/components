import { action } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import { connectionInput, receiptId } from "../../inputs";

export const getRefundReceipt = action({
  display: {
    label: "Get Refund Receipt",
    description: "Retrieve an existing Refund Receipt from QuickBooks.",
  },
  perform: async (context, params) => {
    const client = createHttpClient(
      params.quickbooksConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/refundreceipt/${params.receiptId}`);
    return {
      data,
    };
  },
  inputs: {
    quickbooksConnection: connectionInput,
    receiptId,
  },
});
