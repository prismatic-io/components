import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { updateFolderExamplePayload } from "../../examplePayloads";
import { connectionInput, folderName, getFolderId } from "../../inputs";

const folderId = getFolderId(true, "Folder ID");

export const updateFolder = action({
  display: {
    label: "Update Folder",
    description: "Rename a folder.",
  },
  examplePayload: updateFolderExamplePayload,
  perform: async (context, { connection, folderId, folderName }) => {
    const client = createClickUpClient(connection, context.debug.enabled);

    const { data } = await client.put(`/folder/${folderId}`, {
      name: folderName,
    });

    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    folderId,
    folderName,
  },
});
