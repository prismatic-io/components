import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { deleteInventoryLevelsExamplePayload as examplePayload } from "../../../examplePayloads";
import { deleteInventoryLevelsInputs as inputs } from "../../../inputsGql";
import { deleteInventoryLevelsGqlOutputSchema } from "../../../outputSchemas";
import deleteInventoryLevelsQuery from "../queries/inventoryLevels/DeleteInventoryLevels.gql";

export const deleteInventoryLevelsGql = action({
  display: {
    label: "Delete Inventory Levels",
    description: "Deletes an inventory level.",
  },
  performSafety: "notAllowed",
  perform: async (context, { shopifyConnection, levelId }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );
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
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteInventoryLevelsGqlOutputSchema,
  }),
  examplePerform: async () => examplePayload,
  examplePayload,
});
