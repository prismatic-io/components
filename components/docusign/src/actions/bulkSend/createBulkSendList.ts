import { action, outputSchema } from "@prismatic-io/spectral";
import { createBulkSendListOutputSchema } from "../../outputSchemas";
import { getDocuSignClient } from "../../client";
import { createBulkSendListInputs } from "../../inputs";
import { createBulkSendListExamplePayload } from "../../examplePayloads";

export const createBulkSendList = action({
  display: {
    label: "Create Bulk Send List",
    description:
      "Creates a bulk send list that can be used to send an envelope to up to 1,000 recipients at once.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, jsonInput }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );

    const { data } = await client.post(`/bulk_send_lists`, jsonInput);
    return { data };
  },
  examplePerform: async () => createBulkSendListExamplePayload,
  inputs: createBulkSendListInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createBulkSendListOutputSchema,
  }),
  examplePayload: createBulkSendListExamplePayload,
});
