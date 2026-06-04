import { input, util } from "@prismatic-io/spectral";

export const receiptId = input({
  label: "Receipt ID",
  placeholder: "Enter receipt ID",
  type: "string",
  required: true,
  example: "101",
  comments: "The unique identifier of the receipt.",
  dataSource: "selectRefundReceipt",
  clean: util.types.toString,
});

export const refundAmount = input({
  label: "Refund Amount",
  placeholder: "Enter refund amount",
  type: "string",
  required: true,
  example: "50",
  comments: "The amount to refund.",
  clean: util.types.toString,
});

export const refundId = input({
  label: "Refund ID",
  placeholder: "Enter refund ID",
  type: "string",
  required: true,
  example: "0973095734",
  comments: "The unique identifier of the refund.",
  clean: util.types.toString,
});

export const chargeRequestId = input({
  label: "Charge Request ID",
  placeholder: "Enter charge request ID",
  type: "string",
  required: true,
  example: "0973095734",
  comments: "The ID of the charge request.",
  clean: util.types.toString,
});

export const requestId = input({
  label: "Request ID",
  placeholder: "Enter request ID",
  type: "string",
  required: true,
  example: "0973095734",
  comments: "The ID of the request.",
  clean: util.types.toString,
});
