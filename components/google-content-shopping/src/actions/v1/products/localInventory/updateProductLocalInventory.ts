import { action } from "@prismatic-io/spectral";
import { createClientMerchant } from "../../../../client";
import { updateLocalInventoryExamplePayload } from "../../../../examplePayloads/v1";
import { updateProductLocalInventoryInputs } from "../../../../inputs/v1/inventory";
import { productResourceName } from "../../../../util/resourceNames";
export const updateProductLocalInventoryMerchant = action({
  display: {
    description:
      "Inserts or updates the local inventory of a product for a store, where inserting replaces an existing entry with the same store code.",
    label: "Update Product Local Inventory (Merchant v1)",
  },
  inputs: updateProductLocalInventoryInputs,
  perform: async (
    context,
    {
      connectionInput,
      account,
      contentLanguage,
      feedLabel,
      offerId,
      storeCode,
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
      `/inventories/v1/${product}/localInventories:insert`,
      {
        storeCode,
        localInventoryAttributes: (inventory as Record<string, unknown>) ?? {},
      },
    );
    return { data };
  },
  examplePayload: updateLocalInventoryExamplePayload,
});
