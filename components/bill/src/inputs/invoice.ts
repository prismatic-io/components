import { input, util } from "@prismatic-io/spectral";
import {
  connection,
  additionalFields,
  customerId,
  filters,
  max,
  nested,
  sort,
  start,
} from "./shared";
import { cleanArrayCodeInput } from "../util";

const listInvoiceComments =
  " See [Bill.com API documentation](https://developer.bill.com/reference/listinvoices) for more information.";

const invoiceAdditionalFields = {
  isActive: "1",
  glPostingDate: "2024-04-10",
  description: "Description",
  isToBePrinted: true,
};

const invoiceNumber = input({
  label: "Invoice Number",
  type: "string",
  example: "00e02DTF...",
  placeholder: "Enter invoice number",
  required: true,
  comments:
    "User-generated invoice number. This value can be your chosen number scheme or invoice due date.",
  clean: util.types.toString,
});

const invoiceDate = input({
  label: "Invoice Date",
  type: "string",
  example: "2024-04-10",
  placeholder: "Enter invoice date",
  required: true,
  comments:
    "Date when the invoice is issued to the customer. This value is in the YYYY-MM-DD format.",
  clean: util.types.toString,
});

const dueDate = input({
  label: "Due Date",
  type: "string",
  example: "2024-04-10",
  placeholder: "Enter due date",
  required: true,
  comments:
    "Date when the invoice is due. The value is in the YYYY-MM-DD format.",
  clean: util.types.toString,
});

const invoiceLineItems = input({
  label: "Invoice Line Items",
  type: "code",
  language: "json",
  comments: "An array of invoice line items.",
  required: true,
  example: JSON.stringify(
    [
      {
        entity: "InvoiceLineItem",
        quantity: 1,
        itemId: "0ii...",
        price: 100,
      },
    ],
    null,
    2,
  ),
  clean: (value: unknown) => cleanArrayCodeInput(value, "Invoice Line Items"),
});

export const createInvoiceInputs = {
  connection,
  customerId,
  invoiceNumber,
  invoiceDate,
  dueDate,
  invoiceLineItems,
  additionalFields: input({
    ...additionalFields,
    example: JSON.stringify(invoiceAdditionalFields, null, 2),
    comments: `${additionalFields.comments} See https://developer.bill.com/reference/createinvoice for more information.`,
  }),
};

const invoiceCreateBulk = input({
  label: "Invoices to Create",
  type: "code",
  language: "json",
  comments:
    "An array of invoice objects to create. See [Bill.com API documentation](https://developer.bill.com/v2/reference/ar-customertransactions-bulkcreateinvoice) for more information.",
  required: true,
  example: JSON.stringify(
    [
      {
        obj: {
          entity: "Invoice",
          isActive: "1",
          customerId: "0cu...",
          invoiceNumber: "10",
          invoiceDate: "2024-04-10",
          dueDate: "2024-04-20",
          isToBePrinted: true,
          invoiceLineItems: [
            {
              entity: "InvoiceLineItem",
              quantity: 1,
              itemId: "0ii...",
              price: 100,
            },
          ],
        },
      },
    ],
    null,
    2,
  ),
  clean: (value: unknown) => cleanArrayCodeInput(value, "Invoices to Create"),
});

export const bulkCreateInvoicesInputs = {
  connection,
  invoiceCreateBulk,
};

const invoiceId = input({
  label: "Invoice ID",
  type: "string",
  example: "00e...",
  placeholder: "Enter invoice ID",
  required: true,
  comments: "The ID of the invoice.",
  clean: util.types.toString,
});

export const getInvoiceInputs = {
  connection,
  invoiceId,
};

export const listInvoiceInputs = {
  connection,
  start,
  max,
  sort: input({ ...sort, comments: `${sort.comments}${listInvoiceComments}` }),
  filters: input({
    ...filters,
    comments: `${filters.comments}${listInvoiceComments}`,
  }),
  nested,
};

export const updateInvoiceInputs = {
  connection,
  invoiceId,
  customerId,
  invoiceNumber,
  invoiceDate,
  dueDate,
  invoiceLineItems,
  additionalFields,
};

const invoiceUpdateBulk = input({
  label: "Invoices to Update",
  type: "code",
  language: "json",
  comments:
    "An array of invoice objects to update. See [Bill.com API documentation](https://developer.bill.com/v2/reference/ar-customertransactions-bulkupdateinvoice) for more information.",
  required: true,
  example: JSON.stringify(
    [
      {
        obj: {
          entity: "Invoice",
          id: "00e",
          isActive: "1",
          customerId: "0cu...",
          invoiceNumber: "10",
          invoiceDate: "2024-04-10",
          dueDate: "2024-04-20",
          isToBePrinted: true,
          invoiceLineItems: [
            {
              entity: "InvoiceLineItem",
              quantity: 1,
              itemId: "0ii...",
              price: 100,
            },
          ],
        },
      },
    ],
    null,
    2,
  ),
  clean: (value: unknown) => cleanArrayCodeInput(value, "Invoices to Update"),
});

export const bulkUpdateInvoicesInputs = {
  connection,
  invoiceUpdateBulk,
};

export const deleteInvoiceInputs = {
  connection,
  invoiceId,
};
