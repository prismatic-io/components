import { action, util, input } from "@prismatic-io/spectral";
import { connection } from "../../inputs";
import { getSftpClient } from "../../client";
import { statFileExamplePayload } from "../../examplePayloads";

const inputPath = input({
  label: "Path",
  placeholder: "Path on SFTP server to read data from",
  type: "string",
  required: true,
  comments: "Path of file on SFTP server to read data from",
  example: "/path/to/file.txt",
  clean: util.types.toString,
});

const statFile = action({
  display: {
    label: "Stat File",
    description: "Pull statistics about a file",
  },
  perform: async (context, { connection, inputPath }) => {
    const sftp = await getSftpClient(connection, context.debug.enabled);

    try {
      const statData = await sftp.stat(inputPath);
      return {
        data: statData,
      };
    } finally {
      await sftp.end();
    }
  },
  inputs: { connection, inputPath },
  examplePayload: statFileExamplePayload,
});

export default statFile;
