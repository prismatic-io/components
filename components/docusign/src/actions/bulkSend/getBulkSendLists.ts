import { action, outputSchema } from "@prismatic-io/spectral";
import { getBulkSendListsOutputSchema } from "../../outputSchemas";
import { getDocuSignClient } from "../../client";
import { getBulkSendListsInputs } from "../../inputs";
import { getBulkSendListsExamplePayload } from "../../examplePayloads";

export const getBulkSendLists = action({
  display: {
    label: "Get Bulk Send Lists",
    description:
      "This method returns a list of bulk send lists belonging to the current user, as well as basic information about each list.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.get(`/bulk_send_lists`);
    return { data };
  },
  examplePerform: async () => getBulkSendListsExamplePayload,
  inputs: getBulkSendListsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getBulkSendListsOutputSchema,
  }),
  examplePayload: getBulkSendListsExamplePayload,
});
