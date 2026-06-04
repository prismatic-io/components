import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import {
  connectionInput,
  entriesForBatchRegionalInventory,
} from "../../../inputs";
import { batchRegionalInventoryExamplePayload } from "../../../examplePayloads";

export const batchRegionalInventory = action({
  display: {
    description:
      "Updates regional inventory for multiple products or regions in a single request.",
    label: "Batch Regional Inventory",
  },
  inputs: {
    connectionInput,
    entries: entriesForBatchRegionalInventory,
  },
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
