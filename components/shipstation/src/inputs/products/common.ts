import { input, util } from "@prismatic-io/spectral";
import { validateJSON } from "../../util";

export const productIdInput = input({
  label: "Product ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the product.",
  placeholder: "Enter product ID",
  dataSource: "selectProducts",
  clean: util.types.toString,
});

export const productDataInput = input({
  label: "Product Data",
  type: "code",
  language: "json",
  default: JSON.stringify(
    {
      aliases: null,
      productId: 123456789,
      sku: "BEAU-000",
    },
    null,
    2,
  ),
  comments:
    "The complete data for updating the product. This call does not support partial updates.",
  clean: validateJSON,
});

export const sku = input({
  label: "SKU",
  type: "string",
  required: true,
  comments: "The stock keeping unit code assigned to the product.",
  placeholder: "Enter SKU",
  clean: util.types.toString,
});

export const productName = input({
  label: "Product Name",
  type: "string",
  required: true,
  comments: "The display name of the product to search for.",
  placeholder: "Enter product name",
  clean: util.types.toString,
});

export const productCategoryId = input({
  label: "Product Category ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the category grouping the product.",
  placeholder: "Enter product category ID",
  clean: util.types.toString,
});

export const productTypeId = input({
  label: "Product Type ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the product type classification.",
  placeholder: "Enter product type ID",
  clean: util.types.toString,
});
