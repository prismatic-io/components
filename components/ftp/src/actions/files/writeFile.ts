import { Readable } from "node:stream";
import { action, input, util } from "@prismatic-io/spectral";
import { connect } from "../../client";
import { writeFileExamplePayload } from "../../examplePayloads";
import { connection, verbose } from "../../inputs";

const outputPath = input({
  label: "Path",
  placeholder: "Enter file path",
  type: "string",
  required: true,
  comments: "The full path on the FTP server where the file will be written.",
  example: "/we/love/commas.csv",
  clean: util.types.toString,
});

const data = input({
  label: "Data",
  placeholder: "Enter data to write",
  type: "text",
  required: true,
  comments: "The text or binary data to write to the file on the FTP server.",
  clean: (value) => util.types.toData(value).data,
});

const writeFile = action({
  display: {
    label: "Write File",
    description: "Writes a file to an FTP server.",
  },
  perform: async (
    _context,
    { connection, outputPath, verbose, data: inputData },
  ) => {
    const client = await connect(connection, verbose);
    try {
      const readable = Readable.from(inputData);
      await client.uploadFrom(readable, outputPath);
    } finally {
      client.close();
    }

    return null;
  },
  inputs: { connection, verbose, outputPath, data },
  examplePayload: writeFileExamplePayload,
});

export default writeFile;
