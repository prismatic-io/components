import { input } from "@prismatic-io/spectral";

export const lineItemId = input({
  label: "Line Item ID",
  type: "string",
  required: true,
  placeholder: "Enter Line Item ID",
  dataSource: "selectLineItem",
  comments: "The unique identifier of the line item.",
  example: "78349093",
});

export const lineItemName = input({
  label: "Name",
  type: "string",
  required: true,
  comments: "The name of the line item.",
  example: "My Line Item",
});

export const updateLineItemName = input({
  label: "Name",
  type: "string",
  required: false,
  comments: "The name of the line item.",
  example: "My line Item",
});

export const quantity = input({
  label: "Quantity",
  type: "string",
  required: false,
  comments: "The quantity of product in the line item.",
  example: "80",
});

export const recurringBillingFrequency = input({
  label: "Recurring Billing Monthly Rate",
  type: "string",
  required: false,
  comments: "The quantity of product in the line item.",
  model: [
    {
      label: "Monthly",
      value: "monthly",
    },
    {
      label: "Quarterly",
      value: "quarterly",
    },
    {
      label: "Semi-Annually",
      value: "per_six_months",
    },
    {
      label: "Annually",
      value: "annually",
    },
    {
      label: "Every Two Years",
      value: "per_two_years",
    },
    {
      label: "Every Three years",
      value: "per_three_years",
    },
  ],
});
