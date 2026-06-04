import { input } from "@prismatic-io/spectral";
import { cleanStringInput } from "../util";

export const cancelAt = input({
  label: "Cancel At",
  type: "string",
  comments:
    "A Unix timestamp at which the subscription should cancel. If set before the current period ends, this may cause a proration if enabled.",
  example: "1735689600",
  placeholder: "Enter Unix timestamp",
  required: false,
  clean: cleanStringInput,
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
  clean: cleanStringInput,
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
  clean: cleanStringInput,
});
