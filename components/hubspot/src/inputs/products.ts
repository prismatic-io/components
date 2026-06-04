import { input } from "@prismatic-io/spectral";

export const productId = input({
  label: "Product ID",
  type: "string",
  required: true,
  placeholder: "Enter Product ID",
  dataSource: "selectProduct",
  comments: "The unique identifier of the product.",
  example: "804874",
});

export const updateProductId = input({
  label: "Product ID",
  type: "string",
  required: false,
  placeholder: "Enter Product ID",
  comments: "The unique identifier of the product.",
  example: "804874",
  dataSource: "selectProduct",
});

export const productName = input({
  label: "Product Name",
  type: "string",
  required: true,
  comments: "The name of the product.",
  example: "myProduct",
});

export const updateProductName = input({
  label: "Product Name",
  type: "string",
  required: false,
  comments: "The name of the product.",
  example: "myProduct",
});

export const price = input({
  label: "Price",
  type: "string",
  required: true,
  comments: "The price of the product.",
  example: "80400",
});

export const updatePrice = input({
  label: "Price",
  type: "string",
  required: false,
  comments: "The price of the product.",
  example: "80400",
});

export const unitCost = input({
  label: "Unit Cost",
  type: "string",
  required: false,
  comments: "The unit cost of the product.",
  example: "800",
});

export const recurringBillingPeriod = input({
  label: "Recurring Billing Frequency",
  type: "string",
  required: false,
  comments:
    "Provide the billing frequency of the product. Specify the integer of months in between a P and M in the following format: P{integer}M",
  example: "P12M",
});

export const sku = input({
  label: "Product SKU",
  type: "string",
  required: false,
  comments: "The SKU of the product.",
  example: "804874",
});

export const updateSku = input({
  label: "Product SKU",
  type: "string",
  required: false,
  comments: "The SKU of the product.",
  example: "804874",
});
