import { action } from "@prismatic-io/spectral";
import { getGuruClient } from "../../client";
import { deleteFolderInputs } from "../../inputs";
import { deleteFolderPayload } from "../../examplePayloads";

export const deleteFolder = action({
  display: {
    label: "Delete Folder",
    description: "Delete a folder from Guru",
  },
  perform: async (context, { connection, folderId }) => {
    const client = getGuruClient(connection, context.debug.enabled);

    await client.delete(`/folders/${folderId}`);

    const data = {
      message: "Folder deleted successfully",
      folderId,
    };

    return { data };
  },
  inputs: deleteFolderInputs,
  examplePayload: deleteFolderPayload,
});
