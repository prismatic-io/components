import { input, util } from "@prismatic-io/spectral";
import { BOOLEAN_INPUT_MODEL } from "../../constants";
import { cleanBooleanInput, cleanNumberInput, cleanStringInput } from "../../utils";

export const itemId = input({
  label: "Item Id",
  comments: "The id of the item.",
  example: "e21a6a90-44e3-ea11-bb43-000d3a2feca1",
  placeholder: "e21a6a90-44e3-ea11-bb43-000d3a2feca1",
  required: true,
  type: "string",
  dataSource: "listItems",
  clean: util.types.toString,
});

export const itemType = input({
  label: "Type",
  comments: "The type of the item.",
  example: "Inventory",
  placeholder: "Inventory",
  model: ["Inventory", "Non-Inventory", "Service"].map((value) => ({
    value,
    label: value,
  })),
  required: false,
  type: "string",
  clean: cleanStringInput,
});

export const itemCategoryId = input({
  label: "Item Category Id",
  comments: "The id of the item category in the item.",
  example: "e21a6a90-44e3-ea11-bb43-000d3a2feca1",
  placeholder: "e21a6a90-44e3-ea11-bb43-000d3a2feca1",
  required: false,
  type: "string",
  clean: cleanStringInput,
});

export const itemCategoryCode = input({
  label: "Item Category Code",
  comments: "The code of the item category in the item.",
  example: "TABLE",
  placeholder: "TABLE",
  required: false,
  type: "string",
  clean: cleanStringInput,
});

export const itemIsBlocked = input({
  label: "Blocked",
  comments:
    "Specifies that entries cannot be posted to the item. True indicates account is blocked and posting is not allowed.",
  required: false,
  default: "false",
  model: BOOLEAN_INPUT_MODEL,
  type: "string",
  clean: cleanBooleanInput,
});

export const gtin = input({
  label: "Global Trade Item Number",
  comments: "The Global Trade Item Number (GTIN) of the item.",
  example: "1234567890123",
  placeholder: "1234567890123",
  required: false,
  type: "string",
  clean: cleanStringInput,
});

export const unitPrice = input({
  label: "Unit Price",
  comments: "The unit price of the item.",
  example: "1000.8",
  placeholder: "1000.8",
  required: false,
  type: "string",
  clean: cleanNumberInput,
});

export const priceIncludesTax = input({
  label: "Price Includes Tax",
  comments: "Specifies whether the price includes tax.",
  default: "false",
  model: BOOLEAN_INPUT_MODEL,
  required: false,
  type: "string",
  clean: cleanBooleanInput,
});

export const unitCost = input({
  label: "Unit Cost",
  comments: "The unit cost of the item.",
  example: "780.7",
  placeholder: "780.7",
  required: false,
  type: "string",
  clean: cleanNumberInput,
});

export const taxGroupId = input({
  label: "Tax Group Id",
  comments: "The id of the tax group in the item.",
  example: "9f196a90-44e3-ea11-bb43-000d3a2feca1",
  placeholder: "9f196a90-44e3-ea11-bb43-000d3a2feca1",
  required: false,
  type: "string",
  clean: cleanStringInput,
});

export const taxGroupCode = input({
  label: "Tax Group Code",
  comments: "The code of the tax group in the item.",
  example: "FURNITURE",
  placeholder: "FURNITURE",
  required: false,
  type: "string",
  clean: cleanStringInput,
});

export const baseUnitOfMeasureId = input({
  label: "Base Unit Of Measure Id",
  comments: "Specifies the ID of the unit of measure.",
  example: "5ca6738a-44e3-ea11-bb43-000d3a2feca1",
  placeholder: "5ca6738a-44e3-ea11-bb43-000d3a2feca1",
  required: false,
  type: "string",
  clean: cleanStringInput,
});

export const baseUnitOfMeasureCode = input({
  label: "Base Unit Of Measure Code",
  comments: "The item's base unit of measure code.",
  example: "PCS",
  placeholder: "PCS",
  required: false,
  type: "string",
  clean: cleanStringInput,
});
