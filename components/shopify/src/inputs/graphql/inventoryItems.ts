import { input } from "@prismatic-io/spectral";
import { cleanStringInput } from "../../util";
import {
  getAlldata,
  itemId,
  optionalBoolean,
  pagination,
  query,
  shopifyConnection,
} from "./common";
const cost = input({
  label: "Cost",
  type: "string",
  required: false,
  example: "1.00",
  placeholder: "Enter cost",
  comments:
    "Unit cost associated with the inventory item, the currency is the shop's default currency.",
  clean: cleanStringInput,
});
const sku = input({
  label: "SKU",
  type: "string",
  required: false,
  example: "97802837847",
  placeholder: "Enter SKU",
  comments: "The SKU (stock keeping unit) of the inventory item.",
});
const tracked = input({
  ...optionalBoolean,
  label: "Tracked",
  comments: "Whether the inventory item is tracked.",
});
export const listInventoryItemsInputs = {
  shopifyConnection,
  getAlldata,
  query,
  pagination,
};
export const getInventoryItemsInputs = {
  itemId,
  shopifyConnection,
};
export const updateInventoryItemsInputs = {
  shopifyConnection,
  itemId,
  sku,
  cost,
  tracked,
};
