import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput, validateJSON } from "../../util";

export const marketplaceIdInput = input({
  label: "Marketplace ID",
  type: "string",
  required: false,
  comments: "The marketplace ID to filter stores.",
  placeholder: "Enter marketplace ID",
  clean: cleanStringInput,
});

export const storeIdInput = input({
  label: "Store ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the store.",
  placeholder: "Enter store ID",
  dataSource: "selectStores",
  clean: util.types.toString,
});

export const storeUpdateDataInput = input({
  label: "Store Update Data",
  type: "code",
  language: "json",
  default: JSON.stringify(
    {
      storeId: 12345,
      storeName: "WooCommerce Store",
      marketplaceId: 36,
    },
    null,
    2,
  ),
  comments:
    "All the data needed to update an existing store. Must provide the entire resource.",
  clean: validateJSON,
});
