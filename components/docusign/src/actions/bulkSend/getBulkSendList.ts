import { action, outputSchema } from "@prismatic-io/spectral";
import { getBulkSendListOutputSchema } from "../../outputSchemas";
import { getDocuSignClient } from "../../client";
import { getBulkSendListInputs } from "../../inputs";
import { getBulkSendListExamplePayload } from "../../examplePayloads";

export const getBulkSendList = action({
  display: {
    label: "Get Bulk Send List",
    description:
      "This method returns all of the details associated with a specific bulk send list that belongs to the current user.",
  },
  performSafety: "safe",
  perform: async (context, { connection, bulkSendListId }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.get(`/bulk_send_lists/${bulkSendListId}`);
    return { data };
  },
  inputs: getBulkSendListInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getBulkSendListOutputSchema,
  }),
  examplePayload: getBulkSendListExamplePayload,
});
