import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listItemsInputs } from "../../inputs";
import { listItemsExamplePayload } from "../../examplePayloads/items/listItemsExamplePayload";

export const listItems = action({
  display: {
    label: "List Items",
    description: "List Items in a Folder",
  },
  inputs: listItemsInputs,
  perform: async (context, { connection, driveId, folderId }) => {
    const client = await createClient(connection, context.debug.enabled);

    const { data } = await client.get(`/drives/${driveId}/items/${folderId}/children`);
    return { data };
  },
  examplePayload: listItemsExamplePayload,
});
