import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import {
  connectionInput,
  entriesForBatchLocalInventory,
} from "../../../inputs";
import { batchLocalInventoryExamplePayload } from "../../../examplePayloads";

export const batchLocalInventory = action({
  display: {
    description:
      "Updates local inventory for multiple products or regions in a single request.",
    label: "Batch Local Inventory",
  },
  inputs: {
    connectionInput,
    entries: entriesForBatchLocalInventory,
  },
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
