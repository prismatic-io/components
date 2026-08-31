import { input, structuredObjectInput } from "@prismatic-io/spectral";
import { cleanObjectInput, cleanStringInput } from "../util";
import {
  chargeId,
  connectionInput,
  customerId,
  description,
  forwardCursorPagination,
  limit,
  metadata,
  page,
  query,
  receiptEmail,
  shipping,
  timeout,
  transferGroup,
} from "./common";
export const payout = input({
  label: "Payout",
  type: "string",
  comments:
    "For automatic Stripe payouts only, only returns transactions that were paid out on the specified payout ID.",
  required: false,
  clean: cleanStringInput,
});
export const type = input({
  label: "Type",
  type: "string",
  model: [
    { label: "Adjustment", value: "adjustment" },
    { label: "Advance", value: "advance" },
    { label: "Advance Funding", value: "advance_funding" },
    { label: "Anticipation Repayment", value: "anticipation_repayment" },
    { label: "Application Fee", value: "application_fee" },
    { label: "Application Fee Refund", value: "application_fee_refund" },
    { label: "Charge", value: "charge" },
    {
      label: "Connect Collection Transfer",
      value: "connect_collection_transfer",
    },
    { label: "Contribution", value: "contribution" },
    {
      label: "Issuing Authorization Hold",
      value: "issuing_authorization_hold",
    },
    {
      label: "Issuing Authorization Release",
      value: "issuing_authorization_release",
    },
    { label: "Issuing Dispute", value: "issuing_dispute" },
    { label: "Issuing Transaction", value: "issuing_transaction" },
    { label: "Payment", value: "payment" },
    { label: "Payment Failure Refund", value: "payment_failure_refund" },
    { label: "Payment Refund", value: "payment_refund" },
    { label: "Payment Reversal", value: "payment_reversal" },
    { label: "Payout", value: "payout" },
    { label: "Payout Cancel", value: "payout_cancel" },
    { label: "Payout Failure", value: "payout_failure" },
    { label: "Refund", value: "refund" },
    { label: "Refund Failure", value: "refund_failure" },
    { label: "Reserve Transaction", value: "reserve_transaction" },
    { label: "Reserved Funds", value: "reserved_funds" },
    { label: "Stripe Fee", value: "stripe_fee" },
    { label: "Stripe FX Fee", value: "stripe_fx_fee" },
    { label: "Tax Fee", value: "tax_fee" },
    { label: "Topup", value: "topup" },
    { label: "Topup Reversal", value: "topup_reversal" },
    { label: "Transfer", value: "transfer" },
    { label: "Transfer Cancel", value: "transfer_cancel" },
    { label: "Transfer Failure", value: "transfer_failure" },
    { label: "Transfer Refund", value: "transfer_refund" },
  ],
  comments: "Only returns transactions of the given type.",
  required: false,
  clean: cleanStringInput,
});
export const fraudDetails = input({
  label: "Fraud Details",
  type: "code",
  language: "json",
  placeholder: "Enter fraud details",
  required: false,
  comments:
    "A set of key-value pairs that can be attached to a charge giving information about its riskiness.",
  example: JSON.stringify({
    user_report: "safe",
  }),
  clean: cleanObjectInput,
});
export const getChargeInputs = {
  timeout,
  stripeConnection: connectionInput,
  chargeId,
};
export const listChargesInputs = {
  timeout,
  pagination: forwardCursorPagination,
  stripeConnection: connectionInput,
};
export const searchChargesPagination = structuredObjectInput({
  label: "Pagination",
  comments: "Cursor and page-size controls for paging through results.",
  inputs: {
    limit: {
      ...limit,
      comments:
        "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
    },
    page,
  },
});
export const searchChargesInputs = {
  timeout,
  stripeConnection: connectionInput,
  query,
  pagination: searchChargesPagination,
};
export const updateChargeInputs = {
  timeout,
  stripeConnection: connectionInput,
  chargeId,
  customerId: {
    ...customerId,
    label: "Customer ID",
    comments:
      "The ID of an existing customer that will be associated with this request.",
    clean: cleanStringInput,
  },
  description: {
    ...description,
    comments:
      "An arbitrary string that can be attached to a charge object. It is displayed in the web interface alongside the charge.",
    clean: cleanStringInput,
  },
  metadata,
  receiptEmail,
  shipping,
  fraudDetails,
  transferGroup,
};
