import { input, util } from "@prismatic-io/spectral";

export const payout = input({
  label: "Payout",
  type: "string",
  comments:
    "For automatic Stripe payouts only, only returns transactions that were paid out on the specified payout ID.",
  required: false,
  clean: util.types.toString,
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
  clean: util.types.toString,
});

export const fraudDetails = input({
  label: "Fraud Details",
  type: "code",
  language: "json",
  required: false,
  comments:
    "A set of key-value pairs you can attach to a charge giving information about its riskiness.",
  example: JSON.stringify({
    user_report: "safe",
  }),
  clean: util.types.toString,
});
