import { input } from "@prismatic-io/spectral";
import { cleanStringInput } from "../../utils";

export const customerNumber = input({
  label: "Customer Number",
  required: false,
  comments: "The customer number for the sales invoice.",
  type: "string",
  example: "10000",
  placeholder: "Enter customer number",
  clean: cleanStringInput,
});

export const billToCustomerId = input({
  label: "Bill To Customer ID",
  required: false,
  comments: "The customer ID for the invoice to the customer.",
  type: "string",
  example: "7e57e220-e60b-ef11-9f8e-6045bdc8c192",
  placeholder: "Enter bill to customer ID",
  dataSource: "listCustomers",
  clean: cleanStringInput,
});

export const shipToName = input({
  label: "Ship To Name",
  required: false,
  comments: "The name of the ship to customer.",
  type: "string",
  example: "Adatum Corporation",
  placeholder: "Enter ship to name",
  clean: cleanStringInput,
});

export const sellToAddressLine1 = input({
  label: "Sell To Address Line 1",
  required: false,
  comments: "The first line of the sell to address.",
  type: "string",
  example: "192 Market Square",
  placeholder: "Enter sell to address line 1",
  clean: cleanStringInput,
});

export const shipToAddressLine1 = input({
  label: "Ship To Address Line 1",
  required: false,
  comments: "The first line of the ship to address.",
  type: "string",
  example: "192 Market Square",
  placeholder: "Enter ship to address line 1",
  clean: cleanStringInput,
});

export const currencyCode = input({
  label: "Currency Code",
  required: false,
  comments: "The currency code for the sales invoice.",
  type: "string",
  example: "USD",
  placeholder: "Enter currency code",
  clean: cleanStringInput,
});

export const email = input({
  label: "Customer Email Address",
  required: false,
  comments: "The email address for the sales invoice.",
  type: "string",
  example: "robert.townes@contoso.com",
  placeholder: "Enter email address",
  clean: cleanStringInput,
});
