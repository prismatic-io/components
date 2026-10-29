import { input, util } from "@prismatic-io/spectral";
import { connectionInput } from "./common";

const productCatalogueRef = input({
  label: "Product Catalogue Ref (ID)",
  type: "string",
  required: true,
  example: "FCRG:PC:MASTER",
  placeholder: "Enter product catalogue ref",
  clean: util.types.toString,
  comments: "The reference ID (ref) of an existing product catalog",
});

const productRef = input({
  label: "Product Ref ID",
  type: "string",
  required: true,
  example: "TESTPRD",
  placeholder: "Enter product ref",
  clean: util.types.toString,
  comments: "The reference ID (ref) of the new product (must be unique)",
});

const productType = input({
  label: "Product Type",
  type: "string",
  required: true,
  example: "STANDARD",
  default: "STANDARD",
  placeholder: "Enter product type",
  clean: util.types.toString,
  comments: "The type of the product",
});

const productName = input({
  label: "Product Name",
  type: "string",
  required: true,
  example: "Widget",
  placeholder: "Enter product name",
  clean: util.types.toString,
  comments: "The name of the product (not required to be unique)",
});

const productSummary = input({
  label: "Product Summary / Description",
  type: "string",
  required: true,
  example: "Widgets: the new whatsits",
  placeholder: "Enter product summary",
  clean: util.types.toString,
  comments:
    "A short description of the product, stored as the product's summary.",
});

const gtin = input({
  label: "Global Trade Item Number (GTIN)",
  type: "string",
  required: true,
  example: "012345678905",
  placeholder: "Enter GTIN",
  clean: util.types.toString,
  comments: "The global trade number of the product",
});

const priceCurrency = input({
  label: "Price Currency",
  type: "string",
  required: true,
  example: "USD",
  placeholder: "Enter price currency",
  clean: util.types.toString,
  comments: "Type of currency the price is in (USD, YEN, GBP, etc)",
});

const priceValue = input({
  label: "Price Value",
  type: "string",
  required: true,
  example: "1300",
  placeholder: "Enter price value",
  clean: util.types.toNumber,
  comments: "The price of the product (must be a floating-point number)",
});

export const createProductInputs = {
  connection: connectionInput,
  productCatalogueRef,
  productRef,
  productType,
  productName,
  productSummary,
  gtin,
  priceCurrency,
  priceValue,
};
