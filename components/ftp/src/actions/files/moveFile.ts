import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { moveFileExamplePayload } from "../../examplePayloads";
import { moveFileInputs } from "../../inputs";
export const moveFile = action({
  display: {
    label: "Move File",
    description: "Moves a file on an FTP server.",
  },
  perform: async (context, { connection, sourcePath, destinationPath }) => {
    const client = await createClient(connection, context.debug.enabled);
    try {
      await client.rename(sourcePath, destinationPath);
    } finally {
      client.close();
    }
    return null;
  },
  inputs: moveFileInputs,
  examplePayload: moveFileExamplePayload,
});
export default moveFile;
