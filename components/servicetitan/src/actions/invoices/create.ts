import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  adjustmentToId,
  assignedToId,
  connection,
  exportId,
  invoicedOn,
  items,
  number,
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

export const createInvoices = action({
  display: {
    label: "Create Invoices",
    description: "Create adjustment invoice",
  },
  inputs: {
    connection,
    adjustmentToId,
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
  },
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
      royaltyStatus,
      royaltyDate,
      royaltySentOn,
      royaltyMemo,
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
      royaltyStatus,
      royaltyDate,
      royaltySentOn,
      royaltyMemo,
      exportId,
      reviewStatus,
      assignedToId,
      items,
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: {},
  },
});
