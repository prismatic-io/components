import { action, outputSchema } from "@prismatic-io/spectral";
import { updateBulkSendListOutputSchema } from "../../outputSchemas";
import { getDocuSignClient } from "../../client";
import { updateBulkSendListInputs } from "../../inputs";
import { updateBulkSendListExamplePayload } from "../../examplePayloads";

export const updateBulkSendList = action({
  display: {
    label: "Update Bulk Send List",
    description:
      "This method replaces the definition of an existing bulk send list.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, jsonInput, bulkSendListId }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );

    const { data } = await client.put(
      `/bulk_send_lists/${bulkSendListId}`,
      jsonInput,
    );
    return { data };
  },
  examplePerform: async () => updateBulkSendListExamplePayload,
  inputs: updateBulkSendListInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateBulkSendListOutputSchema,
  }),
  examplePayload: updateBulkSendListExamplePayload,
});
