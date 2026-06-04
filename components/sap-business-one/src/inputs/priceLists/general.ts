import { input, util } from "@prismatic-io/spectral";

export const priceListNo = input({
  label: "Price List Number",
  type: "string",
  comments: "The unique number identifying the price list. This is an integer value.",
  example: "1",
  placeholder: "Enter price list number",
  required: true,
  clean: util.types.toString,
});

export const priceListName = input({
  label: "Price List Name",
  type: "string",
  comments: "The name of the price list.",
  example: "Retail Price List",
  placeholder: "Enter price list name",
  required: true,
  clean: util.types.toString,
});
