import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../../util";

export const levelId = input({
  label: "Inventory Level ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the inventory level.",
  example: "r84963704502935",
  placeholder: "Enter inventory level ID",
  clean: util.types.toString,
});

export const inventoryItemIds = input({
  label: "Inventory Item IDs",
  type: "string",
  required: false,
  comments:
    "Comma-separated list of inventory item IDs. You must include this input, 'Location IDs', or both.",
  example: "49148385,49148386",
  placeholder: "Enter inventory item IDs",
  clean: cleanStringInput,
});

export const locationIds = input({
  label: "Location IDs",
  type: "string",
  required: false,
  comments: `Comma-separated list of location IDs. Either this input, ${inventoryItemIds.label}, or both must be provided.`,
  example: "655441491,655441492",
  placeholder: "Enter location IDs",
  clean: cleanStringInput,
});
