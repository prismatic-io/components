import { cleanString } from "../../util";
import { bodyFields } from "../general";
import { itemCode, itemName, itemType } from "./general";

export const updateItemInputs = {
  ItemCode: itemCode,
  ItemName: { ...itemName, required: false, clean: cleanString },
  ItemType: { ...itemType, required: false, clean: cleanString },
  bodyFields,
};
