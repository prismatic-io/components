import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import {
  connectionInput,
  merchantId,
  productId,
  storeCode,
  price,
  salePrice,
  salePriceEffectiveDate,
  availability,
  quantity,
  pickupMethod,
  pickupSla,
  instoreProductLocation,
  kind,
  customAttributes,
} from "../../../inputs";
import { updateLocalInventoryExamplePayload } from "../../../examplePayloads";

export const updateProductLocalInventory = action({
  display: {
    description:
      "Updates the local inventory of a product in your Merchant Center account.",
    label: "Update Product Local Inventory",
  },
  inputs: {
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
  },
  perform: async (
    _context,
    {
      connectionInput,
      merchantId,
      productId,
      storeCode,
      price,
      salePrice,
      salePriceEffectiveDate,
      availability,
      quantity,
      pickupMethod,
      pickupSla,
      instoreProductLocation,
      kind,
      customAttributes,
    },
  ) => {
    const client = createClient(connectionInput);
    const { data } = await client.localinventory.insert({
      merchantId,
      productId,
      requestBody: {
        storeCode: storeCode || undefined,
        price: price || undefined,
        salePrice: salePrice || undefined,
        salePriceEffectiveDate: salePriceEffectiveDate || undefined,
        availability: availability || undefined,
        quantity: quantity || undefined,
        pickupMethod: pickupMethod || undefined,
        pickupSla: pickupSla || undefined,
        instoreProductLocation: instoreProductLocation || undefined,
        kind: kind || undefined,
        customAttributes: customAttributes || undefined,
      },
    });
    return {
      data,
    };
  },
  examplePayload: updateLocalInventoryExamplePayload,
});
