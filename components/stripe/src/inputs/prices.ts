import { input } from "@prismatic-io/spectral";
import { cleanAmountInput, cleanStringInput } from "../util";
import {
  connectionInput,
  currency,
  fieldValues,
  forwardCursorPagination,
  metadata,
  priceId,
  productId,
  timeout,
} from "./common";
import { active } from "./products";
export const unitPrice = input({
  label: "Unit Price",
  type: "string",
  comments:
    "The price per unit, as a whole number in the currency's smallest unit (2000 is $20.00 in USD, ¥2000 in JPY).",
  example: "2000",
  placeholder: "Enter price in a whole number (exclude decimals)",
  required: false,
  clean: cleanAmountInput,
});
export const nickname = input({
  label: "Nickname",
  type: "string",
  comments: "A brief description of the price, hidden from customers.",
  example: "Pro plan monthly",
  placeholder: "Enter nickname",
  required: false,
  clean: cleanStringInput,
});
export const recurringInterval = input({
  label: "Recurring Interval",
  type: "string",
  comments: "The billing frequency for recurring charges.",
  placeholder: "Select billing frequency",
  model: [
    { label: "Day", value: "day" },
    { label: "Week", value: "week" },
    { label: "Month", value: "month" },
    { label: "Year", value: "year" },
  ],
  required: false,
  clean: cleanStringInput,
});
export const createPriceInputs = {
  productId,
  currency,
  unitPrice,
  active,
  nickname,
  recurringInterval,
  fieldValues,
  metadata,
  timeout,
  stripeConnection: connectionInput,
};
export const getPriceInputs = {
  priceId,
  timeout,
  stripeConnection: connectionInput,
};
export const listPricesInputs = {
  timeout,
  pagination: forwardCursorPagination,
  stripeConnection: connectionInput,
};
export const updatePriceInputs = {
  priceId,
  active,
  nickname,
  fieldValues,
  metadata,
  timeout,
  stripeConnection: connectionInput,
};
