import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createInvoicesExamplePayload } from "../../examplePayloads";
import { createInvoicesInputs } from "../../inputs";
export const createInvoices = action({
  display: {
    label: "Create Invoices",
    description: "Create adjustment invoice",
  },
  inputs: createInvoicesInputs,
  perform: async (
    context,
    {
      connection,
      adjustmentToId,
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
    },
  ) => {
    const client = createClient(
      connection,
      "accounting",
      context.debug.enabled,
    );
    const { data } = await client.post(`/invoices`, {
      adjustmentToId,
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
    });
    return {
      data,
    };
  },
  examplePayload: createInvoicesExamplePayload,
});
