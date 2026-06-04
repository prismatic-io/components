import { input, util } from "@prismatic-io/spectral";

export const title = input({
  label: "Title",
  type: "string",
  required: true,
  example: "Classic T-shirt",
  placeholder: "Enter product title",
  comments: "The title of the product.",
  clean: util.types.toString,
});

export const body = input({
  label: "Body HTML",
  type: "string",
  required: false,
  example: "<strong>Try our classic fit!</strong>",
  placeholder: "Enter HTML description",
  comments: "HTML-formatted description displayed with the product information.",
  clean: util.types.toString,
});

export const vendor = input({
  label: "Vendor",
  type: "string",
  required: true,
  example: "Burton inc.",
  placeholder: "Enter vendor name",
  comments: "The vendor of the product.",
  clean: util.types.toString,
});

export const productType = input({
  label: "Product Type",
  type: "string",
  required: true,
  example: "T-shirt",
  placeholder: "Enter product type",
  comments: "The type of product.",
  clean: util.types.toString,
});

export const productStatus = input({
  label: "Product Status",
  type: "string",
  required: false,
  model: [
    { label: "Draft", value: "draft" },
    { label: "Active", value: "active" },
  ],
  comments: "The status of the product.",
  placeholder: "Select product status",
  clean: util.types.toString,
});

export const imageUrl = input({
  label: "Image URL",
  type: "string",
  required: false,
  example: "https://example.com/images/product.jpg",
  placeholder: "Enter image URL",
  comments: "URL of the product image.",
  clean: util.types.toString,
});
