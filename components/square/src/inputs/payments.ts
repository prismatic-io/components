import { input, util } from "@prismatic-io/spectral";
import { toOptionalNumber, toOptionalString } from "../util";
import {
  beginTime,
  cursor,
  idempotencyKey,
  limit,
  locationId,
  sortOrder,
  squareConnection,
  validateJSON,
} from "./common";

const endTime = input({
  type: "string",
  label: "End Time",
  placeholder: "Enter end time (RFC 3339 format)",
  example: "2024-12-31T23:59:59Z",
  comments:
    "The end of the time range used to retrieve payments. Filtered using the created_at field. Format: RFC 3339.",
  required: false,
  clean: toOptionalString,
});

const total = input({
  type: "string",
  label: "Total",
  placeholder: "Enter total amount in cents",
  example: "1500",
  comments:
    "The exact payment amount in cents (smallest currency unit). For example, 1500 for $15.00.",
  required: false,
  clean: toOptionalNumber,
});

const last4 = input({
  type: "string",
  label: "Last 4 Digits of Card",
  placeholder: "Enter last 4 digits",
  example: "1234",
  comments: "The last four digits of the payment card used.",
  required: false,
  clean: toOptionalString,
});

const cardBrand = input({
  type: "string",
  label: "Card Brand",
  placeholder: "Enter card brand",
  example: "VISA",
  comments: "The brand of the payment card (for example, VISA, MASTERCARD, AMEX).",
  required: false,
  clean: toOptionalString,
});

const paymentId = input({
  type: "string",
  label: "Payment ID",
  required: true,
  comments: "The unique identifier for the payment.",
  example: "KkAkhdMsgzn59SM8A89WgKwekxLZY",
  placeholder: "Enter Payment ID",
  dataSource: "selectPayment",
  clean: util.types.toString,
});

const payment = input({
  type: "code",
  label: "Payment",
  language: "json",
  required: true,
  default: JSON.stringify(
    {
      amount_money: {
        amount: 1500,
        currency: "USD",
      },
      tip_money: {
        amount: 300,
        currency: "USD",
      },
    },
    null,
    2,
  ),
  comments:
    "Payment data in JSON format. Amounts are in cents (smallest currency unit). See [Square Payment Object](https://developer.squareup.com/reference/square/objects/Payment) for field details.",
  clean: (input) => validateJSON(input),
});

const paymentData = input({
  type: "code",
  label: "Payment Data",
  language: "json",
  required: true,
  default: JSON.stringify(
    {
      source_id: "cnon:card-nonce-ok",
      idempotency_key: "a7c8e4b1-3f5d-4e2a-9c1b-7d3e5f8a2c6b",
      amount_money: {
        amount: 1500,
        currency: "USD",
      },
      location_id: "LH2G9VFHJRWKR",
    },
    null,
    2,
  ),
  comments:
    "Payment data in JSON format. Amounts are in cents (smallest currency unit). See [Square Create Payment](https://developer.squareup.com/docs/payments-api/take-payments) for field details.",
  clean: (input) => validateJSON(input),
});

const versionToken = input({
  type: "string",
  label: "Version Token",
  placeholder: "Enter version token",
  example: "gVCJTjmQHQC2VQCFTe3pRHJsaJl",
  comments:
    "The version token used for optimistic concurrency control. Identifies the current payment version.",
  required: false,
  clean: toOptionalString,
});

const refundAmount = input({
  type: "code",
  label: "Refund Amount",
  language: "json",
  required: true,
  example: JSON.stringify(
    {
      amount: 1500,
      currency: "USD",
    },
    null,
    2,
  ),
  comments:
    "The refund amount in JSON format. Amount is in cents (smallest currency unit). Cannot exceed the payment total minus previous refunds.",
  clean: (input) => validateJSON(input),
});

const reason = input({
  type: "string",
  label: "Reason",
  required: false,
  placeholder: "Enter refund reason",
  example: "Customer requested refund due to defective product",
  comments: "A description of the reason for the refund.",
  clean: toOptionalString,
});

const refundId = input({
  type: "string",
  label: "Refund ID",
  required: true,
  placeholder: "Enter Refund ID",
  example: "KTSQvpHJMXp5hUtvZMgKr5EXhfZZY",
  comments: "The unique identifier for the payment refund.",
  dataSource: "selectRefund",
  clean: util.types.toString,
});

const status = input({
  type: "string",
  label: "Status",
  required: false,
  placeholder: "Enter status",
  example: "COMPLETED",
  comments: "When provided, only refunds with the given status are returned.",
  clean: toOptionalString,
});

const sourceType = input({
  type: "string",
  label: "Source Type",
  required: false,
  placeholder: "Enter source type",
  example: "CARD",
  comments:
    "When provided, only refunds whose payments have the indicated source type are returned.",
  clean: toOptionalString,
});

const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments: "When true, newly created payments are included in the trigger output.",
  clean: util.types.toBool,
});

const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments: "When true, payments updated since the last poll are included in the trigger output.",
  clean: util.types.toBool,
});

export const listPaymentsInputs = {
  squareConnection,
  beginTime,
  locationId,
  cursor,
  limit,
  endTime,
  sortOrder,
  total,
  last4,
  cardBrand,
};

export const getPaymentInputs = {
  squareConnection,
  paymentId,
};

export const updatePaymentInputs = {
  squareConnection,
  paymentId,
  payment,
};

export const createPaymentInputs = {
  squareConnection,
  paymentData,
};

export const completePaymentInputs = {
  squareConnection,
  paymentId,
  versionToken,
};

export const cancelPaymentInputs = {
  squareConnection,
  paymentId,
};

export const refundPaymentInputs = {
  squareConnection,
  paymentId,
  idempotencyKey,
  refundAmount,
  reason,
};

export const getPaymentRefundInputs = {
  squareConnection,
  refundId,
};

export const listPaymentRefundsInputs = {
  squareConnection,
  beginTime,
  locationId,
  cursor,
  limit,
  endTime,
  sortOrder,
  status,
  sourceType,
};


export { showNewRecords, showUpdatedRecords };
