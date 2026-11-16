import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listItemsExamplePayload } from "../../examplePayloads";
import { listItemsInputs } from "../../inputs";
import { listItemsOutputSchema } from "../../outputSchemas";

export const listItems = action({
  display: {
    label: "List Items",
    description: "List Items in a Folder.",
  },
  inputs: listItemsInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, driveId, folderId }) => {
    const client = await createClient(connection, context.debug.enabled);

    const { data } = await client.get(`/drives/${driveId}/items/${folderId}/children`);
    return { data };
  },
  examplePerform: async () => listItemsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listItemsOutputSchema,
  }),
  examplePayload: listItemsExamplePayload,
});
