import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { getInventoryLevelsInputs } from "../../inputs";
import { getInventoryLevelsExamplePayload } from "../../payloadExamples";

export const getInventoryLevels = action({
  display: {
    label: "Get Inventory Levels (Deprecated)",
    description:
      "Get the information and metadata of an Inventory Level. This version of the action is being deprecated. Please replace action with Get Inventory Levels.",
  },
  perform: async (context, params) => {
    const client = getShopifyClient(params.shopifyConnection, undefined, context.debug.enabled);
    const { headers, data } = await client.get(`/inventory_levels/${params.levelId}`);
    return { data: { data, headers } };
  },
  inputs: getInventoryLevelsInputs,
  examplePayload: { data: getInventoryLevelsExamplePayload },
});
