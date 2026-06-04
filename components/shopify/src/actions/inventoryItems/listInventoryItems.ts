import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { listInventoryItemsInputs } from "../../inputs";
import { listInventoryItemsExamplePayload } from "../../payloadExamples";
import { computePageInformation } from "../../util";

export const listInventoryItems = action({
  display: {
    label: "List Inventory Items (Deprecated)",
    description:
      "List all Inventory Items enabled on your platform. This version of the action is being deprecated. Please replace action with List Inventory Items.",
  },
  perform: async (context, params) => {
    const client = getShopifyClient(params.shopifyConnection, undefined, context.debug.enabled);
    const result = await computePageInformation(
      client,
      "/inventory_items",
      {
        ids: Array.isArray(params.ids) ? params.ids.join(",") : undefined,
        limit: params.limit,
        page_info: params.pageInfo || undefined,
      },
      params.getAlldata,
    );
    return { data: result as unknown };
  },
  inputs: listInventoryItemsInputs,
  examplePayload: { data: listInventoryItemsExamplePayload },
});
