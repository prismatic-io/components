import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { getInventoryItemsExamplePayload as examplePayload } from "../../../examplePayloads";
import { getInventoryItemsInputs as inputs } from "../../../inputsGql";
import { getInventoryItemsGqlOutputSchema } from "../../../outputSchemas";
import getInventoryItemQuery from "../queries/inventoryItems/GetInventoryItems.gql";
export const getInventoryItemsGql = action({
  display: {
    label: "Get Inventory Item",
    description: "Retrieves an inventory item by ID.",
  },
  performSafety: "safe",
  perform: async (context, { shopifyConnection, itemId }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );
    const data = await client.request(getInventoryItemQuery, {
      id: itemId,
    });
    return {
      data,
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getInventoryItemsGqlOutputSchema,
  }),
  examplePayload,
});
