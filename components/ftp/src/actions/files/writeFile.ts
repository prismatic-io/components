import { Readable } from "node:stream";
import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { writeFileExamplePayload } from "../../examplePayloads";
import { writeFileInputs } from "../../inputs";
export const writeFile = action({
  display: {
    label: "Write File",
    description: "Writes a file to an FTP server.",
  },
  perform: async (context, { connection, outputPath, data: inputData }) => {
    const client = await createClient(connection, context.debug.enabled);
    try {
      const readable = Readable.from(inputData);
      await client.uploadFrom(readable, outputPath);
    } finally {
      client.close();
    }
    return null;
  },
  inputs: writeFileInputs,
  examplePayload: writeFileExamplePayload,
});
export default writeFile;
