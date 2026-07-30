import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { createFolderInputs } from "../../inputs";
import { createFolderExamplePayload } from "../../examplePayloads";
export const createFolder = action({
  display: {
    label: "Create Folder",
    description: "Create a folder under an existing path.",
  },
  perform: async (context, { shareName, path, azureConnection }) => {
    const client = createAuthorizedClient(azureConnection);
    const shareClient = client.getShareClient(shareName);
    const { directoryCreateResponse } = await shareClient.createDirectory(path);
    return {
      data: directoryCreateResponse,
    };
  },
  inputs: createFolderInputs,
  examplePayload: createFolderExamplePayload,
});
