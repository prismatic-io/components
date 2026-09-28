import { input, util } from "@prismatic-io/spectral";
import { customerJson } from "../constants";
import { cleanString } from "../utils";
import {
  connectionInput,
  fetchAll,
  searchCriteriaConditionType,
  searchCriteriaCurrentPage,
  searchCriteriaField,
  searchCriteriaPageSize,
  searchCriteriaSortDirection,
  searchCriteriaSortField,
  searchCriteriaValue,
} from "./common";
export const customer = input({
  label: "Customer",
  type: "code",
  language: "json",
  required: true,
  comments:
    "The customer record to save, as a JSON object under a `customer` key. The default value lists every field the endpoint accepts; remove the ones that do not apply.",
  placeholder: "Enter the customer as JSON",
  default: JSON.stringify(customerJson, null, 2),
  clean: util.types.toObject,
});
export const password = input({
  label: "Password",
  type: "string",
  required: false,
  comments:
    "The password to set on the new customer account. When provided it is added to the request body as `password`; leave it blank to omit it from the request.",
  placeholder: "Enter a password",
  clean: cleanString,
});
export const redirectUrl = input({
  label: "Redirect URL",
  type: "string",
  required: false,
  comments:
    "The URL sent alongside the new customer account as `redirectUrl`, used as the destination of the account confirmation link. Leave it blank to omit it from the request.",
  placeholder: "Enter a redirect URL",
  example: "https://www.example.com/customer/account/confirm",
  clean: cleanString,
});
export const customerId = input({
  label: "Customer ID",
  type: "string",
  required: true,
  comments:
    "The customer to act on, identified by their Magento customer `id`. Pick a customer from the dropdown or supply the ID directly.",
  placeholder: "Enter a customer ID",
  example: "1",
  dataSource: "selectCustomer",
  clean: util.types.toString,
});
export const passwordHash = input({
  label: "Password Hash",
  type: "string",
  required: false,
  comments:
    "An already-hashed password to store on the customer, for migrating an account whose credentials were created elsewhere. When provided it is added to the request body as `passwordHash`; leave it blank to omit it from the request.",
  placeholder: "Enter a password hash",
  clean: cleanString,
});
export const createCustomerInputs = {
  connection: connectionInput,
  customer,
  password,
  redirectUrl,
};
export const deleteCustomerInputs = {
  connection: connectionInput,
  customerId,
};
export const getCustomerInputs = {
  connection: connectionInput,
  customerId,
};
export const searchCustomersInputs = {
  connection: connectionInput,
  fetchAll,
  searchCriteriaCurrentPage,
  searchCriteriaPageSize,
  searchCriteriaConditionType,
  searchCriteriaField,
  searchCriteriaValue,
  searchCriteriaSortDirection,
  searchCriteriaSortField,
};
export const updateCustomerInputs = {
  connection: connectionInput,
  customerId,
  customer,
  passwordHash,
};
