import { action, outputSchema } from "@prismatic-io/spectral";
import { getBulkSendBatchStatusOutputSchema } from "../../outputSchemas";
import { getDocuSignClient } from "../../client";
import { getBulkSendBatchStatusInputs } from "../../inputs";
import { getBulkSendBatchStatusExamplePayload } from "../../examplePayloads";

export const getBulkSendBatchStatus = action({
  display: {
    label: "Get Bulk Send Status",
    description: "Gets the general status of a specific bulk send batch.",
  },
  performSafety: "safe",
  perform: async (context, { connection, bulkSendBatchId }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.get(`/bulk_send_batch/${bulkSendBatchId}`);
    return { data };
  },
  inputs: getBulkSendBatchStatusInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getBulkSendBatchStatusOutputSchema,
  }),
  examplePayload: getBulkSendBatchStatusExamplePayload,
});
