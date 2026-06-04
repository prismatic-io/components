import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection, folderId, folderName } from "../inputs";

export const createFolder = action({
  display: {
    label: "Create Folder",
    description: "Create a directory file",
  },
  perform: async (_context, { connection, folderName, parentFolderId }) => {
    const drive = createClient(connection);
    const parent = util.types.toString(parentFolderId);

    const { data } = await drive.files.create({
      requestBody: {
        name: util.types.toString(folderName),
        parents: [parent || undefined],
        mimeType: "application/vnd.google-apps.folder",
      },
      supportsAllDrives: true,
    });

    return {
      data,
    };
  },
  inputs: {
    connection,
    folderName,
    parentFolderId: { ...folderId, label: "Parent Folder Id" },
  },

  examplePayload: { data: { name: "example", description: "example" } },
});

export default createFolder;
