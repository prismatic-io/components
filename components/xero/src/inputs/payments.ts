import { input, util } from "@prismatic-io/spectral";
import {
  accountId,
  connectionInput,
  dateString,
  fetchAll,
  invoiceId,
  modifiedAfter,
  page,
  where,
} from "./common";

export const paymentId = input({
  label: "Payment ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the payment.",
  placeholder: "Enter payment ID",
  dataSource: "selectPayment",
  clean: util.types.toString,
});

export const paymentAmount = input({
  label: "Payment Amount",
  type: "string",
  required: true,
  comments:
    "The amount of the payment. Must be less than or equal to the outstanding amount owed on the invoice.",
  placeholder: "Enter payment amount",
  clean: util.types.toString,
});

export const getPaymentInputs = {
  xeroConnection: connectionInput,
  paymentId,
};

export const getPaymentHistoryInputs = {
  xeroConnection: connectionInput,
  paymentId,
};

export const listPaymentsInputs = {
  xeroConnection: connectionInput,
  fetchAll,
  page,
  modifiedAfter,
  where,
};

export const payInvoiceInputs = {
  xeroConnection: connectionInput,
  invoiceId,
  accountId,
  paymentAmount,
  dateString,
};

export const reversePaymentInputs = {
  xeroConnection: connectionInput,
  paymentId,
};
