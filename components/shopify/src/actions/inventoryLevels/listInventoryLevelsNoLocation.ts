import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { inventoryItemIds, listInventoryLevelsNoLocationInputs, locationIds } from "../../inputs";
import { listInventoryLevelsExamplePayload } from "../../payloadExamples";
import { computePageInformation } from "../../util";

export const listInventoryLevelsNoLocation = action({
  display: { label: "List Inventory Levels", description: "Lists all inventory levels." },
  perform: async (context, params) => {
    const client = getShopifyClient(params.shopifyConnection, undefined, context.debug.enabled);
    if (!params.inventoryItemIds && !params.locationIds)
      throw new Error(`Either ${inventoryItemIds.label} or ${locationIds.label} must be provided`);
    const result = await computePageInformation(
      client,
      "/inventory_levels.json",
      {
        limit: params.limit,
        inventory_item_ids: params.inventoryItemIds,
        location_ids: params.locationIds,
        updated_at_min: params.updatedAtMin,
      },
      params.getAlldata,
    );
    return { data: result as unknown };
  },
  inputs: listInventoryLevelsNoLocationInputs,
  examplePayload: { data: listInventoryLevelsExamplePayload },
});
