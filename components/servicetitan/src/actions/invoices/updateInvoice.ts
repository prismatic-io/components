import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateInvoiceExamplePayload } from "../../examplePayloads";
import { updateInvoiceInputs } from "../../inputs";
export const updateInvoice = action({
  display: {
    label: "Update Invoice",
    description: "Update Invoice",
  },
  inputs: updateInvoiceInputs,
  perform: async (
    context,
    {
      connection,
      invoiceId,
      number,
      typeId,
      invoicedOn,
      subtotal,
      tax,
      summary,
      royaltyDetails,
      exportId,
      reviewStatus,
      assignedToId,
      items,
      payments,
    },
  ) => {
    const client = createClient(
      connection,
      "accounting",
      context.debug.enabled,
    );
    const { data } = await client.patch(`/invoices/${invoiceId}`, {
      number,
      typeId,
      invoicedOn,
      subtotal,
      tax,
      summary,
      royaltyStatus: royaltyDetails.royaltyStatus,
      royaltyDate: royaltyDetails.royaltyDate,
      royaltySentOn: royaltyDetails.royaltySentOn,
      royaltyMemo: royaltyDetails.royaltyMemo,
      exportId,
      reviewStatus,
      assignedToId,
      items,
      payments,
    });
    return {
      data,
    };
  },
  examplePayload: updateInvoiceExamplePayload,
});
