import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection, fileId, fileName, folderId } from "../inputs";

export const copyFile = action({
  display: {
    label: "Copy File",
    description: "Copy a file by file id",
  },
  perform: async (_context, { connection, fileId, fileName, folderId }) => {
    const drive = createClient(connection);
    const { data } = await drive.files.copy({
      fileId: util.types.toString(fileId),
      requestBody: {
        name: util.types.toString(fileName),
        parents: [util.types.toString(folderId)],
      },
      supportsAllDrives: true,
    });

    return {
      data,
    };
  },
  inputs: { connection, fileId, fileName, folderId },
  examplePayload: { data: { name: "example", description: "example" } },
});

export default copyFile;
