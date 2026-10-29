import type { FileStartCopyResponse } from "@azure/storage-file-share";
import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { copyFileInputs } from "../../inputs";
import { copyFileExamplePayload } from "../../examplePayloads";

export const copyFile = action({
  display: {
    label: "Copy File",
    description: "Copy a file from one path to another.",
  },
  perform: async (
    context,
    { shareName, toPath, fromPath, azureConnection },
  ) => {
    const client = createAuthorizedClient(azureConnection);
    const shareClient = client.getShareClient(shareName);
    const fromFileClient =
      shareClient.rootDirectoryClient.getFileClient(fromPath);
    const toFileClient = shareClient.rootDirectoryClient.getFileClient(toPath);
    return {
      data: (await toFileClient.startCopyFromURL(fromFileClient.url)) as Omit<
        FileStartCopyResponse,
        "_response"
      >,
    };
  },
  inputs: copyFileInputs,
  examplePayload: copyFileExamplePayload,
});
