import { connectionInput, itemId, sku, updatePrice } from "../common";
import { tracked } from "./common";

export const updateInventoryItemsInputs = {
  itemId,
  sku,
  price: { ...updatePrice, comments: "The updated price of the inventory item." },
  tracked,
  shopifyConnection: connectionInput,
};
