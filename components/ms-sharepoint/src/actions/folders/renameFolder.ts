import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { renameFolderInputs } from "../../inputs";
import { renameFolderExamplePayload } from "../../examplePayloads/folders/renameFolderExamplePayload";

export const renameFolder = action({
  display: {
    label: "Rename a Folder",
    description: "Rename a Folder in a Drive",
  },
  inputs: renameFolderInputs,
  perform: async (context, { connection, siteId, driveId, folderId, folderName }) => {
    const client = await createClient(connection, context.debug.enabled);

    const { data } = await client.patch(`/sites/${siteId}/drives/${driveId}/items/${folderId}`, {
      name: folderName,
    });

    return { data };
  },
  examplePayload: renameFolderExamplePayload,
});
