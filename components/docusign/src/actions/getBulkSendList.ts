import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import { connection, bulkSendListId } from "../inputs";

export const getBulkSendList = action({
  display: {
    label: "Get Bulk Send List",
    description:
      "This method returns all of the details associated with a specific bulk send list that belongs to the current user.",
  },
  perform: async (context, { connection, bulkSendListId }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.get(`/bulk_send_lists/${bulkSendListId}`);
    return { data };
  },
  inputs: {
    connection,
    bulkSendListId,
  },
});
