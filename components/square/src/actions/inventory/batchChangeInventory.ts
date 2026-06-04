import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { batchChangeInventoryExamplePayload } from "../../examplePayloads";
import { batchChangeInventoryInputs } from "../../inputs";

export const batchChangeInventory = action({
  display: {
    label: "Batch Change Inventory",
    description: "Applies adjustments and counts to the provided item quantities.",
  },
  perform: async (
    context,
    { squareConnection, idempotencyKey, changes, ignoreUnchangedCounts },
  ) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    const body = {
      idempotency_key: idempotencyKey,
      changes: changes,
      ignore_unchanged_counts: ignoreUnchangedCounts,
    };

    const response = await client.post("/v2/inventory/changes/batch-create", body);

    return {
      data: response.data,
    };
  },
  inputs: batchChangeInventoryInputs,
  examplePayload: batchChangeInventoryExamplePayload,
});
