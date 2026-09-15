import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput, mapStatusModelInput } from "../util";
import {
  connection,
  customQueryParams,
  exportId,
  fetchAll,
  includeTotal,
  memo,
  operations,
  pagination,
  sort,
  typeId,
} from "./common";
const paymentId = input({
  label: "Payment ID",
  type: "string",
  example: "10978752986",
  required: true,
  comments: "The ID of the payment.",
  placeholder: "Enter a payment ID",
  clean: util.types.toString,
  dataSource: "selectPayment",
});
const paidOn = input({
  label: "Paid On",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "The date the payment was paid on.",
  placeholder: "Enter the payment date and time in UTC",
  clean: cleanStringInput,
});
const authCode = input({
  label: "Auth Code",
  type: "string",
  example: "A1B2C3",
  required: false,
  comments: "The authorization code for the payment.",
  placeholder: "Enter an authorization code",
  clean: cleanStringInput,
});
const checkNumber = input({
  label: "Check Number",
  type: "string",
  example: "1042",
  required: false,
  comments: "The check number for the payment.",
  placeholder: "Enter a check number",
  clean: cleanStringInput,
});
const status = input({
  label: "Status",
  type: "string",
  required: false,
  model: mapStatusModelInput,
  default: "",
  comments: "The status of the payment.",
  clean: cleanStringInput,
});
const splits = input({
  label: "Splits",
  type: "code",
  language: "json",
  required: true,
  default: JSON.stringify(
    [
      {
        invoiceId: 0,
        amount: 0,
      },
    ],
    null,
    2,
  ),
  comments: "The splits of the payment.",
  clean: util.types.toObject,
});
export const createPaymentInputs = {
  connection,
  typeId,
  splits,
  memo,
  paidOn,
  authCode,
  checkNumber,
  exportId,
  status,
};
export const listPaymentsInputs = {
  connection,
  fetchAll,
  pagination,
  includeTotal,
  sort,
  customQueryParams,
};
export const updatePaymentInputs = {
  connection,
  paymentId,
  typeId,
  splits,
  memo,
  paidOn,
  authCode,
  checkNumber,
  exportId,
  status,
};
export const updatePaymentCustomFieldsInputs = {
  connection,
  operations,
};
