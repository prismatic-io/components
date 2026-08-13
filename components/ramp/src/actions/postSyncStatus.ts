import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../client";
import {
  connection,
  failedSyncs,
  idempotencyKey,
  successfulSyncs,
  syncType,
} from "../inputs";
import { postSyncStatusOutputSchema } from "../outputSchemas";
export const postSyncStatus = action({
  display: {
    label: "Post Sync Status",
    description: "Notify Ramp of a list of accounting sync results",
  },
  inputs: {
    idempotency_key: idempotencyKey,
    sync_type: syncType,
    failed_syncs: failedSyncs,
    successful_syncs: successfulSyncs,
    connection,
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: postSyncStatusOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, failed_syncs, idempotency_key, successful_syncs, sync_type },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/accounting/syncs`, {
      failed_syncs,
      idempotency_key,
      successful_syncs,
      sync_type,
    });
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: {
      sync_id: "4d2f6e05-9a1c-4f3b-8c27-1b6ae95f0d84",
    },
  }),
});
