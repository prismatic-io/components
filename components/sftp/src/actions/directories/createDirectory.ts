import { action } from "@prismatic-io/spectral";
import { getSftpClient } from "../../client";
import { connection, path, recursive } from "../../inputs";
import { createDirectoryExamplePayload } from "../../examplePayloads";

const createDirectory = action({
  display: {
    label: "Create Directory",
    description:
      "Create a new directory. When Include Subfolders is enabled, recursively creates any missing directories in the path.",
  },
  perform: async (context, { connection, path, recursive }) => {
    const sftp = await getSftpClient(connection, context.debug.enabled);

    try {
      const newDirectory = await sftp.mkdir(path, recursive);
      return {
        data: newDirectory,
      };
    } finally {
      await sftp.end();
    }
  },
  inputs: { connection, path, recursive },
  examplePayload: createDirectoryExamplePayload,
});

export default createDirectory;
