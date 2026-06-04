import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { postPurchaseInvoiceExamplePayload } from "../../examplePayloads";
import { postPurchaseInvoiceInputs } from "../../inputs/purchaseInvoices";

export const postPurchaseInvoice = action({
  display: {
    label: "Post Purchase Invoice",
    description:
      "Posts a purchase invoice in your Business Central organization. This will finalize the invoice and create ledger entries.",
  },
  inputs: postPurchaseInvoiceInputs,
  perform: async (context, { purchaseInvoiceId, connection, companyId }) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);

    const { data } = await client.post(
      `/companies(${companyId})/purchaseInvoices(${purchaseInvoiceId})/Microsoft.NAV.post`,
      {},
    );

    return {
      data: data || { message: "Purchase invoice posted successfully" },
    };
  },
  examplePayload: postPurchaseInvoiceExamplePayload,
});
