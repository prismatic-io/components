import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../../client";
import { updateLocalInventoryExamplePayload } from "../../../../examplePayloads/v2_1";
import { updateProductLocalInventoryInputs } from "../../../../inputs/v2_1";
export const updateProductLocalInventory = action({
  display: {
    description:
      "Updates the local inventory of a product in the Merchant Center account.",
    label: "Update Product Local Inventory (Legacy v2.1)",
  },
  inputs: updateProductLocalInventoryInputs,
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
    });
    return {
      data,
    };
  },
  examplePayload: updateLocalInventoryExamplePayload,
});
