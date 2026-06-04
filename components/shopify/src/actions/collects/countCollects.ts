import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { countCollectsInputs } from "../../inputs";
import { countCollectExamplePayload } from "../../payloadExamples";

export const countCollects = action({
  display: {
    label: "Count Collects (Deprecated)",
    description: "Count all available collects.",
  },
  perform: async (_context, params) => {
    const client = getShopifyClient(params.shopifyConnection, undefined);
    const { headers, data } = await client.get("/collects/count.json");
    return { data: { data, headers } };
  },
  inputs: countCollectsInputs,
  examplePayload: { data: countCollectExamplePayload },
});
