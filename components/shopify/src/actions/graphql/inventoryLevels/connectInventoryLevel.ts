import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { connectInventoryLevelExamplePayload as examplePayload } from "../../../examplePayloads";
import { connectInventoryLevelInputs as inputs } from "../../../inputsGql";
import connectInventoryLevelQuery from "../queries/inventoryLevels/ConnectInventoryLevel.gql";

export const connectInventoryLevelGql = action({
  display: {
    label: "Connect Inventory Item To Location",
    description: "Connects an existing inventory item to a location.",
  },
  perform: async (context, { shopifyConnection, locationId, itemId }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);
    const data: { inventoryActivate: Record<string, unknown> } = await client.request(
      connectInventoryLevelQuery,
      {
        locationId,
        inventoryItemId: itemId,
      },
    );

    return {
      data: data.inventoryActivate,
    };
  },
  inputs,
  examplePayload,
});
