import { input, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";
import {
  additionalProperties,
  archived,
  associationsList,
  connectionInput,
  description,
  dynamicValues,
  fetchAll,
  fieldValues,
  pagination,
  timeout,
} from "./common";
export const productId = input({
  label: "Product ID",
  type: "string",
  required: true,
  placeholder: "Enter Product ID",
  dataSource: "selectProduct",
  comments: "The unique identifier of the product.",
  example: "804874",
  clean: util.types.toString,
});
export const updateProductId = input({
  label: "Product ID",
  type: "string",
  required: false,
  placeholder: "Enter Product ID",
  comments: "The unique identifier of the product.",
  example: "804874",
  dataSource: "selectProduct",
  clean: toOptionalString,
});
const productName = input({
  label: "Product Name",
  type: "string",
  required: true,
  placeholder: "Enter product name",
  comments: "The display name for the product in the product library.",
  example: "myProduct",
  clean: util.types.toString,
});
const updateProductName = input({
  label: "Product Name",
  type: "string",
  required: false,
  placeholder: "Enter product name",
  comments: "The updated display name for the product.",
  example: "myProduct",
  clean: toOptionalString,
});
export const price = input({
  label: "Price",
  type: "string",
  required: true,
  placeholder: "Enter price",
  comments: "The unit price of the product, in the account's default currency.",
  example: "80400",
  clean: util.types.toString,
});
export const updatePrice = input({
  label: "Price",
  type: "string",
  required: false,
  placeholder: "Enter price",
  comments: "The updated unit price for the product.",
  example: "80400",
  clean: toOptionalString,
});
export const unitCost = input({
  label: "Unit Cost",
  type: "string",
  required: false,
  placeholder: "Enter unit cost",
  comments: "The cost per unit used to calculate margin and profitability.",
  example: "800",
  clean: toOptionalString,
});
export const recurringBillingPeriod = input({
  label: "Recurring Billing Frequency",
  type: "string",
  required: false,
  placeholder: "Enter recurring billing period",
  comments:
    "Provide the billing frequency of the product. Specify the integer of months in between a P and M in the following format: P{integer}M",
  example: "P12M",
  clean: toOptionalString,
});
const sku = input({
  label: "Product SKU",
  type: "string",
  required: false,
  placeholder: "Enter product SKU",
  comments:
    "The stock-keeping unit code used to track the product in inventory systems.",
  example: "804874",
  clean: toOptionalString,
});
const updateSku = input({
  label: "Product SKU",
  type: "string",
  required: false,
  placeholder: "Enter product SKU",
  comments: "The updated stock-keeping unit code for the product.",
  example: "804874",
  clean: toOptionalString,
});
export const listProductsInputs = {
  hubspotConnection: connectionInput,
  additionalProperties,
  associationsList,
  archived,
  timeout,
  fetchAll,
  pagination,
};
export const createProductInputs = {
  productName,
  description,
  sku,
  price: { ...price, required: false, clean: toOptionalString },
  recurringBillingPeriod,
  unitCost,
  fieldValues,
  dynamicValues,
  timeout,
  hubspotConnection: connectionInput,
};
export const updateProductInputs = {
  productId,
  updateProductName,
  description,
  updateSku,
  updatePrice,
  recurringBillingPeriod,
  unitCost,
  fieldValues,
  dynamicValues,
  timeout,
  hubspotConnection: connectionInput,
};
export const deleteProductInputs = {
  productId,
  timeout,
  hubspotConnection: connectionInput,
};
export const getProductInputs = {
  productId: { ...productId, required: false, clean: toOptionalString },
  productName: { ...productName, required: false, clean: toOptionalString },
  additionalProperties,
  associationsList,
  archived,
  timeout,
  hubspotConnection: connectionInput,
};
