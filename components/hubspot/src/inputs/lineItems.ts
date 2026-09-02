import { input, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";
import {
  additionalProperties,
  archived,
  associationsList,
  connectionInput,
  dynamicValues,
  fetchAll,
  fieldValues,
  pagination,
  timeout,
} from "./common";
import {
  price,
  productId,
  recurringBillingPeriod,
  updatePrice,
  updateProductId,
} from "./products";
const lineItemId = input({
  label: "Line Item ID",
  type: "string",
  required: true,
  placeholder: "Enter Line Item ID",
  dataSource: "selectLineItem",
  comments: "The unique identifier of the line item.",
  example: "78349093",
  clean: util.types.toString,
});
const lineItemName = input({
  label: "Name",
  type: "string",
  required: true,
  placeholder: "Enter name",
  comments:
    "A descriptive name for the line item, displayed on quotes and invoices.",
  example: "My Line Item",
  clean: util.types.toString,
});
const updateLineItemName = input({
  label: "Name",
  type: "string",
  required: false,
  placeholder: "Enter name",
  comments: "The updated name for the line item.",
  example: "My line Item",
  clean: toOptionalString,
});
const quantity = input({
  label: "Quantity",
  type: "string",
  required: false,
  placeholder: "Enter quantity",
  comments: "The quantity of product in the line item.",
  example: "80",
  clean: toOptionalString,
});
const recurringBillingFrequency = input({
  label: "Recurring Billing Monthly Rate",
  type: "string",
  required: false,
  comments:
    "How often the line item is billed: monthly, quarterly, semi-annually, annually, or every two or three years.",
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
  clean: toOptionalString,
});
export const listLineItemsInputs = {
  hubspotConnection: connectionInput,
  archived,
  additionalProperties,
  associationsList,
  timeout,
  fetchAll,
  pagination,
};
export const createLineItemInputs = {
  lineItemName,
  productId,
  recurringBillingPeriod,
  recurringBillingFrequency,
  quantity,
  price,
  fieldValues,
  dynamicValues,
  timeout,
  hubspotConnection: connectionInput,
};
export const updateLineItemInputs = {
  lineItemId,
  updateLineItemName,
  updateProductId,
  recurringBillingPeriod,
  recurringBillingFrequency,
  quantity,
  updatePrice,
  fieldValues,
  dynamicValues,
  timeout,
  hubspotConnection: connectionInput,
};
export const deleteLineItemInputs = {
  lineItemId,
  timeout,
  hubspotConnection: connectionInput,
};
export const getLineItemInputs = {
  lineItemId: { ...lineItemId, required: false, clean: toOptionalString },
  lineItemName: { ...lineItemName, required: false, clean: toOptionalString },
  additionalProperties,
  associationsList,
  archived,
  timeout,
  hubspotConnection: connectionInput,
};
