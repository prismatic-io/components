import { action, util } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { connectInventoryLevelInputs } from "../../inputs";
import { connectInventoryLevelsExamplePayload } from "../../payloadExamples";

export const connectInventoryLevel = action({
  display: {
    label: "Connect Inventory Item To Location (Deprecated)",
    description:
      "Connect an existing Inventory Item to an existing Location. This version of the action is being deprecated. Please replace action with Connect Inventory Level.",
  },
  perform: async (context, params) => {
    const client = getShopifyClient(params.shopifyConnection, undefined, context.debug.enabled);
    const { headers, data } = await client.post("/inventory_levels/connect.json", {
      location_id: util.types.toInt(params.locationId),
      inventory_item_id: util.types.toInt(params.itemId),
    });
    return { data: { data, headers } };
  },
  inputs: connectInventoryLevelInputs,
  examplePayload: { data: connectInventoryLevelsExamplePayload },
});
