import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import { connection, bulkSendBatchId } from "../inputs";

export const getBulkSendBatchStatus = action({
  display: {
    label: "Get Bulk Send Status",
    description: "Gets the general status of a specific bulk send batch.",
  },
  perform: async (context, { connection, bulkSendBatchId }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.get(`/bulk_send_batch/${bulkSendBatchId}`);
    return { data };
  },
  inputs: {
    connection,
    bulkSendBatchId,
  },
});
