import { input } from "@prismatic-io/spectral";
import { cleanStringInput } from "../util";

export const unitPrice = input({
  label: "Unit Price",
  type: "string",
  comments: "The price per unit in cents.",
  example: "2000",
  placeholder: "Enter price in cents",
  required: false,
  clean: cleanStringInput,
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
