import { action } from "@prismatic-io/spectral";
import { createGeminiClient } from "../../client";
import { listFilesExamplePayload as examplePayload } from "../../examplePayloads/files";
import { listFilesInputs } from "../../inputs/files";

export const listFiles = action({
  display: {
    label: "List Files",
    description: "Lists all files in the current project from Google Gemini.",
  },
  inputs: listFilesInputs,
  perform: async (context, { connection, pageSize, pageToken, fetchAll }) => {
    const client = createGeminiClient(connection);
    const listedFiles = await client.files.list({
      config: {
        pageSize,
        pageToken,
      },
    });

    let fileArray = listedFiles.page;
    const files = [];
    if (fetchAll) {
      while (fetchAll) {
        for (const file of fileArray) {
          files.push(file);
        }
        if (!listedFiles.hasNextPage()) {
          break;
        }
        fileArray = await listedFiles.nextPage();
      }
    } else {
      for (const file of fileArray) {
        files.push(file);
      }
    }

    return {
      data: files,
    };
  },
  examplePayload,
});
