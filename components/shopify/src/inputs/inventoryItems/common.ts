import { input, util } from "@prismatic-io/spectral";
import { LIST_INVENTORY_ITEMS_DATASOURCE_REFERENCE } from "../../constants";

export const ids = input({
  label: "IDs",
  type: "string",
  required: true,
  collection: "valuelist",
  comments: "A list of inventory item IDs to retrieve.",
  example: "39072856",
  placeholder: "Enter ID",
  clean: util.types.toString,
});

export const requiresShipping = input({
  label: "Requires Shipping",
  type: "boolean",
  required: false,
  comments: "When true, the item requires shipping.",
  clean: util.types.toBool,
});

export const tracked = input({
  label: "Is Tracked",
  type: "boolean",
  required: false,
  comments: "When true, the item is tracked.",
  clean: util.types.toBool,
});

export const inventoryItemId = input({
  label: "Inventory Item ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the inventory item.",
  example: "39072856",
  placeholder: "Enter inventory item ID",
  clean: util.types.toString,
  dataSource: LIST_INVENTORY_ITEMS_DATASOURCE_REFERENCE,
});
