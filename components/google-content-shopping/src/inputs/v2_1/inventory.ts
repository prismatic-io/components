import { input, util } from "@prismatic-io/spectral";
import { jsonInputClean, toOptionalString } from "../../util";
import {
  connectionInput,
  kind,
  merchantId,
  pickupMethod,
  pickupSla,
} from "./common";
import {
  availability,
  customAttributes,
  price,
  productId,
  quantity,
  salePrice,
  salePriceEffectiveDate,
} from "./products";
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
const regionId = input({
  label: "Region ID",
  type: "string",
  clean: util.types.toString,
  comments:
    "The numeric ID identifying a specific geographic region defined in Merchant Center. Regions are configured under Settings > Shipping and returns and can represent custom geographic areas for regional inventory and pricing.",
  example: "12345",
  placeholder: "Enter Region ID",
  required: true,
});
const instoreProductLocation = input({
  label: "Instore Product Location",
  type: "string",
  clean: toOptionalString,
  comments:
    "The physical location of the product within the store, such as an aisle or shelf reference.",
  example: "Aisle 5, Shelf B",
  placeholder: "Enter In-Store Location",
  required: false,
});
const entriesForBatchLocalInventory = input({
  label: "Entries for Batch Request",
  type: "code",
  language: "json",
  comments:
    "Array of batch entry objects for updating local inventory (in-store product availability and pricing) across multiple stores or products. Each entry must include batchId, merchantId, method, storeCode, and inventory data. See [batch request documentation](https://developers.google.com/shopping-content/reference/rest/v2.1/localinventory/custombatch#localinventorycustombatchrequest) for structure details.",
  example:
    "Custom batch examples: https://developers.google.com/shopping-content/reference/rest/v2.1/localinventory/custombatch#localinventorycustombatchrequest",
  clean: jsonInputClean,
  required: true,
});
const entriesForBatchRegionalInventory = input({
  label: "Entries for Batch Request",
  type: "code",
  language: "json",
  comments:
    "Array of batch entry objects for updating regional inventory (availability and pricing for specific geographic regions). Each entry must include batchId, merchantId, method, regionId, and inventory data. See [batch request documentation](https://developers.google.com/shopping-content/reference/rest/v2.1/regionalinventory/custombatch#regionalinventorycustombatchrequest) for structure details.",
  example:
    "Custom batch examples: https://developers.google.com/shopping-content/reference/rest/v2.1/regionalinventory/custombatch#regionalinventorycustombatchrequest",
  clean: jsonInputClean,
  required: true,
});
export const batchLocalInventoryInputs = {
  connectionInput,
  entries: entriesForBatchLocalInventory,
};
export const updateProductLocalInventoryInputs = {
  connectionInput,
  merchantId,
  productId,
  storeCode,
  kind,
  price,
  salePrice,
  salePriceEffectiveDate,
  availability,
  quantity,
  pickupMethod,
  pickupSla,
  instoreProductLocation,
  customAttributes,
};
export const batchRegionalInventoryInputs = {
  connectionInput,
  entries: entriesForBatchRegionalInventory,
};
export const updateProductRegionalInventoryInputs = {
  connectionInput,
  merchantId,
  productId,
  regionId,
  kind,
  price,
  salePrice,
  salePriceEffectiveDate,
  availability,
  customAttributes,
};
