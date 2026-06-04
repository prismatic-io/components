import { action } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import { connectionInput, receiptId, syncToken } from "../../inputs";

export const deleteRefundReceipt = action({
  display: {
    label: "Delete Refund Receipt",
    description: "Delete an existing Refund Receipt in QuickBooks.",
  },
  perform: async (context, params) => {
    const client = createHttpClient(
      params.quickbooksConnection,
      context.debug.enabled,
    );
    const body = {
      SyncToken: params.syncToken,
      Id: params.receiptId,
    };
    const { data } = await client.post("/refundreceipt", body, {
      params: { operation: "delete" },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return {
      data,
    };
  },
  inputs: {
    quickbooksConnection: connectionInput,
    syncToken,
    receiptId,
  },
});
