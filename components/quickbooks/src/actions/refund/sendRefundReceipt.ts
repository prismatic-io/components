import { action } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import { connectionInput, receiptId } from "../../inputs";

export const sendRefundReceipt = action({
  display: {
    label: "Send Refund Receipt",
    description:
      "Send an existing Refund Receipt to the email saved in QuickBooks.",
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
  },
});
