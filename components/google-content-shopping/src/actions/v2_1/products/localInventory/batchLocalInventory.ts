import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../../client";
import { batchLocalInventoryExamplePayload } from "../../../../examplePayloads/v2_1";
import { batchLocalInventoryInputs } from "../../../../inputs/v2_1";
export const batchLocalInventory = action({
  display: {
    description:
      "Updates local inventory for multiple products or regions in a single request.",
    label: "Batch Local Inventory (Legacy v2.1)",
  },
  inputs: batchLocalInventoryInputs,
  perform: async (_context, { connectionInput, entries }) => {
    const client = createClient(connectionInput);
    const { data } = await client.localinventory.custombatch({
      requestBody: {
        entries,
      },
    });
    return {
      data,
    };
  },
  examplePayload: batchLocalInventoryExamplePayload,
});
