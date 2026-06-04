import { input, util } from "@prismatic-io/spectral";
import { cleanDate, cleanStringInput } from "../util";
import { companyId, connection, memo, params } from "./shared";

const invoiceId = input({
  label: "Invoice ID",
  comments: "Identifies the customer invoice to retrieve.",
  type: "string",
  placeholder: "Enter invoice ID",
  example: "",
  required: true,
  clean: util.types.toString,
  dataSource: "selectInvoice",
});

const paymentId = input({
  label: "Payment ID",
  comments: "Identifies the customer payment record.",
  type: "string",
  required: true,
  example: "",
  placeholder: "Enter payment ID",
  clean: util.types.toString,
});

const invoicePdfId = input({
  label: "Invoice PDF ID",
  comments: "Identifies the invoice PDF resource to retrieve.",
  type: "string",
  placeholder: "Enter invoice PDF ID",
  example: "",
  required: true,
  clean: util.types.toString,
});


const remitFromCustomerId = input({
  label: "Remit From Customer ID",
  comments: "Identifies the customer remitting the payment.",
  type: "string",
  required: false,
  example: "",
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
  example: "",
  placeholder: "Enter reference",
  clean: cleanStringInput,
});

const transactionNumber = input({
  label: "Transaction Number",
  comments: "Bank transaction number associated with the payment.",
  type: "string",
  required: false,
  example: "",
  placeholder: "Enter transaction number",
  clean: cleanStringInput,
});

const amount = input({
  label: "Amount",
  comments: "Monetary amount for the payment.",
  type: "string",
  required: false,
  example: "",
  placeholder: "Enter amount",
  clean: cleanStringInput,
});

const typeId = input({
  label: "Type ID",
  comments: "Identifies the payment type.",
  type: "string",
  required: false,
  example: "",
  placeholder: "Enter type ID",
  clean: cleanStringInput,
});

const date = input({
  label: "Payment Date",
  comments: "Date the payment was made.",
  type: "string",
  required: false,
  example: "",
  placeholder: "Enter payment date (YYYY-MM-DD)",
  clean: (value) => cleanDate(value, "Payment Date"),
});

const paymentDescriptor = input({
  label: "Payment Descriptor",
  comments: "Human-readable descriptor for the payment.",
  type: "string",
  required: false,
  example: "",
  placeholder: "Enter payment descriptor",
  clean: cleanStringInput,
});

const paymentIdOptional = input({
  label: "Payment ID",
  comments: "Optional identifier to assign to the payment on creation.",
  type: "string",
  required: false,
  example: "",
  placeholder: "Enter payment ID",
  clean: cleanStringInput,
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

export const listInvoicesInputs = { connection, params };

export const postPaymentInputs = {
  connection,
  remitFromCustomerId,
  readyToAutoApply,
  reference,
  transactionNumber,
  amount,
  typeId,
  date,
  companyId,
  memo,
  paymentDescriptor,
  paymentId: paymentIdOptional,
};
