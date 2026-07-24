import { action } from "@prismatic-io/spectral";
import { createClientMerchant } from "../../../../client";
import { batchLocalInventoryExamplePayload } from "../../../../examplePayloads/v1";
import { batchLocalInventoryInputs } from "../../../../inputs/v1/inventory";
import { runBulk } from "../../../../util/bulk";
import { productResourceName } from "../../../../util/resourceNames";
export const batchLocalInventoryMerchant = action({
  display: {
    description:
      "Upserts local inventory for multiple stores of a product in parallel, replacing the removed Content API custombatch and returning a per-item result list.",
    label: "Batch Local Inventory (Merchant v1)",
  },
  inputs: batchLocalInventoryInputs,
  perform: async (
    context,
    { connectionInput, account, contentLanguage, feedLabel, offerId, entries },
  ) => {
    const client = createClientMerchant(connectionInput, context.debug.enabled);
    const product = productResourceName(
      account,
      contentLanguage,
      feedLabel,
      offerId,
    );
    const results = await runBulk(
      entries as Record<string, unknown>[],
      async (entry) => {
        const { storeCode, ...attributes } = entry;
        const { data } = await client.post(
          `/inventories/v1/${product}/localInventories:insert`,
          { storeCode, localInventoryAttributes: attributes },
        );
        return data;
      },
    );
    return { data: { results } };
  },
  examplePayload: batchLocalInventoryExamplePayload,
});
