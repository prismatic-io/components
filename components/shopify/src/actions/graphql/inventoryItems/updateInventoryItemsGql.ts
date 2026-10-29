import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { updateInventoryItemsExamplePayload as examplePayload } from "../../../examplePayloads";
import { updateInventoryItemsInputs as inputs } from "../../../inputsGql";
import { updateInventoryItemsGqlOutputSchema } from "../../../outputSchemas";
import updateInventoryItemQuery from "../queries/inventoryItems/UpdateInventoryItems.gql";

export const updateInventoryItemsGql = action({
  display: {
    label: "Update Inventory Item",
    description: "Updates an existing inventory item.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { shopifyConnection, itemId, sku, cost, tracked },
  ) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );

    const data = await client.request(updateInventoryItemQuery, {
      id: itemId,
      input: {
        cost,
        tracked,
        sku,
      },
    });

    return {
      data,
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateInventoryItemsGqlOutputSchema,
  }),
  examplePerform: async () => examplePayload,
  examplePayload,
});
