import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../util";

export const customerName = input({
  label: "Name",
  type: "string",
  comments: "The customer's full name, displayed in the Stripe Dashboard and on receipts.",
  example: "John Doe",
  placeholder: "Enter customer name",
  required: false,
  clean: cleanStringInput,
});

export const customerPhone = input({
  label: "Phone",
  type: "string",
  comments:
    "The customer's phone number in E.164 format. Used for SMS receipts and Strong Customer Authentication.",
  example: "18005554545",
  placeholder: "Enter phone number",
  required: false,
  clean: cleanStringInput,
});

export const customerAddress1 = input({
  label: "Address Line 1",
  type: "string",
  comments:
    "The first line of the customer's billing address, typically the street number and name.",
  example: "123 Main Street",
  placeholder: "Enter street address",
  required: false,
  clean: cleanStringInput,
});

export const customerAddress2 = input({
  label: "Address Line 2",
  type: "string",
  comments:
    "The second line of the customer's billing address, used for apartment, suite, or unit numbers.",
  example: "Suite 3",
  placeholder: "Enter apartment, suite, etc.",
  required: false,
  clean: cleanStringInput,
});

export const customerCity = input({
  label: "City",
  type: "string",
  comments: "The city portion of the customer's billing address.",
  example: "San Francisco",
  placeholder: "Enter city",
  required: false,
  clean: cleanStringInput,
});

export const customerCountry = input({
  label: "Country",
  type: "string",
  comments: "The two-letter ISO 3166-1 alpha-2 country code for the customer's billing address.",
  example: "US",
  placeholder: "Enter country code",
  required: false,
  clean: cleanStringInput,
});

export const customerPostal = input({
  label: "Postal Code",
  type: "string",
  comments: "The postal or ZIP code portion of the customer's billing address.",
  example: "94105",
  placeholder: "Enter postal code",
  required: false,
  clean: cleanStringInput,
});

export const customerState = input({
  label: "State",
  type: "string",
  comments:
    "The state, province, or region code for the customer's billing address (e.g., `CA` for California).",
  example: "CA",
  placeholder: "Enter state code",
  required: false,
  clean: cleanStringInput,
});

export const customerBalance = input({
  label: "Balance",
  type: "string",
  comments: "The starting balance of the customer in cents (e.g., 5000 = $50.00).",
  example: "5000",
  placeholder: "Enter balance amount in cents",
  required: false,
  clean: cleanStringInput,
});

export const customerPaymentId = input({
  label: "Default Payment Method ID",
  type: "string",
  comments: "The unique identifier of the customer's default payment method.",
  example: "pm_1JaiTbDtJQgcyrdS08EmyHHe",
  placeholder: "Enter Payment Method ID",
  required: false,
  clean: cleanStringInput,
});

export const customerDescription = input({
  label: "Description",
  type: "string",
  comments: "An arbitrary description of the customer for internal reference.",
  example: "Premium customer account",
  placeholder: "Enter description",
  required: false,
  clean: cleanStringInput,
});

export const customerEmail = input({
  label: "Email",
  type: "string",
  comments:
    "The customer's email address. Used for receipts, invoices, and other Stripe communications.",
  example: "customer@example.com",
  placeholder: "Enter email address",
  required: false,
  clean: cleanStringInput,
});

export const customerMetadata = input({
  label: "Metadata",
  type: "string",
  comments:
    "Set of key-value pairs that can be attached to the customer. This can be useful for storing additional information about the object in a structured format.",
  collection: "keyvaluelist",
  required: false,
});

export const customerTaxExempt = input({
  label: "Customer Tax Exempt",
  type: "boolean",
  comments: "When true, marks the customer as exempt from tax calculations.",
  required: false,
  clean: util.types.toBool,
});
