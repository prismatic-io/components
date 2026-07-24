import { action } from "@prismatic-io/spectral";
import { createClientMerchant } from "../../../../client";
import { updateRegionalInventoryExamplePayload } from "../../../../examplePayloads/v1";
import { updateProductRegionalInventoryInputs } from "../../../../inputs/v1/inventory";
import { productResourceName } from "../../../../util/resourceNames";
export const updateProductRegionalInventoryMerchant = action({
  display: {
    description:
      "Inserts or updates the regional inventory of a product for a region, where inserting replaces an existing entry with the same region.",
    label: "Update Product Regional Inventory (Merchant v1)",
  },
  inputs: updateProductRegionalInventoryInputs,
  perform: async (
    context,
    {
      connectionInput,
      account,
      contentLanguage,
      feedLabel,
      offerId,
      region,
      inventory,
    },
  ) => {
    const client = createClientMerchant(connectionInput, context.debug.enabled);
    const product = productResourceName(
      account,
      contentLanguage,
      feedLabel,
      offerId,
    );
    const { data } = await client.post(
      `/inventories/v1/${product}/regionalInventories:insert`,
      {
        region,
        regionalInventoryAttributes:
          (inventory as Record<string, unknown>) ?? {},
      },
    );
    return { data };
  },
  examplePayload: updateRegionalInventoryExamplePayload,
});
