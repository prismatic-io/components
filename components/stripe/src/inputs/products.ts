import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../util";

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
  comments: "When true, the object is currently active and available on the platform.",
  required: true,
  clean: util.types.toBool,
});

export const productCaption = input({
  label: "Product Caption",
  type: "string",
  comments:
    "A short one-line description of the product, meant to be displayable to the customer. May only be set if type=good.",
  example: "Premium quality product",
  placeholder: "Enter product caption",
  required: false,
  clean: cleanStringInput,
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
