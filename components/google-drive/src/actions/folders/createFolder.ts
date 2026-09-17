import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { FOLDER_MIME_TYPE } from "../../constants";
import { createFolderInputs } from "../../inputs";
import { createFolderExamplePayload } from "../../examplePayloads";
export const createFolder = action({
  display: {
    label: "Create Folder",
    description: "Create a directory file",
  },
  performSafety: "notAllowed",
  perform: async (_context, { connection, folderName, parentFolderId }) => {
    const drive = createClient(connection);
    const { data } = await drive.files.create({
      requestBody: {
        name: folderName,
        parents: [parentFolderId],
        mimeType: FOLDER_MIME_TYPE,
      },
      supportsAllDrives: true,
    });
    return {
      data,
    };
  },
  inputs: createFolderInputs,
  examplePerform: async (
    _context,
    { folderName },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...createFolderExamplePayload.data,
      name: folderName,
    },
  }),
  examplePayload: createFolderExamplePayload,
});
export default createFolder;
