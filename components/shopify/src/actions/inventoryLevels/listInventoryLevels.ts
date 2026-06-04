import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { listInventoryLevelsInputs } from "../../inputs";
import { listInventoryLevelsExamplePayload } from "../../payloadExamples";
import { computePageInformation } from "../../util";

export const listInventoryLevels = action({
  display: {
    label: "List Inventory Levels At Location (Deprecated)",
    description:
      "List all Inventory Levels. This version of the action is being deprecated. Please replace action with List Inventory Levels.",
  },
  perform: async (context, params) => {
    const client = getShopifyClient(params.shopifyConnection, undefined, context.debug.enabled);
    const result = await computePageInformation(
      client,
      `/locations/${params.locationId}/inventory_levels`,
      { limit: params.limit, page_info: params.pageInfo || undefined },
      params.getAlldata,
    );
    return { data: result as unknown };
  },
  inputs: listInventoryLevelsInputs,
  examplePayload: { data: listInventoryLevelsExamplePayload },
});
