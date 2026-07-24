import { action } from "@prismatic-io/spectral";
import { createClientMerchant } from "../../../../client";
import { batchRegionalInventoryExamplePayload } from "../../../../examplePayloads/v1";
import { batchRegionalInventoryInputs } from "../../../../inputs/v1/inventory";
import { runBulk } from "../../../../util/bulk";
import { productResourceName } from "../../../../util/resourceNames";
export const batchRegionalInventoryMerchant = action({
  display: {
    description:
      "Upserts regional inventory for multiple regions of a product in parallel, replacing the removed Content API custombatch and returning a per-item result list.",
    label: "Batch Regional Inventory (Merchant v1)",
  },
  inputs: batchRegionalInventoryInputs,
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
        const { region, ...attributes } = entry;
        const { data } = await client.post(
          `/inventories/v1/${product}/regionalInventories:insert`,
          { region, regionalInventoryAttributes: attributes },
        );
        return data;
      },
    );
    return { data: { results } };
  },
  examplePayload: batchRegionalInventoryExamplePayload,
});
