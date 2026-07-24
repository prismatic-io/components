import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { batchProductExamplePayload } from "../../../examplePayloads/v2_1";
import { batchProductInputs } from "../../../inputs/v2_1";
export const batchProduct = action({
  display: {
    description:
      "Retrieves, inserts, and deletes multiple products in a single request.",
    label: "Batch Product (Legacy v2.1)",
  },
  inputs: batchProductInputs,
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
