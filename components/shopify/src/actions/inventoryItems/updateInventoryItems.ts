import { action, util } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { updateInventoryItemsInputs } from "../../inputs";
import { updateInventoryItemsExamplePayload } from "../../payloadExamples";

export const updateInventoryItems = action({
  display: {
    label: "Update Inventory Item (Deprecated)",
    description:
      "Update the information and metadata of an Inventory Item enabled on your platform. This version of the action is being deprecated. Please replace action with Update Inventory Item.",
  },
  perform: async (context, params) => {
    const client = getShopifyClient(params.shopifyConnection, undefined, context.debug.enabled);
    const { headers, data } = await client.put(`/inventory_items/${params.itemId}.json`, {
      inventory_item: {
        sku: util.types.toString(params.sku) || undefined,
        cost: util.types.toString(params.price) || undefined,
        tracked: util.types.toBool(params.tracked) || undefined,
      },
    });
    return { data: { data, headers } };
  },
  inputs: updateInventoryItemsInputs,
  examplePayload: { data: updateInventoryItemsExamplePayload },
});
