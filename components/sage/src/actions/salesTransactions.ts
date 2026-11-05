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
  salesInvoiceId,
  taxAmount,
  totalAmount,
  totalQuantity,
  updated_or_created_since,
} from "../inputs";

export const listSalesInvoices = action({
  display: {
    label: "List Sales Invoices",
    description: "List all sales invoices",
  },
  perform: async (context, params) => {
    const client = getSageClient(params.connection, context.debug.enabled);

    const { data } = await client.get("/sales_invoices", {
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

export const getSalesInvoice = action({
  display: {
    label: "Get Sales Invoice",
    description: "Get the information and metadata of a sales invoice by Id",
  },
  perform: async (context, params) => {
    const client = getSageClient(params.connection, context.debug.enabled);

    const { data } = await client.get(`/sales_invoices/${params.salesInvoiceId}`);

    return {
      data,
    };
  },
  inputs: { connection, salesInvoiceId },
});

export const deleteSalesInvoice = action({
  display: {
    label: "Delete Sales Invoice",
    description: "Delete the information and metadata of a sales invoice by Id",
  },
  perform: async (context, params) => {
    const client = getSageClient(params.connection, context.debug.enabled);

    const { data } = await client.delete(`/sales_invoices/${params.salesInvoiceId}`, {});

    return {
      data,
    };
  },
  inputs: { connection, salesInvoiceId },
});

export const createSalesInvoice = action({
  display: {
    label: "Create Sales Invoice",
    description: "Create a new sales invoice",
  },
  perform: async (context, params) => {
    const client = getSageClient(params.connection, context.debug.enabled);

    const { data } = await client.post(`/sales_invoices`, {
      sales_invoice: {
        contact_id: util.types.toString(params.contactId),
        date: util.types.toString(params.date),
        invoice_lines: JSON.parse(util.types.toString(params.invoiceLines)) || [],
        total_amount: util.types.toNumber(params.totalAmount),
      },
    });

    return {
      data,
    };
  },
  inputs: { connection, contactId, date, invoiceLines, totalAmount },
});

export const updateSalesInvoice = action({
  display: {
    label: "Update Sales Invoice",
    description: "Update the information and metadata of a sales invoice by Id",
  },
  perform: async (context, params) => {
    const client = getSageClient(params.connection, context.debug.enabled);

    const { data } = await client.put(`/sales_invoices/${params.salesInvoiceId}`, {
      sales_invoice: {
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
        invoiceLines: JSON.parse(util.types.toString(params.invoiceLines)) || [],
      },
    });

    return {
      data,
    };
  },
  inputs: {
    connection,
    salesInvoiceId,
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
