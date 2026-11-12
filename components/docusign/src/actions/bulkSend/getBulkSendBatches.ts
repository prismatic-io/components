import { action, outputSchema } from "@prismatic-io/spectral";
import { getBulkSendBatchesOutputSchema } from "../../outputSchemas";
import { getDocuSignClient } from "../../client";
import { getBulkSendBatchesInputs } from "../../inputs";
import { getBulkSendBatchesExamplePayload } from "../../examplePayloads";

export const getBulkSendBatches = action({
  display: {
    label: "Get Bulk Send Batches",
    description: "Returns a summary of bulk send batches.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.get(`/bulk_send_batch`);
    return { data };
  },
  examplePerform: async () => getBulkSendBatchesExamplePayload,
  inputs: getBulkSendBatchesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getBulkSendBatchesOutputSchema,
  }),
  examplePayload: getBulkSendBatchesExamplePayload,
});
