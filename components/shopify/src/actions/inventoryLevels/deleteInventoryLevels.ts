import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { deleteInventoryLevelsInputs } from "../../inputs";
import { deleteInventoryLevelsExamplePayload } from "../../payloadExamples";

export const deleteInventoryLevels = action({
  display: {
    label: "Delete Inventory Levels (Deprecated)",
    description:
      "Delete the information and metadata of an Inventory Level. This version of the action is being deprecated. Please replace action with Delete Inventory Levels.",
  },
  perform: async (context, params) => {
    const client = getShopifyClient(params.shopifyConnection, undefined, context.debug.enabled);
    const { headers, data } = await client.delete(`/inventory_levels/${params.levelId}`);
    return { data: { data, headers } };
  },
  inputs: deleteInventoryLevelsInputs,
  examplePayload: { data: deleteInventoryLevelsExamplePayload },
});
