import { input } from "@prismatic-io/spectral";
import { cleanObjectInput, cleanStringInput } from "../util";

export const successUrl = input({
  label: "Success URL",
  type: "string",
  comments: "The URL the customer will be directed to after the payment is successful.",
  example: "https://example.com/success",
  placeholder: "Enter success URL",
  required: false,
  clean: cleanStringInput,
});

export const cancelUrl = input({
  label: "Cancel URL",
  type: "string",
  comments: "The URL the customer will be directed to if they decide to cancel payment.",
  example: "https://example.com/cancel",
  placeholder: "Enter cancel URL",
  required: false,
  clean: cleanStringInput,
});

export const mode = input({
  label: "Mode",
  type: "string",
  model: [
    { label: "Payment", value: "payment" },
    { label: "Setup", value: "setup" },
    { label: "Subscription", value: "subscription" },
  ],
  comments:
    "The behavior of the Checkout Session: `payment` for one-time charges, `setup` to collect a payment method for future use, or `subscription` for recurring billing.",
  placeholder: "Select mode",
  default: "payment",
  required: true,
  clean: cleanStringInput,
});

export const lineItems = input({
  label: "Line Items",
  type: "code",
  language: "json",
  required: true,
  comments: "JSON array of line items to be purchased.",
  example: JSON.stringify([{ price: "price_H5ggYwtDq4fbrJ", quantity: 2 }]),
  clean: cleanObjectInput,
});

export const clientReferenceId = input({
  label: "Client Reference ID",
  type: "string",
  comments:
    "A unique string to reference the Checkout Session. This can be a customer ID, a cart ID, or similar, and can be used to reconcile the session with your internal systems.",
  example: "order_12345",
  placeholder: "Enter reference ID",
  required: false,
  clean: cleanStringInput,
});
