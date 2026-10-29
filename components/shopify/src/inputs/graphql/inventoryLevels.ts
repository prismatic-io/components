import { input, util } from "@prismatic-io/spectral";
import {
  getAlldata,
  itemId,
  locationId,
  pagination,
  shopifyConnection,
} from "./common";

const levelId = input({
  label: "Inventory Level ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the inventory level.",
  example:
    "gid://shopify/InventoryLevel/100340760123?inventory_item_id=43933612245123",
  placeholder: "Enter inventory level ID",
  clean: util.types.toString,
});

export const listInventoryLevelsInputs = {
  shopifyConnection,
  locationId,
  getAlldata,
  pagination,
};

export const getInventoryLevelsInputs = {
  shopifyConnection,
  levelId,
};

export const deleteInventoryLevelsInputs = {
  shopifyConnection,
  levelId: input({
    ...levelId,
    example:
      "gid://shopify/InventoryLevel/820859520?inventory_item_id=826867926",
  }),
};

export const connectInventoryLevelInputs = {
  shopifyConnection,
  locationId,
  itemId,
};
