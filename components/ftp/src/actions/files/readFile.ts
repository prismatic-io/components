import { basename } from "node:path";
import { Writable } from "node:stream";
import { action } from "@prismatic-io/spectral";
import * as mime from "mime-types";
import { createClient } from "../../client";
import { readFileExamplePayload } from "../../examplePayloads";
import { readFileInputs } from "../../inputs";
export const readFile = action({
  display: {
    label: "Read File",
    description: "Reads a file from an FTP server.",
  },
  perform: async (context, { connection, inputPath, returnBuffer }) => {
    const client = await createClient(connection, context.debug.enabled);
    try {
      const chunks = [];
      const writable = new Writable({
        write: (chunk, _encoding, next) => {
          chunks.push(chunk);
          next();
        },
      });
      await client.downloadTo(writable, inputPath);
      return {
        data: Buffer.concat(chunks),
        contentType: returnBuffer
          ? mime.types.bin
          : mime.lookup(basename(inputPath)) || mime.types.bin,
      };
    } finally {
      client.close();
    }
  },
  inputs: readFileInputs,
  examplePayload: readFileExamplePayload,
});
export default readFile;
