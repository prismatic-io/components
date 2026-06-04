import { input, util } from "@prismatic-io/spectral";
import { LIST_VARIANTS_DATASOURCE_REFERENCE } from "../../constants";
import { cleanStringInput } from "../../util";

export const variantId = input({
  label: "Product Variant ID",
  type: "string",
  required: true,
  comments: "The unique ID of the product variant.",
  example: "39072856",
  placeholder: "Enter variant ID",
  clean: util.types.toString,
  dataSource: LIST_VARIANTS_DATASOURCE_REFERENCE,
});

export const variantTitle = input({
  label: "Variant Title",
  type: "string",
  required: true,
  example: "Yellow",
  placeholder: "Enter variant title",
  comments: "The variant title in relation to the base product.",
  clean: util.types.toString,
});

export const price = input({
  label: "Price",
  type: "string",
  required: true,
  example: "19.99",
  placeholder: "Enter price",
  comments: "The price of the variant.",
  clean: util.types.toString,
});

export const updateVariantTitle = input({
  label: "Variant Title",
  type: "string",
  required: false,
  example: "Yellow",
  placeholder: "Enter variant title",
  comments: "The variant title in relation to the base product.",
  clean: cleanStringInput,
});

export const weight = input({
  label: "Weight",
  type: "string",
  required: false,
  example: "24.00",
  placeholder: "Enter weight",
  comments: "The weight of the variant in pounds (lbs).",
  clean: util.types.toString,
});
