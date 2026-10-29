import { basename } from "node:path";
import * as mime from "mime-types";
import { action, util, input } from "@prismatic-io/spectral";
import { connection, returnBuffer } from "../../inputs";
import { getSftpClient } from "../../client";
import { readFileExamplePayload } from "../../examplePayloads";

const inputPath = input({
  label: "Path",
  placeholder: "Path on SFTP server to read data from",
  type: "string",
  required: true,
  comments: "Path of file on SFTP server to read data from",
  example: "/path/to/file.txt",
  clean: util.types.toString,
});

const readFile = action({
  display: {
    label: "Read File",
    description: "Read a file from SFTP",
  },
  perform: async (context, { connection, inputPath, returnBuffer }) => {
    const sftp = await getSftpClient(connection, context.debug.enabled);

    try {
      const inputData = await sftp.get(inputPath);
      return {
        data: inputData,
        contentType: returnBuffer
          ? mime.types.bin
          : mime.lookup(basename(inputPath)) || mime.types.bin,
      };
    } finally {
      await sftp.end();
    }
  },
  inputs: {
    connection,
    inputPath,
    returnBuffer,
  },
  examplePayload: readFileExamplePayload,
});

export default readFile;
