import { input, util } from "@prismatic-io/spectral";
import { jsonInputClean } from "../../util";
import { account, connectionOnlyInputs } from "./common";
import { productIdentifierInputs } from "./products";
const storeCode = input({
  label: "Store Code",
  type: "string",
  clean: util.types.toString,
  comments:
    "Store code that identifies a specific physical retail location. This code is defined when configuring stores in Merchant Center under Settings > Business information > Store codes. Used for local inventory management.",
  example: "STORE-NYC-001",
  placeholder: "Enter Store Code",
  required: true,
});
const region = input({
  label: "Region",
  type: "string",
  clean: util.types.toString,
  comments:
    "The geographic region id this regional inventory applies to, as defined in Merchant Center.",
  example: "12345",
  placeholder: "Enter Region ID",
  required: true,
});
const inventory = input({
  label: "Inventory",
  type: "code",
  language: "json",
  comments:
    "The inventory fields as a JSON object. Local supports availability, price, quantity, pickupMethod, pickupSla, instoreProductLocation, salePrice. Regional supports availability, price, salePrice, customAttributes. Prices use { amountMicros, currencyCode }.",
  example: JSON.stringify(
    {
      availability: "in_stock",
      price: { amountMicros: "29990000", currencyCode: "USD" },
      quantity: "50",
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});
const inventoryEntries = input({
  label: "Inventory Entries",
  type: "code",
  language: "json",
  comments:
    "Array of inventory objects to upsert for the product. Local entries must include storeCode; regional entries must include region. Items are submitted as parallel inserts.",
  example: JSON.stringify(
    [
      {
        storeCode: "STORE-NYC-001",
        availability: "in_stock",
        price: { amountMicros: "29990000", currencyCode: "USD" },
        quantity: "50",
      },
    ],
    null,
    2,
  ),
  clean: jsonInputClean,
  required: true,
});
export const batchLocalInventoryInputs = {
  ...connectionOnlyInputs,
  account,
  ...productIdentifierInputs,
  entries: inventoryEntries,
};
export const updateProductLocalInventoryInputs = {
  ...connectionOnlyInputs,
  account,
  ...productIdentifierInputs,
  storeCode,
  inventory,
};
export const batchRegionalInventoryInputs = {
  ...connectionOnlyInputs,
  account,
  ...productIdentifierInputs,
  entries: inventoryEntries,
};
export const updateProductRegionalInventoryInputs = {
  ...connectionOnlyInputs,
  account,
  ...productIdentifierInputs,
  region,
  inventory,
};
