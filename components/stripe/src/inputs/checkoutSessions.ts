import { input, util } from "@prismatic-io/spectral";
import { cleanObjectInput, cleanStringInput } from "../util";
import {
  connectionInput,
  cursorPagination,
  customerId,
  fetchAll,
  metadata,
  timeout,
} from "./common";
import { customerEmail } from "./customers";
export const successUrl = input({
  label: "Success URL",
  type: "string",
  comments:
    "The URL the customer will be directed to after the payment is successful.",
  example: "https://example.com/success",
  placeholder: "Enter success URL",
  required: false,
  clean: cleanStringInput,
});
export const cancelUrl = input({
  label: "Cancel URL",
  type: "string",
  comments:
    "The URL the customer will be directed to if they decide to cancel payment.",
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
  clean: util.types.toString,
});
export const lineItems = input({
  label: "Line Items",
  type: "code",
  language: "json",
  placeholder: "Enter line items",
  required: true,
  comments: "JSON array of line items to be purchased.",
  example: JSON.stringify([{ price: "price_H5ggYwtDq4fbrJ", quantity: 2 }]),
  clean: util.types.toObject,
});
export const clientReferenceId = input({
  label: "Client Reference ID",
  type: "string",
  comments:
    "A unique string to reference the Checkout Session. This can be a customer ID, a cart ID, or similar, and can be used to reconcile the session with internal systems.",
  example: "order_12345",
  placeholder: "Enter reference ID",
  required: false,
  clean: cleanStringInput,
});
export const bodyParams = input({
  label: "Body Params",
  type: "code",
  language: "json",
  comments: "More parameters to pass to the request.",
  placeholder: "Enter additional request parameters",
  required: false,
  example: JSON.stringify({ customer: "cus_123456" }, null, 2),
  clean: cleanObjectInput,
});
export const sessionId = input({
  label: "Session ID",
  type: "string",
  comments: "The unique identifier for the Checkout Session.",
  example: "cs_test_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
  placeholder: "Enter Session ID",
  required: true,
  clean: util.types.toString,
});
export const createCheckoutSessionInputs = {
  mode,
  lineItems,
  customerEmail: {
    ...customerEmail,
    comments: "The email of the customer to create the checkout session for.",
  },
  customerId: {
    ...customerId,
    comments: "The ID of the customer to create the checkout session for.",
  },
  clientReferenceId,
  successUrl,
  cancelUrl,
  bodyParams,
  timeout,
  stripeConnection: connectionInput,
};
export const expireCheckoutSessionInputs = {
  sessionId,
  timeout,
  stripeConnection: connectionInput,
};
export const getCheckoutSessionInputs = {
  sessionId,
  timeout,
  stripeConnection: connectionInput,
};
export const listCheckoutSessionLineItemsInputs = {
  sessionId,
  pagination: cursorPagination,
  timeout,
  stripeConnection: connectionInput,
};
export const listCheckoutSessionsInputs = {
  fetchAll,
  pagination: cursorPagination,
  timeout,
  stripeConnection: connectionInput,
};
export const updateCheckoutSessionInputs = {
  sessionId,
  metadata,
  timeout,
  stripeConnection: connectionInput,
};
