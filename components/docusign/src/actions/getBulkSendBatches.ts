import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import { connection } from "../inputs";

export const getBulkSendBatches = action({
  display: {
    label: "Get Bulk Send Batches",
    description: "Returns a summary of bulk send batches.",
  },
  perform: async (context, { connection }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.get(`/bulk_send_batch`);
    return { data };
  },
  inputs: {
    connection,
  },
});
