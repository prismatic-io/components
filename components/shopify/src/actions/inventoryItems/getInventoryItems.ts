import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { getInventoryItemsInputs } from "../../inputs";
import { getInventoryItemExamplePayload } from "../../payloadExamples";

export const getInventoryItems = action({
  display: {
    label: "Get Inventory Item (Deprecated)",
    description:
      "Get the information and metadata of an Inventory Item enabled on your platform. This version of the action is being deprecated. Please replace action with Get Inventory Item.",
  },
  perform: async (context, params) => {
    const client = getShopifyClient(params.shopifyConnection, undefined, context.debug.enabled);
    const { headers, data } = await client.get(`/inventory_items/${params.itemId}.json`);
    return { data: { data, headers } };
  },
  inputs: getInventoryItemsInputs,
  examplePayload: { data: getInventoryItemExamplePayload },
});
