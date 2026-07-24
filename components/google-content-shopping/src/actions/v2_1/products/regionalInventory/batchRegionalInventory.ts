import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../../client";
import { batchRegionalInventoryExamplePayload } from "../../../../examplePayloads/v2_1";
import { batchRegionalInventoryInputs } from "../../../../inputs/v2_1";
export const batchRegionalInventory = action({
  display: {
    description:
      "Updates regional inventory for multiple products or regions in a single request.",
    label: "Batch Regional Inventory (Legacy v2.1)",
  },
  inputs: batchRegionalInventoryInputs,
  perform: async (_context, { connectionInput, entries }) => {
    const client = createClient(connectionInput);
    const { data } = await client.regionalinventory.custombatch({
      requestBody: {
        entries,
      },
    });
    return {
      data,
    };
  },
  examplePayload: batchRegionalInventoryExamplePayload,
});
