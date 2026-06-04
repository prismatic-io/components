import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../util";

export const cardNumber = input({
  label: "Card Number",
  type: "string",
  comments: "The full credit or debit card number, with no spaces or dashes.",
  example: "4242424242424242",
  placeholder: "Enter card number",
  required: true,
  clean: util.types.toString,
});

export const expMonth = input({
  label: "Expiration Month",
  type: "string",
  comments: "The two-digit expiration month of the card (01-12).",
  example: "12",
  placeholder: "Enter month (MM)",
  required: true,
  clean: util.types.toString,
});

export const expYear = input({
  label: "Expiration Year",
  type: "string",
  comments: "The four-digit expiration year of the card.",
  example: "2026",
  placeholder: "Enter year (YYYY)",
  required: true,
  clean: util.types.toString,
});

export const cvc = input({
  label: "CVC",
  type: "string",
  comments: "The card security code printed on the back of the card.",
  example: "123",
  placeholder: "Enter CVC",
  required: true,
  clean: util.types.toString,
});

export const billingCity = input({
  label: "Billing City",
  type: "string",
  comments: "The city for the billing address.",
  example: "San Francisco",
  placeholder: "Enter city",
  required: false,
  clean: cleanStringInput,
});

export const billingCountry = input({
  label: "Billing Country",
  type: "string",
  comments: "The two-letter ISO country code for the billing address.",
  example: "US",
  placeholder: "Enter country code",
  required: false,
  clean: cleanStringInput,
});

export const billingAddress1 = input({
  label: "Billing Street Address",
  type: "string",
  comments: "The street address for the billing information.",
  example: "123 Main Street",
  placeholder: "Enter street address",
  required: false,
  clean: cleanStringInput,
});

export const billingAddress2 = input({
  label: "Billing Address 2",
  type: "string",
  comments: "Additional address information for the billing address (optional).",
  example: "Suite 100",
  placeholder: "Enter apartment, suite, etc.",
  required: false,
  clean: cleanStringInput,
});

export const postalCode = input({
  label: "Billing Postal Code",
  type: "string",
  comments: "The postal code for the billing address.",
  example: "94105",
  placeholder: "Enter postal code",
  required: false,
  clean: cleanStringInput,
});

export const state = input({
  label: "Billing State",
  type: "string",
  comments: "The state or province code for the billing address.",
  example: "CA",
  placeholder: "Enter state code",
  required: false,
  clean: cleanStringInput,
});

export const billingEmail = input({
  label: "Billing Email",
  type: "string",
  comments: "The email address for the billing contact.",
  example: "billing@example.com",
  placeholder: "Enter email address",
  required: false,
  clean: cleanStringInput,
});

export const billingName = input({
  label: "Full Name",
  type: "string",
  comments: "The full name for the billing contact.",
  example: "John Doe",
  placeholder: "Enter full name",
  required: false,
  clean: cleanStringInput,
});

export const phone = input({
  label: "Billing Phone",
  type: "string",
  comments: "The phone number for the billing contact.",
  example: "18005551234",
  placeholder: "Enter phone number",
  required: false,
  clean: cleanStringInput,
});
