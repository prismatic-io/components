import { action } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import { connectionInput, invoiceId, syncToken } from "../../inputs";

export const voidInvoice = action({
  display: {
    label: "Void Invoice",
    description: "Void an Invoice.",
  },
  perform: async (context, { id, syncToken, quickbooksConnection }) => {
    const client = createHttpClient(
      quickbooksConnection,
      context.debug.enabled,
    );

    const { data } = await client.post(
      "/invoice",
      {
        Id: id,
        SyncToken: syncToken,
      },
      {
        params: {
          operation: "void",
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return {
      data: data.Invoice,
    };
  },
  inputs: {
    quickbooksConnection: connectionInput,
    id: { ...invoiceId, comments: "The id of the invoice to void." },
    syncToken,
  },
});
