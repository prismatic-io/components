import { action } from "@prismatic-io/spectral";
import { createGeminiClient } from "../../client";
import { uploadFileExamplePayload as examplePayload } from "../../examplePayloads/files";
import { uploadFileInputs } from "../../inputs/files";

export const uploadFile = action({
  display: {
    label: "Upload File",
    description: "Uploads a file asynchronously to the Gemini API.",
  },
  inputs: uploadFileInputs,
  perform: async (context, { connection, fileName, displayName, file }) => {
    const client = createGeminiClient(connection);
    const { data: fileData, contentType } = file;
    const data = await client.files.upload({
      file: new Blob([new Uint8Array(fileData)], { type: contentType }),
      config: {
        mimeType: contentType,
        name: fileName,
        displayName,
      },
    });
    return {
      data,
    };
  },
  examplePayload,
});
