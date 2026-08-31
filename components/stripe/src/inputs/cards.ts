import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../util";
import {
  connectionInput,
  cursorPagination,
  customerId,
  metadata,
  paymentId,
  timeout,
} from "./common";
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
  clean: util.types.toNumber,
});
export const expYear = input({
  label: "Expiration Year",
  type: "string",
  comments: "The four-digit expiration year of the card.",
  example: "2026",
  placeholder: "Enter year (YYYY)",
  required: true,
  clean: util.types.toNumber,
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
  label: "City",
  type: "string",
  comments:
    "The city portion of the card's billing address, used for address verification.",
  example: "San Francisco",
  placeholder: "Enter city",
  required: false,
  clean: cleanStringInput,
});
export const billingCountry = input({
  label: "Country",
  type: "string",
  comments: "The two-letter ISO country code for the billing address.",
  example: "US",
  placeholder: "Enter country code",
  required: false,
  clean: cleanStringInput,
});
export const billingAddress1 = input({
  label: "Street Address",
  type: "string",
  comments:
    "The first line of the card's billing address, typically the street number and name.",
  example: "123 Main Street",
  placeholder: "Enter street address",
  required: false,
  clean: cleanStringInput,
});
export const billingAddress2 = input({
  label: "Street Address Line 2",
  type: "string",
  comments:
    "Additional address information for the billing address (optional).",
  example: "Suite 100",
  placeholder: "Enter apartment, suite, etc.",
  required: false,
  clean: cleanStringInput,
});
export const postalCode = input({
  label: "Zip/Postal Code",
  type: "string",
  comments:
    "The postal or ZIP code portion of the card's billing address, used for address verification.",
  example: "94105",
  placeholder: "Enter postal code",
  required: false,
  clean: cleanStringInput,
});
export const state = input({
  label: "State/Province",
  type: "string",
  comments: "The state or province code for the billing address.",
  example: "CA",
  placeholder: "Enter state code",
  required: false,
  clean: cleanStringInput,
});
export const billingEmail = input({
  label: "Email",
  type: "string",
  comments:
    "The email address Stripe uses for billing receipts and correspondence about this card.",
  example: "billing@example.com",
  placeholder: "Enter email address",
  required: false,
  clean: cleanStringInput,
});
export const billingName = input({
  label: "Full Name",
  type: "string",
  comments:
    "The cardholder name as it appears on the card, used for verification.",
  example: "John Doe",
  placeholder: "Enter full name",
  required: false,
  clean: cleanStringInput,
});
export const phone = input({
  label: "Phone",
  type: "string",
  comments:
    "The phone number associated with the billing contact, including country code.",
  example: "18005551234",
  placeholder: "Enter phone number",
  required: false,
  clean: cleanStringInput,
});
export const cardBillingAddress = structuredObjectInput({
  label: "Billing Address",
  comments: "Billing street, city, state, postal code, and country.",
  inputs: {
    billingAddress1,
    billingAddress2,
    billingCity,
    state,
    postalCode,
    billingCountry,
  },
});
export const cardContactInfo = structuredObjectInput({
  label: "Name & Contact Information",
  comments: "Full name, email, and phone contact details.",
  inputs: { billingName, billingEmail, phone },
});
export const attachCardInputs = {
  customerId,
  paymentId,
  timeout,
  stripeConnection: connectionInput,
};
export const createCardInputs = {
  customerId,
  cardNumber,
  expMonth,
  expYear,
  cvc,
  billingAddress: cardBillingAddress,
  contactInfo: cardContactInfo,
  metadata,
  timeout,
  stripeConnection: connectionInput,
};
export const detachCardInputs = {
  timeout,
  customerId,
  paymentId,
  stripeConnection: connectionInput,
};
export const getCardInputs = {
  timeout,
  customerId,
  paymentId,
  stripeConnection: connectionInput,
};
export const listCardsInputs = {
  timeout,
  customerId,
  pagination: cursorPagination,
  stripeConnection: connectionInput,
};
export const updateCardInputs = {
  customerId,
  paymentId: {
    ...paymentId,
    required: true,
    clean: util.types.toString,
  },
  expMonth,
  expYear,
  billingAddress: cardBillingAddress,
  contactInfo: cardContactInfo,
  metadata,
  stripeConnection: connectionInput,
  timeout,
};
