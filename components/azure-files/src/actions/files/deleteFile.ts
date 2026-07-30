import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { deleteFileInputs } from "../../inputs";
import { deleteFileExamplePayload } from "../../examplePayloads";
export const deleteFile = action({
  display: {
    label: "Delete File",
    description: "Delete a file.",
  },
  perform: async (context, { shareName, path, azureConnection }) => {
    const client = createAuthorizedClient(azureConnection);
    const shareClient = client.getShareClient(shareName);
    const response = await shareClient.deleteFile(path);
    return { data: response };
  },
  inputs: deleteFileInputs,
  examplePayload: deleteFileExamplePayload,
});
