import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { getInventoryLevelsExamplePayload as examplePayload } from "../../../examplePayloads";
import { getInventoryLevelsInputs as inputs } from "../../../inputsGql";
import { getInventoryLevelsGqlOutputSchema } from "../../../outputSchemas";
import getInventoryLevelsQuery from "../queries/inventoryLevels/GetInventoryLevels.gql";

export const getInventoryLevelsGql = action({
  display: {
    label: "Get Inventory Levels",
    description: "Retrieves an inventory level by ID.",
  },
  performSafety: "safe",
  perform: async (context, { shopifyConnection, levelId }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );
    const data = await client.request(getInventoryLevelsQuery, {
      id: levelId,
    });

    return {
      data,
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getInventoryLevelsGqlOutputSchema,
  }),
  examplePayload,
});
