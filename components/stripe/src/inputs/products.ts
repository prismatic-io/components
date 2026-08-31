import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput, cleanStringListInput } from "../util";
import {
  connectionInput,
  description,
  fieldValues,
  forwardCursorPagination,
  metadata,
  productId,
  timeout,
} from "./common";
export const productName = input({
  label: "Product Name",
  type: "string",
  comments: "The display name shown to customers for the product.",
  example: "Premium Subscription",
  placeholder: "Enter product name",
  required: true,
  clean: util.types.toString,
});
export const updateProductName = input({
  label: "Product Name",
  type: "string",
  comments: "The display name shown to customers for the product.",
  example: "Premium Subscription",
  placeholder: "Enter product name",
  required: false,
  clean: cleanStringInput,
});
export const productImages = input({
  label: "Product Images",
  type: "string",
  collection: "valuelist",
  comments: "For each list item, provide a URL for the image of the product.",
  example: "https://example.com/images/product.jpg",
  placeholder: "Enter image URL",
  required: false,
  clean: cleanStringListInput,
});
export const productType = input({
  label: "Product Type",
  type: "string",
  comments: "The category that classifies the product.",
  model: [
    { label: "Service", value: "service" },
    { label: "Good", value: "good" },
  ],
  placeholder: "Select product type",
  required: false,
  clean: cleanStringInput,
});
export const active = input({
  label: "Active",
  type: "boolean",
  comments:
    "When true, the object is currently active and available on the platform.",
  required: true,
  clean: util.types.toBool,
});
export const shippable = input({
  label: "Shippable",
  type: "boolean",
  comments: "When true, this product can be shipped (i.e., physical goods).",
  required: false,
  clean: util.types.toBool,
});
export const productUrl = input({
  label: "Product URL",
  type: "string",
  comments:
    "The URL of a publicly-accessible webpage for this product. May only be set if type=good.",
  example: "https://example.com/products/premium",
  placeholder: "Enter product URL",
  required: false,
  clean: cleanStringInput,
});
export const createProductInputs = {
  productName,
  productType,
  productUrl,
  shippable,
  active,
  description,
  productImages,
  metadata,
  fieldValues,
  timeout,
  stripeConnection: connectionInput,
};
export const deleteProductInputs = {
  productId,
  timeout,
  stripeConnection: connectionInput,
};
export const getProductInputs = {
  productId,
  timeout,
  stripeConnection: connectionInput,
};
export const listProductsInputs = {
  timeout,
  pagination: forwardCursorPagination,
  stripeConnection: connectionInput,
};
export const updateProductInputs = {
  productId,
  updateProductName,
  productUrl,
  shippable,
  active,
  description,
  productImages,
  metadata,
  fieldValues,
  timeout,
  stripeConnection: connectionInput,
};
