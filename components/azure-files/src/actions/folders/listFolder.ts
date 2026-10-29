import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { listFolderInputs } from "../../inputs";
import { listFolderExamplePayload } from "../../examplePayloads";

export const listFolder = action({
  display: {
    label: "List Folder",
    description: "List files and folders in a folder.",
  },
  perform: async (context, { shareName, path, azureConnection }) => {
    const client = createAuthorizedClient(azureConnection);
    const shareClient = client.getShareClient(shareName);
    const directoryClient = shareClient.getDirectoryClient(path);
    const entries = [];
    for await (const entry of directoryClient.listFilesAndDirectories()) {
      entries.push(entry);
    }
    return { data: entries };
  },
  inputs: listFolderInputs,
  examplePayload: listFolderExamplePayload,
});
