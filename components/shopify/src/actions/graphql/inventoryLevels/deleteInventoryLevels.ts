import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { deleteInventoryLevelsExamplePayload as examplePayload } from "../../../examplePayloads";
import { deleteInventoryLevelsInputs as inputs } from "../../../inputsGql";
import deleteInventoryLevelsQuery from "../queries/inventoryLevels/DeleteInventoryLevels.gql";

export const deleteInventoryLevelsGql = action({
  display: {
    label: "Delete Inventory Levels",
    description: "Deletes an inventory level.",
  },
  perform: async (context, { shopifyConnection, levelId }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);
    const data: {
      inventoryDeactivate: Record<string, unknown>;
    } = await client.request(deleteInventoryLevelsQuery, {
      inventoryLevelId: levelId,
    });

    return {
      data: data.inventoryDeactivate,
    };
  },
  inputs,
  examplePayload,
});
