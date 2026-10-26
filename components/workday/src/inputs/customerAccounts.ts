import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { cleanDate, cleanStringInput } from "../util";
import {
  companyId,
  connection,
  memo,
  extraParameters,
  paginationQueryStringInputs,
} from "./common";
const invoiceId = input({
  label: "Invoice ID",
  comments: "Identifies the customer invoice to retrieve.",
  type: "string",
  placeholder: "Enter invoice ID",
  example: "e1c7a3f5b9d24c6e8a0f2b4d6c8e0a2f",
  required: true,
  clean: util.types.toString,
  dataSource: "selectInvoice",
});
const paymentId = input({
  label: "Payment ID",
  comments: "Identifies the customer payment record.",
  type: "string",
  required: true,
  example: "5c3a1e9f7d2b4a6c8e0f1a3b5c7d9e1f",
  placeholder: "Enter payment ID",
  clean: util.types.toString,
});
const invoicePdfId = input({
  label: "Invoice PDF ID",
  comments: "Identifies the invoice PDF resource to retrieve.",
  type: "string",
  placeholder: "Enter invoice PDF ID",
  example: "e1c7a3f5b9d24c6e8a0f2b4d6c8e0a2f",
  required: true,
  clean: util.types.toString,
});
const remitFromCustomerId = input({
  label: "Remit From Customer ID",
  comments: "Identifies the customer remitting the payment.",
  type: "string",
  required: false,
  example: "8f2e4d6c1b3a49e7a5c0d9f8e7b6a5c4",
  placeholder: "Enter remit from customer ID",
  clean: cleanStringInput,
});
const readyToAutoApply = input({
  label: "Ready to Auto Apply",
  comments: "When true, flags the payment as ready for automatic application.",
  type: "boolean",
  required: false,
  default: "true",
  clean: util.types.toBool,
});
const reference = input({
  label: "Reference",
  comments: "External reference string associated with the payment.",
  type: "string",
  required: false,
  example: "REF-2024-0601",
  placeholder: "Enter reference",
  clean: cleanStringInput,
});
const transactionNumber = input({
  label: "Transaction Number",
  comments: "Bank transaction number associated with the payment.",
  type: "string",
  required: false,
  example: "TXN-884215",
  placeholder: "Enter transaction number",
  clean: cleanStringInput,
});
const amount = input({
  label: "Amount",
  comments: "Monetary amount for the payment.",
  type: "string",
  required: false,
  example: "1250.00",
  placeholder: "Enter amount",
  clean: cleanStringInput,
});
const typeId = input({
  label: "Type ID",
  comments: "Identifies the payment type.",
  type: "string",
  required: false,
  example: "Payment_Type_ID=Check",
  placeholder: "Enter type ID",
  clean: cleanStringInput,
});
const date = input({
  label: "Payment Date",
  comments: "Date the payment was made. Format: YYYY-MM-DD.",
  type: "string",
  required: false,
  example: "2024-06-01",
  placeholder: "Enter payment date (YYYY-MM-DD)",
  clean: (value) => cleanDate(value, "Payment Date"),
});
const paymentDescriptor = input({
  label: "Payment Descriptor",
  comments: "Human-readable descriptor for the payment.",
  type: "string",
  required: false,
  example: "Customer Payment: CP-000789",
  placeholder: "Enter payment descriptor",
  clean: cleanStringInput,
});
const paymentIdOptional = input({
  label: "Payment ID",
  comments: "Optional identifier to assign to the payment on creation.",
  type: "string",
  required: false,
  example: "5c3a1e9f7d2b4a6c8e0f1a3b5c7d9e1f",
  placeholder: "Enter payment ID",
  clean: cleanStringInput,
});
const additionalFields = structuredObjectInput({
  label: "Additional Fields",
  comments:
    "Additional optional fields: includes Ready to Auto Apply, Reference, Transaction Number, Memo, and Payment Descriptor.",
  required: false,
  inputs: {
    readyToAutoApply,
    reference,
    transactionNumber,
    memo,
    paymentDescriptor,
  },
});
export const getInvoiceByIdInputs = { connection, invoiceId };
export const getInvoicePdfInputs = {
  connection,
  invoicePdfId,
};
export const getPaymentByIdInputs = {
  connection,
  paymentId,
};
export const listInvoicesInputs = {
  connection,
  ...paginationQueryStringInputs,
  extraParameters,
};
export const postPaymentInputs = {
  connection,
  remitFromCustomerId,
  amount,
  typeId,
  date,
  companyId,
  paymentId: paymentIdOptional,
  additionalFields,
};
