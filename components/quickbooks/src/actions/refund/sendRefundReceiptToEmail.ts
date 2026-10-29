import { action } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import { connectionInput, email, receiptId } from "../../inputs";

export const sendRefundReceiptToEmail = action({
  display: {
    label: "Send Refund Receipt to Email",
    description: "Send an existing Refund Receipt in QuickBooks to any email.",
  },
  perform: async (context, params) => {
    const client = createHttpClient(
      params.quickbooksConnection,
      context.debug.enabled,
    );
    const { data } = await client.post(
      `/refundreceipt/${params.receiptId}/send`,
      {},
      {
        params: { sendTo: params.email },
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return {
      data,
    };
  },
  inputs: {
    quickbooksConnection: connectionInput,
    receiptId,
    email,
  },
});
