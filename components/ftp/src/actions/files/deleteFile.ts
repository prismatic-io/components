import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteFileExamplePayload } from "../../examplePayloads";
import { deleteFileInputs } from "../../inputs";
export const deleteFile = action({
  display: {
    label: "Delete File",
    description: "Deletes a file from an FTP server.",
  },
  perform: async (context, { connection, path }) => {
    const client = await createClient(connection, context.debug.enabled);
    try {
      await client.remove(path);
    } finally {
      client.close();
    }
    return null;
  },
  inputs: deleteFileInputs,
  examplePayload: deleteFileExamplePayload,
});
export default deleteFile;
