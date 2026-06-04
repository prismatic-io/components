import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import { connection, bulkSendListId } from "../inputs";

export const deleteBulkSendList = action({
  display: {
    label: "Delete Bulk Send List",
    description: "This method deletes a bulk send list.",
  },
  perform: async (context, { connection, bulkSendListId }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.delete(`/bulk_send_lists/${bulkSendListId}`);
    return { data };
  },
  inputs: {
    connection,
    bulkSendListId,
  },
});
