import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { uploadFileInputs } from "../../inputs";
import { uploadFileExamplePayload } from "../../examplePayloads";
export const uploadFile = action({
  display: {
    label: "Upload File",
    description: "Upload a file under an existing path.",
  },
  perform: async (
    context,
    { shareName, path, fileContents, azureConnection },
  ) => {
    const client = createAuthorizedClient(azureConnection);
    const shareClient = client.getShareClient(shareName);
    context.logger.info({ contentType: fileContents.contentType });
    const { fileClient, fileCreateResponse } = await shareClient.createFile(
      path,
      Buffer.byteLength(fileContents.data),
    );
    await fileClient.uploadData(fileContents.data, {
      fileHttpHeaders: {
        fileContentType: fileContents.contentType,
      },
    });
    return {
      data: fileCreateResponse,
    };
  },
  inputs: uploadFileInputs,
  examplePayload: uploadFileExamplePayload,
});
