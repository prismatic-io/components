import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { copyFileInputs } from "../../inputs";
import { copyFileExamplePayload } from "../../examplePayloads";
export const copyFile = action({
  display: {
    label: "Copy File",
    description: "Copy a file by file id",
  },
  performSafety: "notAllowed",
  perform: async (_context, { connection, fileId, fileName, folderId }) => {
    const drive = createClient(connection);
    const { data } = await drive.files.copy({
      fileId,
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
  inputs: copyFileInputs,
  examplePerform: async (
    _context,
    { fileName },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...copyFileExamplePayload.data,
      name: fileName || copyFileExamplePayload.data.name,
    },
  }),
  examplePayload: copyFileExamplePayload,
});
export default copyFile;
