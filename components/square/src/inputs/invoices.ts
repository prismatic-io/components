import { input, util } from "@prismatic-io/spectral";
import { cursor, idempotencyKey, limit, locationId, squareConnection } from "./common";

const invoiceQuery = input({
  label: "Query",
  type: "code",
  language: "json",
  default: JSON.stringify(
    {
      filter: {
        location_ids: ["LH2G9VFHJRWKR"],
        customer_ids: ["JDKYHBWT1D4F8MFH63DBMEN8Y4"],
      },
      sort: {
        field: "INVOICE_SORT_DATE",
        order: "DESC",
      },
    },
    null,
    2,
  ),
  required: true,
  comments:
    "The query to search for invoices. See [Square Search Invoices](https://developer.squareup.com/reference/square/invoices-api/search-invoices) for filter and sort options.",
  clean: (queryInput) => {
    if (!util.types.isJSON(util.types.toString(queryInput))) {
      throw new Error("Invalid JSON provided for Query.");
    }
    return JSON.parse(util.types.toString(queryInput));
  },
});

const invoiceId = input({
  label: "Invoice ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the invoice.",
  example: "inv:0-ChCHu2mZEabLeeHahQnXDjZQECY",
  placeholder: "Enter Invoice ID",
  dataSource: "selectInvoice",
  clean: util.types.toString,
});

const updateInvoiceInput = input({
  label: "Update Invoice",
  type: "code",
  language: "json",
  default: JSON.stringify(
    {
      invoice: {
        version: 1,
        payment_requests: [
          {
            uid: "2da7964f-f3d2-4f43-81e8-5aa220bf3355",
            tipping_enabled: false,
          },
        ],
      },
      idempotency_key: "4ee82288-0910-499e-ab4c-5d0071dad1be",
      fields_to_clear: ["payment_requests[2da7964f-f3d2-4f43-81e8-5aa220bf3355].reminders"],
    },
    null,
    2,
  ),
  required: true,
  comments:
    "The invoice data to update in JSON format. See [Square Update Invoice](https://developer.squareup.com/docs/invoices-api/update-invoices) for field details.",
  clean: (updateInvoiceInput) => {
    if (!util.types.isJSON(util.types.toString(updateInvoiceInput))) {
      throw new Error("Invalid JSON provided for Update Invoice.");
    }
    return JSON.parse(util.types.toString(updateInvoiceInput));
  },
});

export const listInvoicesInputs = {
  squareConnection,
  locationId,
  cursor,
  limit,
};

export const searchInvoicesInputs = {
  squareConnection,
  invoiceQuery,
  cursor,
  limit,
};

export const getInvoiceInputs = {
  squareConnection,
  invoiceId,
};

export const updateInvoiceInputs = {
  squareConnection,
  invoiceId,
  updateInvoiceInput,
};

export const publishInvoiceInputs = {
  squareConnection,
  invoiceId,
  idempotencyKey,
};

export const cancelInvoiceInputs = {
  squareConnection,
  invoiceId,
};

export const deleteInvoiceInputs = {
  squareConnection,
  invoiceId,
};
