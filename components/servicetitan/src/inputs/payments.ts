import { input } from "@prismatic-io/spectral";
import { cleanCodeInput, cleanStringInput, mapStatusModelInput } from "../util";
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
export const paymentId = input({
  label: "Payment ID",
  type: "string",
  example: "10978752986",
  required: true,
  comments: "The ID of the payment.",
  placeholder: "10978752986",
  clean: cleanStringInput,
  dataSource: "selectPayment",
});
const paidOn = input({
  label: "Paid On",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "The date the payment was paid on.",
  placeholder: "2021-01-01T00:00:00Z",
  clean: cleanStringInput,
});
const authCode = input({
  label: "Auth Code",
  type: "string",
  example: "6B29FC40-CA47-1067-B31D-00DD010662DA21323",
  required: false,
  comments: "The authorization code for the payment.",
  placeholder: "6B29FC40-CA47-1067-B31D-00DD010662DA21323",
  clean: cleanStringInput,
});
const checkNumber = input({
  label: "Check Number",
  type: "string",
  example: "6B29FC40-CA47-1067-B31D-00DD010662DA21323",
  required: false,
  comments: "The check number for the payment.",
  placeholder: "6B29FC40-CA47-1067-B31D-00DD010662DA21323",
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
  clean: cleanCodeInput,
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
