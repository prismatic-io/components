import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { cleanNumberInput, cleanStringInput } from "../util";
import {
  applicationFeeAmount,
  connectionInput,
  customerId,
  description,
  fieldValues,
  forwardCursorPagination,
  metadata,
  paymentId,
  subscriptionId,
  timeout,
} from "./common";
export const collectionMethod = input({
  label: "Collection Method",
  type: "string",
  comments: "The method used to collect payment for the invoice.",
  placeholder: "Select collection method",
  model: [
    { label: "Charge Automatically", value: "charge_automatically" },
    { label: "Send Invoice", value: "send_invoice" },
  ],
  required: false,
  clean: cleanStringInput,
});
export const autoAdvance = input({
  label: "Auto Advance",
  type: "boolean",
  comments:
    "When true, Stripe will automatically attempt collection of the invoice.",
  required: false,
  clean: util.types.toBool,
});
export const dueDate = input({
  label: "Due Date",
  type: "string",
  comments: "The due date of the invoice as a Unix timestamp.",
  example: "1735689600",
  placeholder: "Enter Unix timestamp",
  required: false,
  clean: cleanNumberInput,
});
export const coupon = input({
  label: "Coupon",
  type: "string",
  comments: "The unique identifier of the coupon to apply to the invoice.",
  example: "SUMMER2025",
  placeholder: "Enter coupon code",
  required: false,
  clean: cleanStringInput,
});
export const discount = input({
  label: "Discount",
  type: "string",
  comments: "The discount ID to apply to the invoice.",
  example: "di_1JaOXaDtJQgcyrdSRnsI9KW5",
  placeholder: "Enter Discount ID",
  required: false,
  clean: cleanStringInput,
});
export const invoiceId = input({
  label: "Invoice ID",
  type: "string",
  comments: "The unique identifier for the invoice.",
  example: "in_1JaOXaDtJQgcyrdSRnsI9KW5",
  placeholder: "Enter Invoice ID",
  required: true,
  dataSource: "selectInvoice",
  clean: util.types.toString,
});
export const createInvoiceInputs = {
  timeout,
  customerId,
  collectionMethod,
  paymentId,
  autoAdvance,
  fieldValues,
  subscriptionId,
  description,
  metadata,
  dueDate,
  stripeConnection: connectionInput,
};
export const deleteInvoiceInputs = {
  invoiceId,
  timeout,
  stripeConnection: connectionInput,
};
export const getInvoiceInputs = {
  invoiceId,
  timeout,
  stripeConnection: connectionInput,
};
export const listInvoicesInputs = {
  timeout,
  pagination: forwardCursorPagination,
  stripeConnection: connectionInput,
};
export const updateInvoiceAdditionalFields = structuredObjectInput({
  label: "Additional Fields",
  comments:
    "Additional optional fields: includes Auto Advance, Application Fee Amount, Coupon, and Discount.",
  inputs: { autoAdvance, applicationFeeAmount, coupon, discount },
});
export const updateInvoiceInputs = {
  invoiceId,
  customerId,
  paymentId,
  collectionMethod,
  description,
  dueDate,
  fieldValues,
  metadata,
  additionalFields: updateInvoiceAdditionalFields,
  timeout,
  stripeConnection: connectionInput,
};
