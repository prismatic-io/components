import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../util";
import {
  connectionInput,
  description,
  fieldValues,
  modifiedAfter,
  notes,
  purchaseTaxType,
  where,
} from "./common";

export const itemId = input({
  label: "Item ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the item.",
  example: "example-e40f-414a-8f95-ce6a63196e1a",
  placeholder: "Enter item ID",
  dataSource: "selectItem",
  clean: util.types.toString,
});

export const itemCode = input({
  label: "Item Code",
  type: "string",
  required: true,
  comments: "A user-defined code that identifies the item.",
  example: "Untracked Item",
  placeholder: "Enter item code",
  clean: util.types.toString,
});

export const purchaseDescription = input({
  label: "Purchase Description",
  type: "string",
  required: false,
  comments: "A summary shown on purchase transactions for the item.",
  example: "This is an example description",
  placeholder: "Enter purchase description",
  clean: cleanStringInput,
});

export const purchaseUnitPrice = input({
  label: "Purchase Unit Price",
  type: "string",
  required: false,
  comments: "The unit price applied when the item is purchased.",
  example: "800",
  placeholder: "Enter purchase unit price",
  clean: cleanStringInput,
});

export const purchaseAccountCode = input({
  label: "Purchase Account Code",
  type: "string",
  required: false,
  comments: "The account code used for purchases of the item.",
  example: "200",
  placeholder: "Enter purchase account code",
  clean: cleanStringInput,
});

export const salesTaxType = input({
  label: "Sales Tax Type",
  type: "string",
  required: false,
  comments:
    "The tax type applied to sales of the item. Choose a value from the [Xero tax types](https://developer.xero.com/documentation/api/accounting/types#tax-types).",
  example: "NONE",
  placeholder: "Enter sales tax type",
  clean: cleanStringInput,
});

export const salesUnitPrice = input({
  label: "Sales Unit Price",
  type: "string",
  required: false,
  comments: "The unit price applied when the item is sold.",
  example: "50.69",
  placeholder: "Enter sales unit price",
  clean: cleanStringInput,
});

export const salesAccountCode = input({
  label: "Sales Account Code",
  type: "string",
  required: false,
  comments: "The account code used for sales of the item.",
  example: "200",
  placeholder: "Enter sales account code",
  clean: cleanStringInput,
});

export const itemName = input({
  label: "Item Name",
  type: "string",
  required: false,
  comments: "The display name of the item.",
  example: "Example Name",
  placeholder: "Enter item name",
  clean: cleanStringInput,
});

export const inventoryAssetAccountCode = input({
  label: "Inventory Asset Account Code",
  type: "string",
  required: false,
  comments: "The account code used to track the inventory asset.",
  example: "200",
  placeholder: "Enter inventory asset account code",
  clean: cleanStringInput,
});

export const isSold = input({
  label: "Is Sold",
  type: "boolean",
  required: false,
  comments: "When true, the item is available to sell.",
  placeholder: "Enter is sold",
  clean: util.types.toBool,
});

export const isPurchased = input({
  label: "Is Purchased",
  type: "boolean",
  required: false,
  comments: "When true, the item is available to purchase.",
  placeholder: "Enter is purchased",
  clean: util.types.toBool,
});

export const addNoteToItemInputs = {
  xeroConnection: connectionInput,
  itemId,
  notes,
};

export const createItemInputs = {
  xeroConnection: connectionInput,
  itemCode,
  description,
  purchaseDescription,
  purchaseUnitPrice,
  purchaseAccountCode,
  purchaseTaxType,
  salesUnitPrice,
  salesAccountCode,
  itemName,
  salesTaxType,
  inventoryAssetAccountCode,
  isSold,
  isPurchased,
};

export const deleteItemInputs = {
  xeroConnection: connectionInput,
  itemId,
};

export const getItemInputs = {
  xeroConnection: connectionInput,
  itemId,
};

export const getItemHistoryInputs = {
  xeroConnection: connectionInput,
  itemId,
};

export const listItemsInputs = {
  xeroConnection: connectionInput,
  modifiedAfter,
  where,
};

export const updateItemInputs = {
  xeroConnection: connectionInput,
  itemId,
  itemCode: { ...itemCode, required: true },
  itemName,
  description,
  isSold,
  isPurchased,
  purchaseDescription,
  purchaseUnitPrice,
  purchaseTaxType,
  purchaseAccountCode,
  salesAccountCode,
  salesUnitPrice,
  salesTaxType,
  inventoryAssetAccountCode,
  fieldValues,
};
