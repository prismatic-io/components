import { action } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import { connectionInput, receiptId } from "../../inputs";

export const getRefundReceiptAsPDF = action({
  display: {
    label: "Get Refund Receipt as PDF",
    description:
      "Retrieve an existing Refund Receipt from QuickBooks as a PDF.",
  },
  perform: async (context, params) => {
    const client = createHttpClient(
      params.quickbooksConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/refundreceipt/${params.receiptId}/pdf`);
    return {
      data,
    };
  },
  inputs: {
    quickbooksConnection: connectionInput,
    receiptId,
  },
});
