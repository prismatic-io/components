import { action } from "@prismatic-io/spectral";
import { getGuruClient } from "../../client";
import { updateFolderInputs } from "../../inputs";
import { updateFolderPayload } from "../../examplePayloads";

export const updateFolder = action({
  display: {
    label: "Update Folder",
    description: "Update an existing folder",
  },
  perform: async (
    context,
    { connection, folderId, folderTitle, folderDescription, parentFolder },
  ) => {
    const client = getGuruClient(connection, context.debug.enabled);

    const requestBody = {
      title: folderTitle,
      description: folderDescription,
      parentFolder: parentFolder
        ? {
            id: parentFolder,
          }
        : undefined,
    };

    const { data } = await client.put(`/folders/${folderId}`, requestBody);

    return { data };
  },
  inputs: updateFolderInputs,
  examplePayload: updateFolderPayload,
});
