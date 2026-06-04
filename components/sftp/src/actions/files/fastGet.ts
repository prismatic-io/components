import { basename } from "node:path";
import { promises } from "node:fs";
import * as mime from "mime-types";
import { action, util, input } from "@prismatic-io/spectral";
import { connection, returnBuffer } from "../../inputs";
import { getSftpClient } from "../../client";
import { fastGetExamplePayload } from "../../examplePayloads";

const inputPath = input({
  label: "Path",
  placeholder: "Path on SFTP server to read data from",
  type: "string",
  required: true,
  comments: "Path of file on SFTP server to read data from",
  example: "/path/to/file.txt",
  clean: util.types.toString,
});

const fastGet = action({
  display: {
    label: "Fast Get",
    description: "Read a file from SFTP",
  },
  perform: async (context, { connection, inputPath }) => {
    const sftp = await getSftpClient(connection, context.debug.enabled);

    try {
      const fileName = basename(inputPath);
      const localPath = `/tmp/${fileName}`;
      await sftp.fastGet(inputPath, localPath);

      return {
        data: await promises.readFile(localPath),
        contentType: returnBuffer
          ? mime.types.bin
          : mime.lookup(fileName) || mime.types.bin,
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
  examplePayload: fastGetExamplePayload,
});

export default fastGet;
