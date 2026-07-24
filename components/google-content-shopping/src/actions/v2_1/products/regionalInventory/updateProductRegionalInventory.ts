import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../../client";
import { updateRegionalInventoryExamplePayload } from "../../../../examplePayloads/v2_1";
import { updateProductRegionalInventoryInputs } from "../../../../inputs/v2_1";
export const updateProductRegionalInventory = action({
  display: {
    description:
      "Updates the regional inventory of a product in the Merchant Center account, updating any existing regional inventory with the same region ID.",
    label: "Update Product Regional Inventory (Legacy v2.1)",
  },
  inputs: updateProductRegionalInventoryInputs,
  perform: async (
    _context,
    {
      connectionInput,
      merchantId,
      productId,
      regionId,
      price,
      salePrice,
      salePriceEffectiveDate,
      availability,
      customAttributes,
      kind,
    },
  ) => {
    const client = createClient(connectionInput);
    const { data } = await client.regionalinventory.insert({
      merchantId,
      productId,
      requestBody: {
        regionId,
        price,
        salePrice,
        salePriceEffectiveDate,
        availability,
        customAttributes,
        kind,
      },
    });
    return {
      data,
    };
  },
  examplePayload: updateRegionalInventoryExamplePayload,
});
