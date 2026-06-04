import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection, failedSyncs, idempotencyKey, successfulSyncs, syncType } from "../inputs";

export const postSyncStatus = action({
  display: {
    label: "Post Sync Status",
    description: "This endpoint allows customers to notify Ramp of a list of sync results",
  },
  inputs: {
    idempotency_key: idempotencyKey,
    sync_type: syncType,
    failed_syncs: failedSyncs,
    successful_syncs: successfulSyncs,
    connection,
  },
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
});
