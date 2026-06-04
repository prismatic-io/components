import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  assignedToId,
  connection,
  exportId,
  invoicedOn,
  invoiceId,
  items,
  number,
  payments,
  reviewStatus,
  royaltyDate,
  royaltyMemo,
  royaltySentOn,
  royaltyStatus,
  subtotal,
  summary,
  tax,
  typeId,
} from "../../inputs";

export const updateInvoice = action({
  display: {
    label: "Update Invoice",
    description: "Update Invoice",
  },
  inputs: {
    connection,
    invoiceId,
    number,
    typeId: {
      ...typeId,
      required: false,
    },
    invoicedOn,
    subtotal,
    tax,
    summary,
    royaltyStatus,
    royaltyDate,
    royaltySentOn,
    royaltyMemo,
    exportId,
    reviewStatus,
    assignedToId,
    items,
    payments,
  },
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
      royaltyStatus,
      royaltyDate,
      royaltySentOn,
      royaltyMemo,
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
      royaltyStatus,
      royaltyDate,
      royaltySentOn,
      royaltyMemo,
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
  examplePayload: {
    data: {},
  },
});
