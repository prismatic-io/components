import { action, input, util } from "@prismatic-io/spectral";
import { connect } from "../../client";
import { deleteFileExamplePayload } from "../../examplePayloads";
import { connection, verbose } from "../../inputs";

const path = input({
  label: "Path",
  placeholder: "Enter file path",
  type: "string",
  required: true,
  comments: "The full path of the file on the FTP server to delete.",
  example: "/path/to/file.txt",
  clean: util.types.toString,
});

const deleteFile = action({
  display: {
    label: "Delete File",
    description: "Deletes a file from an FTP server.",
  },
  perform: async (_context, { connection, verbose, path }) => {
    const client = await connect(connection, verbose);
    try {
      await client.remove(path);
    } finally {
      client.close();
    }

    return null;
  },
  inputs: { connection, verbose, path },
  examplePayload: deleteFileExamplePayload,
});

export default deleteFile;
