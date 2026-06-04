import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { deleteFolderExamplePayload } from "../../examplePayloads";
import { connectionInput, getFolderId } from "../../inputs";

const folderId = getFolderId(true, "Folder ID");

export const deleteFolder = action({
  display: {
    label: "Delete Folder",
    description: "Delete a folder from a workspace.",
  },
  examplePayload: deleteFolderExamplePayload,
  perform: async (context, { connection, folderId }) => {
    const client = createClickUpClient(connection, context.debug.enabled);

    const { data } = await client.delete(`/folder/${folderId}`);

    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    folderId,
  },
});
