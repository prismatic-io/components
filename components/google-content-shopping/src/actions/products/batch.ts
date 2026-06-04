import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, entriesForBatchProduct } from "../../inputs";
import { batchProductExamplePayload } from "../../examplePayloads";

export const batchProduct = action({
  display: {
    description:
      "Retrieves, inserts, and deletes multiple products in a single request.",
    label: "Batch Product",
  },
  inputs: {
    connectionInput,
    entries: entriesForBatchProduct,
  },
  perform: async (_context, { connectionInput, entries }) => {
    const client = createClient(connectionInput);
    const { data } = await client.products.custombatch({
      requestBody: {
        entries,
      },
    });
    return {
      data,
    };
  },
  examplePayload: batchProductExamplePayload,
});
