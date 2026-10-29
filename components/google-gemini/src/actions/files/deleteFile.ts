import { action } from "@prismatic-io/spectral";
import { createGeminiClient } from "../../client";
import { DELETE_SUCCESS_MESSAGE } from "../../constants";
import { deleteFileExamplePayload as examplePayload } from "../../examplePayloads/files";
import { deleteFileInputs } from "../../inputs/files";

export const deleteFile = action({
  display: {
    label: "Delete File",
    description: "Deletes a file from Google Gemini.",
  },
  inputs: deleteFileInputs,
  perform: async (context, { connection, fileName }) => {
    const client = createGeminiClient(connection);
    await client.files.delete({
      name: fileName,
    });
    return {
      data: DELETE_SUCCESS_MESSAGE,
    };
  },
  examplePayload,
});
