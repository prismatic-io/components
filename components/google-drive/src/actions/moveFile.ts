import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection, fileId, folderId } from "../inputs";

export const moveFile = action({
  display: {
    label: "Move File",
    description: "Move a file by file ID",
  },
  perform: async (_context, { connection, fileId, folderId }) => {
    const drive = createClient(connection);
    const file = await drive.files.get({
      fileId: util.types.toString(fileId),
      fields: "parents",
    });
    const previousParents = file.data.parents.join(",");
    const { data } = await drive.files.update({
      fileId: util.types.toString(fileId),
      addParents: util.types.toString(folderId),
      removeParents: previousParents,
      supportsAllDrives: true,
    });

    return { data };
  },
  inputs: { connection, fileId, folderId: { ...folderId, required: true } },
  examplePayload: { data: { name: "example", description: "example" } },
});

export default moveFile;
