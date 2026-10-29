import { action } from "@prismatic-io/spectral";
import { createGraphQLClient } from "../../client";
import { importPurchaseOrderFromQuickbooksExamplePayload } from "../../examplePayloads";
import { createPurchaseOrderFromQuickbooksInputs } from "../../inputs/purchaseOrders";

export const importPurchaseOrderFromQuickbooks = action({
  display: {
    label: "Import Purchase Order from Quickbooks",
    description: "Creates a Purchase Order from Quickbooks.",
  },
  examplePayload: importPurchaseOrderFromQuickbooksExamplePayload,
  inputs: createPurchaseOrderFromQuickbooksInputs,
  perform: async (context, { connection, variables, queryInput }) => {
    const client = createGraphQLClient(connection, context.debug.enabled);
    const data = await client.request(
      queryInput,
      (variables ?? {}) as Record<string, unknown>,
    );

    return { data };
  },
});
