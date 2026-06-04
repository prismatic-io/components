import { action, util } from "@prismatic-io/spectral";
import { getSageClient } from "../client";
import {
  connection,
  contactId,
  contactName,
  currencyId,
  date,
  dueDate,
  invoiceLines,
  itemsPerPage,
  netAmount,
  notes,
  page,
  purchaseInvoiceId,
  taxAmount,
  totalAmount,
  totalQuantity,
  updated_or_created_since,
} from "../inputs";

export const listPurchaseInvoice = action({
  display: {
    label: "List Purchase Invoices",
    description: "List all purchase invoices",
  },
  perform: async (context, params) => {
    const client = getSageClient(params.connection, context.debug.enabled);

    const { data } = await client.get("/purchase_invoices", {
      params: {
        items_per_page: util.types.toInt(params.itemsPerPage) || undefined,
        page: util.types.toInt(params.page) || undefined,
        updated_or_created_since: util.types.toString(params.updated_or_created_since) || undefined,
      },
    });

    return {
      data,
    };
  },
  inputs: { connection, itemsPerPage, page, updated_or_created_since },
});

export const getPurchaseInvoice = action({
  display: {
    label: "Get Purchase Invoice",
    description: "Get the information and metadata of a purchase invoice by Id",
  },
  perform: async (context, params) => {
    const client = getSageClient(params.connection, context.debug.enabled);

    const { data } = await client.get(`/purchase_invoices/${params.purchaseInvoiceId}`);

    return {
      data,
    };
  },
  inputs: { connection, purchaseInvoiceId },
});

export const deletePurchaseInvoice = action({
  display: {
    label: "Delete Purchase Invoice",
    description: "Delete the information and metadata of a purchase invoice by Id",
  },
  perform: async (context, params) => {
    const client = getSageClient(params.connection, context.debug.enabled);

    const { data } = await client.delete(`/purchase_invoices/${params.purchaseInvoiceId}`);

    return {
      data,
    };
  },
  inputs: { connection, purchaseInvoiceId },
});

export const updatePurchaseInvoice = action({
  display: {
    label: "Update Purchase Invoice",
    description: "Update the information and metadata of a purchase invoice by Id",
  },
  perform: async (context, params) => {
    const client = getSageClient(params.connection, context.debug.enabled);

    const { data } = await client.put(`/purchase_invoices/${params.purchaseInvoiceId}`, {
      purchase_invoice: {
        contact_id: util.types.toString(params.contactId) || undefined,
        date: util.types.toString(params.date) || undefined,
        due_date: util.types.toString(params.dueDate) || undefined,
        contact_name: util.types.toString(params.contactName) || undefined,
        notes: util.types.toString(params.notes) || undefined,
        total_quantity: util.types.toNumber(params.totalQuantity) || undefined,
        net_amount: util.types.toNumber(params.totalAmount) || undefined,
        tax_amount: util.types.toNumber(params.taxAmount) || undefined,
        total_amount: util.types.toNumber(params.totalAmount) || undefined,
        currency_id: util.types.toString(params.currencyId) || undefined,
        invoiceLines: params.invoiceLines || [],
      },
    });

    return {
      data,
    };
  },
  inputs: {
    connection,
    purchaseInvoiceId,
    contactId: { ...contactId, required: false },
    date: { ...date, required: false },
    dueDate,
    contactName,
    notes,
    totalQuantity,
    netAmount,
    taxAmount,
    currencyId,
    totalAmount,
    invoiceLines,
  },
});

export const createPurchaseInvoice = action({
  display: {
    label: "Create Purchase Invoice",
    description: "Create a new purchase invoice",
  },
  perform: async (context, params) => {
    const client = getSageClient(params.connection, context.debug.enabled);

    const { data } = await client.post(`/purchase_invoices`, {
      purchase_invoice: {
        contact_id: util.types.toString(params.contactId),
        date: util.types.toString(params.date),
        due_date: util.types.toString(params.dueDate),
        invoice_lines: JSON.parse(util.types.toString(params.invoiceLines)) || [],
        total_amount: util.types.toNumber(params.totalAmount),
      },
    });

    return {
      data,
    };
  },
  inputs: { connection, contactId, date, invoiceLines, totalAmount, dueDate },
});
