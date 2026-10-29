import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { downloadFileInputs } from "../../inputs";
import { downloadFileExamplePayload } from "../../examplePayloads";

export const downloadFile = action({
  display: {
    label: "Download File",
    description: "Download a file.",
  },
  perform: async (context, { shareName, path, azureConnection }) => {
    const client = createAuthorizedClient(azureConnection);
    const shareClient = client.getShareClient(shareName);
    const fileClient = shareClient.rootDirectoryClient.getFileClient(path);
    const { contentType } = await fileClient.getProperties();
    return {
      data: await fileClient.downloadToBuffer(),
      contentType,
    };
  },
  inputs: downloadFileInputs,
  examplePayload: downloadFileExamplePayload,
});
