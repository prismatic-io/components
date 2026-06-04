import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../../utils";

export const displayName = input({
  label: "Display Name",
  example: "Adatum Corporation",
  comments: "Specifies the customer's name.",
  placeholder: "Enter display name",
  required: true,
  type: "string",
  clean: util.types.toString,
});

export const customerType = input({
  label: "Customer Type",
  type: "string",
  example: "Company",
  comments: "Specifies the type of customer.",
  placeholder: "Select customer type",
  model: ["Company", "Person"].map((value) => ({ value, label: value })),
  required: true,
  clean: util.types.toString,
});

export const addressLine1 = input({
  label: "Address Line 1",
  type: "string",
  comments: "Specifies the first line of the customer's address.",
  example: "192 Market Square",
  placeholder: "Enter address line 1",
  required: true,
  clean: util.types.toString,
});

export const addressLine2 = input({
  label: "Address Line 2",
  type: "string",
  comments: "Specifies the second line of the customer's address.",
  example: "Suite 200",
  placeholder: "Enter address line 2",
  required: false,
  clean: cleanStringInput,
});

export const city = input({
  label: "City",
  type: "string",
  comments: "Specifies the city of the customer's address.",
  example: "Atlanta",
  placeholder: "Enter city",
  required: true,
  clean: util.types.toString,
});

export const state = input({
  label: "State",
  type: "string",
  comments: "Specifies the state of the customer's address.",
  example: "GA",
  placeholder: "Enter state",
  required: true,
  clean: util.types.toString,
});

export const country = input({
  label: "Country",
  type: "string",
  comments: "Specifies the country of the customer's address.",
  example: "US",
  placeholder: "Enter country",
  required: true,
  clean: util.types.toString,
});

export const postalCode = input({
  label: "Postal Code",
  type: "string",
  comments: "Specifies the postal code of the customer's address.",
  example: "31772",
  placeholder: "Enter postal code",
  required: true,
  clean: util.types.toString,
});

export const phoneNumber = input({
  label: "Phone Number",
  type: "string",
  comments: "Specifies the customer's phone number.",
  example: "+1 555-555-5555",
  placeholder: "Enter phone number",
  required: false,
  clean: cleanStringInput,
});

export const email = input({
  label: "Email",
  type: "string",
  comments: "Specifies the customer's email address.",
  example: "robert.townes@contoso.com",
  placeholder: "Enter email address",
  required: true,
  clean: util.types.toString,
});

export const website = input({
  label: "Website",
  type: "string",
  comments: "Specifies the customer's website.",
  example: "www.example.com",
  placeholder: "Enter website",
  required: false,
  clean: cleanStringInput,
});

export const taxLiable = input({
  label: "Tax Liable",
  comments: "When true, the customer is liable for sales tax.",
  type: "boolean",
  required: true,
  clean: util.types.toBool,
});

export const taxAreaId = input({
  label: "Tax Area Id",
  type: "string",
  comments: "Specifies which tax area the customer belongs to.",
  example: "90196a90-44e3-ea11-bb43-000d3a2feca1",
  placeholder: "Enter tax area ID",
  required: true,
  clean: util.types.toString,
});

export const taxRegistrationNumber = input({
  label: "Tax Registration Number",
  type: "string",
  comments: "Specifies the customer's tax registration number.",
  placeholder: "Enter tax registration number",
  required: false,
  clean: cleanStringInput,
});

export const currencyId = input({
  label: "Currency Id",
  type: "string",
  comments: "Specifies the currency used by the customer.",
  example: "5d115c9c-44e3-ea11-bb43-000d3a2feca1",
  placeholder: "Enter currency ID",
  required: true,
  clean: util.types.toString,
});

export const currencyCode = input({
  label: "Currency Code",
  type: "string",
  comments: "Specifies the currency code used by the customer.",
  example: "USD",
  placeholder: "Enter currency code",
  required: true,
  clean: util.types.toString,
});

export const paymentTermsId = input({
  label: "Payment Terms Id",
  type: "string",
  comments: "Specifies the payment terms used by the customer.",
  example: "04a5738a-44e3-ea11-bb43-000d3a2feca1",
  placeholder: "Enter payment terms ID",
  required: true,
  clean: util.types.toString,
});

export const shipmentMethodId = input({
  label: "Shipment Method Id",
  type: "string",
  comments: "Specifies the shipment method used by the customer.",
  example: "5d115c9c-44e3-ea11-bb43-000d3a2feca1",
  placeholder: "Enter shipment method ID",
  required: true,
  clean: util.types.toString,
});

export const paymentMethodId = input({
  label: "Payment Method Id",
  type: "string",
  comments: "Specifies the payment method used by the customer.",
  example: "3b196a90-44e3-ea11-bb43-000d3a2feca1",
  placeholder: "Enter payment method ID",
  required: true,
  clean: util.types.toString,
});

export const blocked = input({
  label: "Actions Blocked",
  comments:
    "Specifies which transactions with the customer cannot be posted. " +
    "It can be empty, 'Ship', 'Invoice' or 'All'",
  type: "string",
  example: "Ship",
  placeholder: "Select blocked status",
  model: ["Ship", "Invoice", "All"].map((value) => ({ value, label: value })),
  required: false,
  clean: cleanStringInput,
});
