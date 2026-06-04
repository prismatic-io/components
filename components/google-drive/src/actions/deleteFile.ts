import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection, fileId, fields } from "../inputs";

export const deleteFile = action({
  display: {
    label: "Delete File",
    description: "Delete a file by file id",
  },
  perform: async (_context, { connection, fileId, fields }) => {
    const drive = createClient(connection);
    const { data } = await drive.files.delete({
      fileId: util.types.toString(fileId),
      fields: util.types.toString(fields) || undefined,
      supportsAllDrives: true,
    });

    return {
      data,
    };
  },
  inputs: { connection, fileId, fields },
});

export default deleteFile;
