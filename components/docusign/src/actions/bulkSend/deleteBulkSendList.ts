import { action, outputSchema } from "@prismatic-io/spectral";
import { deleteBulkSendListOutputSchema } from "../../outputSchemas";
import { getDocuSignClient } from "../../client";
import { deleteBulkSendListInputs } from "../../inputs";
import { deleteBulkSendListExamplePayload } from "../../examplePayloads";

export const deleteBulkSendList = action({
  display: {
    label: "Delete Bulk Send List",
    description: "This method deletes a bulk send list.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, bulkSendListId }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.delete(`/bulk_send_lists/${bulkSendListId}`);
    return { data };
  },
  examplePerform: async () => deleteBulkSendListExamplePayload,
  inputs: deleteBulkSendListInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteBulkSendListOutputSchema,
  }),
  examplePayload: deleteBulkSendListExamplePayload,
});
