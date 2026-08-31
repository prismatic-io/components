import { input } from "@prismatic-io/spectral";
import { cleanNumberInput, cleanStringInput } from "../util";
import {
  connectionInput,
  customerId,
  fieldValues,
  forwardCursorPagination,
  metadata,
  paymentId,
  priceId,
  subscriptionId,
  timeout,
} from "./common";
import { collectionMethod } from "./invoices";
export const cancelAt = input({
  label: "Cancel At",
  type: "string",
  comments:
    "A Unix timestamp at which the subscription should cancel. If set before the current period ends, this may cause a proration if enabled.",
  example: "1735689600",
  placeholder: "Enter Unix timestamp",
  required: false,
  clean: cleanNumberInput,
});
export const promotionCode = input({
  label: "Promotion Code",
  type: "string",
  comments:
    "The API ID of a promotion code to apply to the customer. The customer will have a discount applied on all recurring payments. Charges created through the API will not have the discount.",
  example: "promo_1JaOXaDtJQgcyrdSRnsI9KW5",
  placeholder: "Enter promotion code ID",
  required: false,
  clean: cleanStringInput,
});
export const quantity = input({
  label: "Quantity",
  type: "string",
  comments: "The number of units to include in the subscription.",
  example: "1",
  placeholder: "Enter quantity",
  required: false,
  clean: cleanNumberInput,
});
export const subscriptionPriceId = input({
  label: "Price ID",
  type: "string",
  comments: "The unique identifier for the price.",
  example: "price_1JaOXaDtJQgcyrdSRnsI9KW5",
  placeholder: "Enter Price ID",
  required: false,
  clean: cleanStringInput,
});
export const daysUntilDue = input({
  label: "Days Until Due",
  type: "string",
  comments: "The number of days until the payment is due.",
  example: "30",
  placeholder: "Enter number of days",
  required: false,
  clean: cleanNumberInput,
});
export const createSubscriptionInputs = {
  customerId,
  priceId,
  collectionMethod,
  quantity,
  paymentId,
  cancelAt,
  daysUntilDue,
  fieldValues,
  metadata,
  timeout,
  stripeConnection: connectionInput,
};
export const deleteSubscriptionInputs = {
  subscriptionId,
  timeout,
  stripeConnection: connectionInput,
};
export const getSubscriptionInputs = {
  subscriptionId,
  timeout,
  stripeConnection: connectionInput,
};
export const listSubscriptionsInputs = {
  timeout,
  pagination: forwardCursorPagination,
  stripeConnection: connectionInput,
};
export const updateSubscriptionInputs = {
  subscriptionId,
  subscriptionPriceId,
  quantity,
  collectionMethod,
  paymentId: {
    ...paymentId,
    dataSource: undefined,
  },
  cancelAt,
  fieldValues,
  metadata,
  timeout,
  stripeConnection: connectionInput,
};
