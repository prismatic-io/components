import { basename } from "node:path";
import { Writable } from "node:stream";
import { action, input, util } from "@prismatic-io/spectral";
import * as mime from "mime-types";
import { connect } from "../../client";
import { readFileExamplePayload } from "../../examplePayloads";
import { connection, verbose } from "../../inputs";

const inputPath = input({
  label: "Path",
  placeholder: "Enter file path",
  type: "string",
  required: true,
  comments: "The full path of the file on the FTP server to read.",
  example: "/path/to/file.txt",
  clean: util.types.toString,
});

const readFile = action({
  display: {
    label: "Read File",
    description: "Reads a file from an FTP server.",
  },
  perform: async (_context, { connection, verbose, inputPath }) => {
    const client = await connect(connection, verbose);
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
        contentType: mime.lookup(basename(inputPath)) || mime.types.bin,
      };
    } finally {
      client.close();
    }
  },
  inputs: { connection, verbose, inputPath },
  examplePayload: readFileExamplePayload,
});

export default readFile;
