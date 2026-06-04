import { input, util } from "@prismatic-io/spectral";
import { mapModel } from "../../util";
import { ITEM_TYPES } from "../../constants";

export const itemCode = input({
  label: "Item Code",
  type: "string",
  comments: "The unique code identifying the item in the inventory.",
  example: "A00001",
  placeholder: "Enter item code",
  required: true,
  clean: util.types.toString,
});

export const itemName = input({
  label: "Item Name",
  type: "string",
  comments: "The name of the item in the inventory.",
  example: "Desktop Computer",
  placeholder: "Enter item name",
  required: true,
  clean: util.types.toString,
});

export const itemType = input({
  label: "Item Type",
  type: "string",
  comments:
    "The type of the item: Items (itItems), Labor (itLabor), Travel (itTravel), or Fixed Assets (itFixedAssets).",
  required: true,
  model: mapModel(ITEM_TYPES),
  clean: util.types.toString,
});
