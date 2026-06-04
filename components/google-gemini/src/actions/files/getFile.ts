import { action } from "@prismatic-io/spectral";
import { createGeminiClient } from "../../client";
import { getFileExamplePayload as examplePayload } from "../../examplePayloads/files";
import { getFileInputs } from "../../inputs/files";

export const getFile = action({
  display: {
    label: "Get File",
    description: "Retrieves file information from Google Gemini.",
  },
  inputs: getFileInputs,
  perform: async (context, { connection, fileName }) => {
    const client = createGeminiClient(connection);
    const data = await client.files.get({
      name: fileName,
    });
    return {
      data,
    };
  },
  examplePayload,
});
