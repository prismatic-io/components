import type { DirectoryDeleteResponse } from "@azure/storage-file-share";
import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { deleteFolderInputs } from "../../inputs";
import { deleteFolderExamplePayload } from "../../examplePayloads";

export const deleteFolder = action({
  display: {
    label: "Delete Folder",
    description: "Delete an empty folder under an existing path.",
  },
  perform: async (context, { shareName, path, azureConnection }) => {
    const client = createAuthorizedClient(azureConnection);
    const shareClient = client.getShareClient(shareName);
    const response = await shareClient.deleteDirectory(path);
    return { data: response as Omit<DirectoryDeleteResponse, "_response"> };
  },
  inputs: deleteFolderInputs,
  examplePayload: deleteFolderExamplePayload,
});
