import { input, util } from "@prismatic-io/spectral";
import { createInvoiceAdditionalFields } from "../constants";
import { cleanObject, cleanStringInput } from "../util";
import {
  additionalFields,
  connectionInput,
  contactId,
  dateString,
  fetchAll,
  invoiceId,
  modifiedAfter,
  notes,
  page,
  where,
} from "./common";

export const invoiceType = input({
  label: "Invoice Type",
  type: "string",
  required: true,
  comments: "The type of invoice to create.",
  placeholder: "Enter invoice type",
  model: [
    { label: "Accounts Payable", value: "ACCPAY" },
    { label: "Accounts Receivable", value: "ACCREC" },
  ],
  clean: util.types.toString,
});

export const date = input({
  label: "Date",
  type: "string",
  required: false,
  comments:
    "The date the invoice was issued. Defaults to the current date based on the organization's timezone setting if not specified. Format: YYYY-MM-DD.",
  placeholder: "Enter date",
  example: "2024-10-01",
  clean: cleanStringInput,
});

export const dueDate = input({
  label: "Due Date",
  type: "string",
  required: false,
  comments: "The date the invoice is due. Format: YYYY-MM-DD.",
  placeholder: "Enter due date",
  example: "2024-10-01",
  clean: cleanStringInput,
});

export const dueDateString = input({
  label: "Due Date String",
  type: "string",
  required: false,
  comments:
    "The due date of the invoice as a string. Format: YYYY-MM-DDTHH:MM:SS.",
  placeholder: "Enter due date string",
  example: "2021-05-27T00:00:00",
  clean: cleanStringInput,
});

export const lineAmountTypes = input({
  label: "Line Amount Type",
  type: "string",
  required: true,
  comments:
    "Whether line amounts are tax exclusive, inclusive, or have no tax.",
  placeholder: "Enter line amount type",
  model: [
    { label: "Exclusive", value: "Exclusive" },
    { label: "Inclusive", value: "Inclusive" },
    { label: "No Tax", value: "NoTax" },
  ],
  clean: util.types.toString,
});

export const lineItems = input({
  label: "Line Items",
  type: "code",
  required: false,
  language: "json",
  comments:
    "A JSON array where each object describes a line item. The 'ItemCode', 'Tracking', and 'DiscountRate' properties are optional. Use an empty array for no line items.",
  example: JSON.stringify(
    [
      {
        Description: "example description",
        Quantity: "10",
        ItemCode: "Use this value to reference an existing item.",
        UnitAmount: "100.00",
        AccountCode: "200",
        DiscountRate: "20",
        Tracking: [
          {
            Name: "Activity/Workstream",
            Option: "On site consultancy",
          },
        ],
      },
    ],
    null,
    2,
  ),
  clean: cleanObject,
});

export const invoiceNumber = input({
  label: "Invoice Number",
  type: "string",
  required: false,
  comments: "A unique number that identifies the invoice.",
  placeholder: "Enter invoice number",
  example: "INV01",
  clean: cleanStringInput,
});

export const invoiceStatus = input({
  label: "Invoice Status",
  type: "string",
  required: false,
  comments:
    "The status of the invoice. Required to make payments on an invoice. Defaults to DRAFT.",
  placeholder: "Enter invoice status",
  model: [
    { label: "Draft", value: "DRAFT" },
    { label: "Submitted", value: "SUBMITTED" },
    { label: "Authorized", value: "AUTHORISED" },
  ],
  clean: cleanStringInput,
});

export const reference = input({
  label: "Reference",
  type: "string",
  required: false,
  comments:
    "An additional reference number for the invoice (Accounts Receivable invoices only).",
  placeholder: "Enter reference",
  example: "REF01",
  clean: cleanStringInput,
});

export const url = input({
  label: "URL",
  type: "string",
  required: false,
  comments: `The URL of a source document, shown as "Go to [appName]" in the Xero app.`,
  placeholder: "Enter URL",
  example: "https://example.com",
  clean: cleanStringInput,
});

export const currencyCode = input({
  label: "Currency Code",
  type: "string",
  required: false,
  comments: "The currency the invoice has been raised in.",
  placeholder: "Enter currency code",
  example: "USD",
  clean: cleanStringInput,
});

export const sentToContact = input({
  label: "Sent To Contact",
  type: "boolean",
  required: false,
  comments: `When true, marks the invoice in the Xero app as "sent". This can only be set on invoices that have been approved.`,
  default: "false",
  clean: util.types.toBool,
});

const invoiceAdditionalFields = input({
  ...additionalFields,
  example: JSON.stringify(createInvoiceAdditionalFields, null, 2),
  comments:
    additionalFields.comments +
    " See [Xero API documentation](https://developer.xero.com/documentation/api/accounting/invoices#post-invoices) for additional fields.",
});

export const addNoteToInvoiceInputs = {
  xeroConnection: connectionInput,
  invoiceId,
  notes,
};

export const createInvoiceInputs = {
  xeroConnection: connectionInput,
  invoiceType,
  contactId,
  lineAmountTypes,
  invoiceStatus,
  lineItems,
  date,
  dueDate,
  dateString,
  dueDateString,
  invoiceNumber,
  reference,
  url,
  currencyCode,
  sentToContact,
  additionalFields: invoiceAdditionalFields,
};

export const deleteInvoiceInputs = {
  xeroConnection: connectionInput,
  invoiceId,
};

export const getInvoiceInputs = {
  xeroConnection: connectionInput,
  invoiceId,
};

export const getInvoiceHistoryInputs = {
  xeroConnection: connectionInput,
  contactId,
};

export const listInvoicesInputs = {
  xeroConnection: connectionInput,
  fetchAll,
  page,
  modifiedAfter,
  where,
};

export const sendInvoiceInputs = {
  xeroConnection: connectionInput,
  invoiceId,
};

export const voidInvoiceInputs = {
  xeroConnection: connectionInput,
  invoiceId,
};
