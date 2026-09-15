import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput, mapModelValues } from "../util";
import {
  connection,
  customerId,
  fetchAll,
  includeTotal,
  memo,
  modifiedBefore,
  modifiedOnOrAfter,
  pagination,
} from "./common";
const customerContactId = input({
  label: "Customer Contact ID",
  type: "string",
  example: "10978752986",
  required: true,
  comments: "The customer contact ID.",
  placeholder: "Enter a customer contact ID",
  clean: util.types.toNumber,
  dataSource: "selectCustomerContact",
});
const customerContactType = input({
  label: "Customer Contact Type",
  type: "string",
  required: true,
  comments: "Type of the customer contact",
  model: mapModelValues(["Phone", "Email", "Fax", "MobilePhone"], true),
  default: "",
  clean: cleanStringInput,
});
const customerContactTypeValue = input({
  label: "Customer Contact Type Value",
  type: "string",
  example: "1234567890",
  required: true,
  comments: "The email, phone number, or fax number for the contact",
  placeholder: "Enter an email address, phone number, or fax number",
  clean: cleanStringInput,
});
const contactMemo = {
  ...memo,
  comments:
    "Short description about this contact, for example, \u201cwork #\u201d or \u201cOwner\u2019s daughter - Kelly\u201d",
};
export const createCustomerContactInputs = {
  connection,
  customerId,
  type: customerContactType,
  value: customerContactTypeValue,
  memo: contactMemo,
};
export const deleteCustomerContactInputs = {
  connection,
  customerId,
  customerContactId,
};
export const listCustomersContactInputs = {
  connection,
  customerId,
  fetchAll,
  pagination,
  includeTotal,
  modifiedBefore,
  modifiedOnOrAfter,
};
export const updateCustomerContactInputs = {
  connection,
  customerId,
  customerContactId,
  type: { ...customerContactType, required: false },
  value: { ...customerContactTypeValue, required: false },
  memo: contactMemo,
};
